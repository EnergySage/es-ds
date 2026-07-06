import type { EsAutocompleteTextSegment } from '../types';

/**
 * Split a line of text into segments for predictive bolding, the same way the
 * default EsAutocomplete item renderer does. Matching is token-based, as in most
 * typeahead libraries: the query is split on whitespace and every token is matched
 * case-insensitively (all occurrences), so query terms may appear in any order —
 * "boston main" highlights both "Main" in "123 Main St" and "Boston" in
 * "Boston, MA 02108". Word-start matches are preferred; a token that never matches
 * at a word start falls back to matching anywhere ("3" highlights within "123").
 *
 * Matched portions are non-predictive (render them regular — the user typed them);
 * everything else is predictive (render it bold — what selecting would add):
 *
 *     <span
 *         v-for="(segment, index) in splitAutocompleteText(line, query)"
 *         :key="index"
 *         :class="{ 'font-weight-bold': segment.predictive }">
 *         {{ segment.text }}</span>
 *
 * When no token matches (or the query is blank), the whole text is returned as one
 * non-predictive segment, so unmatched text renders regular rather than fully bold.
 * This is presentation only — it never decides what matches, the app's suggestion
 * source already did — so a backend match it cannot see (typo tolerance, synonyms)
 * simply doesn't highlight. Apps whose search API returns its own match offsets
 * (e.g. Google Places matched substrings) should build segments from those offsets
 * in a custom `item` slot renderer instead.
 */
export function splitAutocompleteText(text: string, query: string): EsAutocompleteTextSegment[] {
    return splitAutocompleteTextLines([text], query)[0]!;
}

/**
 * Multi-line variant of splitAutocompleteText for suggestions rendered as several
 * lines (or fields) that form one suggestion. Whether to bold is decided across all
 * lines together: when no line matches any query token, every line renders regular;
 * when any line matches, lines without a token match of their own are entirely
 * predictive (bold) — they are part of what selecting adds, matching how the
 * suggestion would render as a single joined string.
 */
export function splitAutocompleteTextLines(lines: string[], query: string): EsAutocompleteTextSegment[][] {
    const tokens = [...new Set(query.trim().toLowerCase().split(/\s+/).filter(Boolean))];

    // per token: prefer word-start matches ("st" matches the "St" in "Beacon St",
    // not "Boston"); only when a token never matches at any word start, fall back
    // to matching it anywhere (so "3" still highlights within "123")
    const rangesPerLine: Array<Array<[number, number]>> = lines.map(() => []);
    for (const token of tokens) {
        const wordStartRanges = lines.map((line) => findTokenRanges(line, token, true));
        const chosenRanges = wordStartRanges.some((ranges) => ranges.length > 0)
            ? wordStartRanges
            : lines.map((line) => findTokenRanges(line, token, false));
        chosenRanges.forEach((ranges, lineIndex) => rangesPerLine[lineIndex]!.push(...ranges));
    }

    const mergedPerLine = rangesPerLine.map(mergeRanges);
    const anyLineMatches = mergedPerLine.some((ranges) => ranges.length > 0);
    return lines.map((line, lineIndex) => {
        const ranges = mergedPerLine[lineIndex]!;
        if (!ranges.length) {
            return [{ predictive: anyLineMatches, text: line }];
        }
        return segmentsFromRanges(line, ranges);
    });
}

/** [start, end) ranges where the token occurs within the text */
function findTokenRanges(text: string, token: string, wordStartsOnly: boolean): Array<[number, number]> {
    // lowercasing can change string length for rare characters (e.g. İ, which
    // lowercases to two code units), which would misalign match offsets against
    // the original text — fall back to case-sensitive matching rather than
    // mis-slice the segments
    const lowered = text.toLowerCase();
    const textLower = lowered.length === text.length ? lowered : text;
    const isWordChar = (character: string | undefined) => !!character && /[\p{L}\p{N}]/u.test(character);

    const ranges: Array<[number, number]> = [];
    let index = textLower.indexOf(token);
    while (index !== -1) {
        if (!wordStartsOnly || !isWordChar(textLower[index - 1])) {
            ranges.push([index, index + token.length]);
        }
        index = textLower.indexOf(token, index + 1);
    }
    return ranges;
}

function mergeRanges(ranges: Array<[number, number]>): Array<[number, number]> {
    ranges.sort((a, b) => a[0] - b[0]);
    const merged: Array<[number, number]> = [];
    for (const range of ranges) {
        const last = merged[merged.length - 1];
        if (last && range[0] <= last[1]) {
            last[1] = Math.max(last[1], range[1]);
        } else {
            merged.push([...range]);
        }
    }
    return merged;
}

function segmentsFromRanges(text: string, ranges: Array<[number, number]>): EsAutocompleteTextSegment[] {
    const segments: EsAutocompleteTextSegment[] = [];
    let position = 0;
    for (const [start, end] of ranges) {
        if (start > position) {
            segments.push({ predictive: true, text: text.slice(position, start) });
        }
        segments.push({ predictive: false, text: text.slice(start, end) });
        position = end;
    }
    if (position < text.length) {
        segments.push({ predictive: true, text: text.slice(position) });
    }
    return segments;
}
