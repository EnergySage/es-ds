import { onUnmounted, ref, watch } from 'vue';

// long enough that the changes to the autocomplete have already been read out by
// screen reader, short enough that the announcement we want (e.g. the
// auto-selected value and/or number of suggestions) is read out immediately afterward
const ANNOUNCE_DELAY_MS = 250;

/**
 * holds a live region's text back until the DOM around it has settled. a screen
 * reader answers an opening listbox with a burst of its own — expanded, the
 * listbox, how many items it holds — where each announcement cuts off the one
 * before, and a polite update made in the same breath is cut off with them.
 * arriving after the burst, the text is spoken instead of swallowed.
 */
export function useEsAutocompleteAnnouncer(text: () => string) {
    const announced = ref('');
    let timer: ReturnType<typeof setTimeout> | null = null;

    function cancel() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    watch(text, (next) => {
        cancel();
        // emptying a region announces nothing, so it has nothing to wait behind
        if (!next) {
            announced.value = '';
            return;
        }
        timer = setTimeout(() => {
            announced.value = next;
        }, ANNOUNCE_DELAY_MS);
    });

    onUnmounted(cancel);

    return announced;
}
