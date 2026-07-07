import { describe, expect, it } from 'vitest';
import type { EsAutocompleteTextSegment } from '../types';
import { splitAutocompleteText, splitAutocompleteTextLines } from './autocomplete';

// matched (typed) portions render regular; predictive portions render bold
const regular = (text: string): EsAutocompleteTextSegment => ({ predictive: false, text });
const bold = (text: string): EsAutocompleteTextSegment => ({ predictive: true, text });

/** segments must always reconstruct the input exactly — no lost or duplicated characters */
function expectReconstructs(text: string, segments: EsAutocompleteTextSegment[]) {
    expect(segments.map((segment) => segment.text).join('')).toBe(text);
}

describe('splitAutocompleteText', () => {
    it('bolds the predictive remainder of a prefix match', () => {
        expect(splitAutocompleteText('solar batteries', 'solar')).toEqual([regular('solar'), bold(' batteries')]);
    });

    it('matches case-insensitively', () => {
        expect(splitAutocompleteText('Solar Batteries', 'SOLAR')).toEqual([regular('Solar'), bold(' Batteries')]);
    });

    it('matches tokens in any order, at every word start', () => {
        expect(splitAutocompleteText('123 Main St, Boston, MA', 'boston main')).toEqual([
            bold('123 '),
            regular('Main'),
            bold(' St, '),
            regular('Boston'),
            bold(', MA'),
        ]);
    });

    it('prefers word starts: "st" matches "St" but not the middle of "Boston"', () => {
        expect(splitAutocompleteText('Boston St', 'st')).toEqual([bold('Boston '), regular('St')]);
    });

    it('falls back to mid-word matching when a token never matches at a word start', () => {
        expect(splitAutocompleteText('123 Main St', '3')).toEqual([bold('12'), regular('3'), bold(' Main St')]);
    });

    it('renders everything regular when nothing matches, and for a blank query', () => {
        expect(splitAutocompleteText('solar panels', 'xyz')).toEqual([regular('solar panels')]);
        expect(splitAutocompleteText('solar panels', '  ')).toEqual([regular('solar panels')]);
    });

    it('merges overlapping token matches', () => {
        expect(splitAutocompleteText('solar panels', 'solar sol')).toEqual([regular('solar'), bold(' panels')]);
    });

    it('never mis-slices when lowercasing changes string length (e.g. İ)', () => {
        const text = 'İzmir solar';
        const segments = splitAutocompleteText(text, 'solar');
        expectReconstructs(text, segments);
        expect(segments).toContainEqual(regular('solar'));
    });

    it('always reconstructs the input text exactly', () => {
        const cases: Array<[string, string]> = [
            ['solar batteries', 'solar'],
            ['123 Main St', 'main 123 st'],
            ['heat pump water heater', 'heat'],
            ['no match here', 'zzz'],
            ['', 'anything'],
        ];
        for (const [text, query] of cases) {
            expectReconstructs(text, splitAutocompleteText(text, query));
        }
    });
});

describe('splitAutocompleteTextLines', () => {
    const addressLines = ['1200 Beacon St', 'Brookline, MA 02446'];

    it('highlights tokens on the lines they match', () => {
        expect(splitAutocompleteTextLines(['123 Main St', 'Boston, MA 02108'], 'boston main')).toEqual([
            [bold('123 '), regular('Main'), bold(' St')],
            [regular('Boston'), bold(', MA 02108')],
        ]);
    });

    it('bolds a whole line without its own match when another line matched (bolding mode)', () => {
        expect(splitAutocompleteTextLines(addressLines, 'beacon')).toEqual([
            [bold('1200 '), regular('Beacon'), bold(' St')],
            [bold('Brookline, MA 02446')],
        ]);
    });

    it('renders every line regular when no line matches', () => {
        expect(splitAutocompleteTextLines(addressLines, 'zzz')).toEqual([
            [regular('1200 Beacon St')],
            [regular('Brookline, MA 02446')],
        ]);
    });

    it('decides the word-start fallback across all lines together', () => {
        // "st" has a word-start match on line 1, so it must NOT fall back to
        // mid-word matching inside "Brookline" on line 2
        expect(splitAutocompleteTextLines(addressLines, 'beacon st')).toEqual([
            [bold('1200 '), regular('Beacon'), bold(' '), regular('St')],
            [bold('Brookline, MA 02446')],
        ]);
    });
});
