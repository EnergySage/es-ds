interface TakeoverParts {
    field: HTMLElement | null;
    takeover: HTMLElement | null;
    trigger: HTMLElement | null;
}

interface TakeoverChoreographyOptions {
    isOpen: () => boolean;
    parts: () => TakeoverParts;
    setOpen: (value: boolean) => void;
}

const TRANSITION_MS = 300;

/**
 * The takeover's enter/exit choreography: the takeover cross-fades while a
 * "ghost" of the field flies between the fake field's place on the page and the
 * real field's place in the takeover, showing where the takeover comes from and
 * returns to. The ghost is an inert clone of the fake field, so the real input
 * keeps its synchronous focus (which is what makes iOS show the keyboard) and
 * the animation stays purely presentational. Exit runs the same flight in
 * reverse — the ghost carries the fake field's look and current text, so it
 * lands exactly as the page will render — and the actual close waits for the
 * animation.
 */
export function useTakeoverChoreography(options: TakeoverChoreographyOptions) {
    function transitionsDisabled() {
        return (
            typeof matchMedia === 'undefined' ||
            matchMedia('(prefers-reduced-motion: reduce)').matches ||
            !('animate' in Element.prototype)
        );
    }

    function settle(animation: Animation) {
        return settleAnimation(animation, TRANSITION_MS + 150);
    }

    function flyGhost(trigger: HTMLElement, from: DOMRect, to: DOMRect, decorate?: (ghost: HTMLElement) => void) {
        const ghost = trigger.cloneNode(true) as HTMLElement;
        ghost.removeAttribute('id');
        ghost.setAttribute('aria-hidden', 'true');
        // w-100 is !important, which would defeat the animated width
        ghost.classList.remove('w-100');
        ghost.style.cssText = 'margin: 0; overflow: hidden; pointer-events: none; position: fixed; z-index: 1060;';
        document.body.append(ghost);
        const rectFrame = (rect: DOMRect) => ({
            height: `${rect.height}px`,
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
        });
        const flight = ghost.animate([rectFrame(from), rectFrame(to)], {
            duration: TRANSITION_MS,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            fill: 'both',
        });
        decorate?.(ghost);
        return settle(flight).finally(() => ghost.remove());
    }

    // The ghost mirrors the real field's trimmings so nothing pops at the flight's
    // ends. Toward the takeover ('in'): the text is rebuilt inside a clipping box
    // that matches the real input's text region — inset the input's 1rem padding on
    // the left (so no padding pops in at landing) and reserving the clear button's
    // width on the right — and a clone of the field's clear button fades in. Text
    // that fits that region at landing stays start-aligned, exactly as the input
    // shows it; text that overflows is end-aligned so its tail tracks the region's
    // right edge at every animated width. (A scroll offset only re-clamps when the
    // box widens, and a flex auto margin collapses to zero once the span overflows;
    // justify-content end-alignment overflows toward the start, which is what an
    // end-anchored clipped line needs.) Toward the page ('out'): text stays
    // start-anchored like the fake field it becomes, and the clear-button clone
    // fades out.
    function decorateGhost(
        ghost: HTMLElement,
        clearButton: HTMLElement | null,
        direction: 'in' | 'out',
        landing: DOMRect,
        textOverride?: string,
    ) {
        const text = ghost.querySelector<HTMLElement>('.es-autocomplete-fake-field-text');
        if (text && textOverride !== undefined) {
            // a selection's text: the close starts before the model write is
            // rendered into the cloned trigger, so the ghost takes the final
            // text explicitly
            text.textContent = textOverride;
            text.classList.remove('es-autocomplete-fake-field-placeholder');
        }
        if (direction === 'in' && text) {
            const clip = document.createElement('div');
            clip.style.cssText = `position: absolute; overflow: hidden; display: flex; align-items: center;
                inset: 0 ${clearButton ? 'calc(1rem + 2.75rem)' : '1rem'} 0 1rem;`;
            text.style.cssText = 'flex: none; margin: 0; overflow: visible; width: max-content;';
            clip.append(text);
            ghost.append(clip);
            const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            const landingRegionWidth = landing.width - 2 - rem - (clearButton ? rem + 2.75 * rem : rem);
            const overflows = text.getBoundingClientRect().width > landingRegionWidth;
            clip.style.justifyContent = overflows ? 'flex-end' : 'flex-start';
        }
        if (clearButton) {
            const clone = clearButton.cloneNode(true) as HTMLElement;
            // pinned to the ghost's edge: the real field lays the button flush right
            // (p-0), while the ghost carries the fake field's own side padding
            clone.style.cssText = 'position: absolute; inset: 0 0 0 auto;';
            ghost.append(clone);
            clone.animate(direction === 'in' ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }], {
                duration: TRANSITION_MS,
                easing: 'ease',
                fill: 'both',
            });
        }
    }

    function enterTransition() {
        if (transitionsDisabled()) {
            return;
        }
        const { field, takeover, trigger } = options.parts();
        if (!field || !takeover || !trigger) {
            return;
        }
        // hide both real elements while the ghost flies, so it reads as ONE element
        // leaving its place and arriving — opacity, not visibility, because the
        // field holds focus and hiding a focused element can blur it (losing the
        // iOS keyboard). The trigger is revealed only once the flight settles, when
        // the now-opaque takeover covers it.
        field.style.opacity = '0';
        trigger.style.opacity = '0';
        const clearButton = field.querySelector<HTMLElement>('.es-autocomplete-clear');
        const landing = field.getBoundingClientRect();
        void settle(
            takeover.animate([{ opacity: 0 }, { opacity: 1 }], { duration: TRANSITION_MS, easing: 'ease-out' }),
        );
        void flyGhost(trigger, trigger.getBoundingClientRect(), landing, (ghost) =>
            decorateGhost(ghost, clearButton, 'in', landing),
        ).then(() => {
            field.style.opacity = '';
            // a close begun during the enter flight owns the trigger's visibility
            if (!exiting) {
                trigger.style.opacity = '';
            }
        });
    }

    let exiting = false;
    async function closeTakeover(selectedText?: string) {
        if (!options.isOpen() || exiting) {
            return;
        }
        if (transitionsDisabled()) {
            options.setOpen(false);
            return;
        }
        exiting = true;
        const { field, takeover, trigger } = options.parts();
        if (!field || !takeover || !trigger) {
            options.setOpen(false);
            exiting = false;
            return;
        }
        takeover.style.pointerEvents = 'none';
        // hide both real elements while the ghost flies back (see enterTransition)
        trigger.style.opacity = '0';
        field.style.opacity = '0';
        const clearButton = field.querySelector<HTMLElement>('.es-autocomplete-clear');
        const fade = takeover.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: TRANSITION_MS,
            easing: 'ease-in',
            fill: 'forwards',
        });
        const landing = trigger.getBoundingClientRect();
        await Promise.all([
            flyGhost(trigger, field.getBoundingClientRect(), landing, (ghost) =>
                decorateGhost(ghost, clearButton, 'out', landing, selectedText),
            ),
            settle(fade),
        ]);
        trigger.style.opacity = '';
        field.style.opacity = '';
        options.setOpen(false);
        exiting = false;
    }

    return { closeTakeover, enterTransition };
}
