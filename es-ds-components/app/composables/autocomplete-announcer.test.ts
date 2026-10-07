// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { App } from 'vue';
import { createApp, nextTick, ref } from 'vue';
import { useEsAutocompleteAnnouncer } from './autocomplete-announcer';

/** run the composable inside a real component so watchers are scoped */
function withSetup<T>(composable: () => T): { app: App; result: T } {
    let result!: T;
    const app = createApp({
        setup() {
            result = composable();
            return () => null;
        },
    });
    app.mount(document.createElement('div'));
    return { app, result };
}

function makeAnnouncer(initial = '') {
    const source = ref(initial);
    const { app, result: announced } = withSetup(() => useEsAutocompleteAnnouncer(() => source.value));
    return { announced, app, source };
}

describe('useEsAutocompleteAnnouncer', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('holds the text back until the listbox has stopped changing', async () => {
        const { announced, source } = makeAnnouncer();
        source.value = '34 Prospect St';
        await nextTick();
        expect(announced.value).toBe('');
        vi.advanceTimersByTime(250);
        expect(announced.value).toBe('34 Prospect St');
    });

    it('speaks only the last of several texts arriving together', async () => {
        const { announced, source } = makeAnnouncer();
        source.value = '34 Prospect St';
        await nextTick();
        vi.advanceTimersByTime(100);
        source.value = '355 Cedar Ct';
        await nextTick();
        vi.advanceTimersByTime(100);
        expect(announced.value).toBe('');
        vi.advanceTimersByTime(150);
        expect(announced.value).toBe('355 Cedar Ct');
    });

    it('empties at once, having nothing to wait behind', async () => {
        const { announced, source } = makeAnnouncer();
        source.value = '34 Prospect St';
        await nextTick();
        vi.advanceTimersByTime(250);
        source.value = '';
        await nextTick();
        expect(announced.value).toBe('');
    });

    it('drops a text still waiting when the component goes away', async () => {
        const { announced, app, source } = makeAnnouncer();
        source.value = '34 Prospect St';
        await nextTick();
        app.unmount();
        vi.advanceTimersByTime(250);
        expect(announced.value).toBe('');
    });
});
