import type { EsAutocompleteTextSegment } from '../types';

/**
 * splits a line into segments for predictive bolding, as the default item
 * renderer does: query tokens match case-insensitively in any order, preferring
 * word starts, and what they match is non-predictive (regular — the user typed
 * it) while the rest is predictive (bold — what selecting would add). a blank or
 * unmatched query returns one non-predictive segment, so nothing renders fully
 * bold.
 *
 *     <span
 *         v-for="(segment, index) in splitAutocompleteText(line, query)"
 *         :key="index"
 *         :class="{ 'font-weight-bold': segment.predictive }">
 *         {{ segment.text }}</span>
 *
 * this is presentation only and never decides what matches, so a backend match
 * it cannot see (typo tolerance, synonyms) simply does not highlight. an app
 * whose API returns its own match offsets should build segments from those in a
 * custom `item` slot instead.
 */
export function splitAutocompleteText(text: string, query: string): EsAutocompleteTextSegment[] {
    return splitAutocompleteTextLines([text], query)[0]!;
}

/**
 * multi-line variant, for a suggestion rendered as several lines. bolding is
 * decided across them together: with no match anywhere every line renders
 * regular, and once any line matches, the rest are entirely predictive.
 */
export function splitAutocompleteTextLines(lines: string[], query: string): EsAutocompleteTextSegment[][] {
    const tokens = [...new Set(query.trim().toLowerCase().split(/\s+/).filter(Boolean))];

    // per token, prefer word-start matches ("st" is the "St" in "Beacon St", not
    // "Boston"), falling back to anywhere only when none match ("3" in "123")
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
    // lowercasing can change a string's length (İ becomes two code units), which
    // would misalign offsets against the original — match case-sensitively
    // rather than mis-slice the segments
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
