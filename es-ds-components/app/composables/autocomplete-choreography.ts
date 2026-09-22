interface TakeoverParts {
    field: HTMLElement | null;
    takeover: HTMLElement | null;
    /** the resting readonly combobox input, which the flying ghost clones */
    trigger: HTMLInputElement | null;
}

interface TakeoverChoreographyOptions {
    isOpen: () => boolean;
    parts: () => TakeoverParts;
    setOpen: (value: boolean) => void;
}

const TRANSITION_MS = 300;

/**
 * the takeover's enter/exit choreography: it cross-fades while a "ghost" of the
 * field flies between the resting field and the one inside it. the ghost is an
 * inert clone, so the real input keeps the focus iOS needs to show the keyboard.
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

    /**
     * where a field keeps its text: the gaps from its own box to the text region.
     * measured, never assumed — only the takeover's field has a clear button,
     * and it reserves that width over its padding.
     */
    function textInsets(input: HTMLInputElement, clearButton: HTMLElement | null) {
        const style = getComputedStyle(input);
        return {
            left: Number.parseFloat(style.paddingLeft) || 0,
            right: (Number.parseFloat(style.paddingRight) || 0) + (clearButton?.offsetWidth ?? 0),
        };
    }

    /** one end of a flight: where the field sits, and where it keeps its text */
    interface FlightEnd {
        insets: { left: number; right: number };
        rect: DOMRect;
    }

    function flyGhost(
        trigger: HTMLInputElement,
        from: FlightEnd,
        to: FlightEnd,
        decorate?: (ghost: HTMLElement, field: HTMLInputElement) => void,
    ) {
        // the flying element wraps the cloned field, because the clear button's
        // clone must render inside the ghost and an <input> cannot have children.
        // the clone fills the wrapper, so its own border and background fly.
        const ghost = document.createElement('div');
        ghost.setAttribute('aria-hidden', 'true');
        ghost.style.cssText = 'margin: 0; overflow: hidden; pointer-events: none; position: fixed; z-index: 1060;';
        const field = trigger.cloneNode(true) as HTMLInputElement;
        field.removeAttribute('id');
        // an input's value is a property, so cloning attributes does not bring it
        field.value = trigger.value;
        // never a tab stop, and never a second field for an assistive technology
        field.tabIndex = -1;
        // px-100 is !important, and an important declaration outranks an
        // animation — the animated insets below own the field's padding
        field.classList.remove('px-100');
        field.style.cssText = 'height: 100%; width: 100%;';
        ghost.append(field);
        document.body.append(ghost);

        const timing = {
            duration: TRANSITION_MS,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            fill: 'both',
        } as const;
        const flight = ghost.animate(
            [from, to].map((end) => ({
                height: `${end.rect.height}px`,
                left: `${end.rect.left}px`,
                top: `${end.rect.top}px`,
                width: `${end.rect.width}px`,
            })),
            timing,
        );
        // the text region travels with the box, widening or narrowing by the clear
        // button's width over the same 300ms the clone spends fading, so a value
        // pinned to its end slides to its landing place instead of stepping
        field.animate(
            [from, to].map((end) => ({
                paddingLeft: `${end.insets.left}px`,
                paddingRight: `${end.insets.right}px`,
            })),
            timing,
        );
        decorate?.(ghost, field);
        return settle(flight).finally(() => ghost.remove());
    }

    // only an input's scroll offset positions a value too long to fit, and held at
    // the end — where both real fields leave the caret — one that fits clamps to
    // zero anyway. the frame loop is because the flight re-clamps scrollLeft.
    function holdScrolledToEnd(field: HTMLInputElement) {
        const hold = () => {
            if (!field.isConnected) {
                return;
            }
            field.scrollLeft = field.scrollWidth;
            requestAnimationFrame(hold);
        };
        hold();
    }

    // what the endpoints do not share: the clear button, which only the takeover's
    // field carries. a clone fades in toward the takeover and out toward the
    // page, over the space the animated insets reserve.
    function decorateGhost(
        ghost: HTMLElement,
        field: HTMLInputElement,
        clearButton: HTMLElement | null,
        direction: 'in' | 'out',
        text?: string,
    ) {
        if (text !== undefined) {
            // a selection's text: the close starts before the model write is
            // rendered into the cloned trigger, so the ghost takes the final
            // text explicitly
            field.value = text;
        }
        holdScrolledToEnd(field);
        if (clearButton) {
            const clone = clearButton.cloneNode(true) as HTMLElement;
            // pinned inside the field's border, where the real field lays the
            // button out in its content box. h-100 comes off for the same reason
            // px-100 does on the field: !important would beat the insets.
            const fieldStyle = getComputedStyle(field);
            const borderY = Number.parseFloat(fieldStyle.borderTopWidth) || 0;
            const borderX = Number.parseFloat(fieldStyle.borderRightWidth) || 0;
            clone.classList.remove('h-100');
            clone.style.cssText = `position: absolute; inset: ${borderY}px ${borderX}px ${borderY}px auto;`;
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
        // hide both real elements while the ghost flies, so it reads as one element
        // leaving and arriving. opacity, not visibility: the field holds focus, and
        // hiding a focused element can blur it and lose the iOS keyboard.
        field.style.opacity = '0';
        trigger.style.opacity = '0';
        const clearButton = field.querySelector<HTMLElement>('.es-autocomplete-clear');
        const landingInput = field.querySelector('input');
        void settle(
            takeover.animate([{ opacity: 0 }, { opacity: 1 }], { duration: TRANSITION_MS, easing: 'ease-out' }),
        );
        void flyGhost(
            trigger,
            { insets: textInsets(trigger, null), rect: trigger.getBoundingClientRect() },
            {
                insets: textInsets(landingInput ?? trigger, clearButton),
                rect: field.getBoundingClientRect(),
            },
            (ghost, ghostField) => decorateGhost(ghost, ghostField, clearButton, 'in'),
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
        const landingInput = field.querySelector('input');
        await Promise.all([
            flyGhost(
                trigger,
                {
                    insets: textInsets(landingInput ?? trigger, clearButton),
                    rect: field.getBoundingClientRect(),
                },
                { insets: textInsets(trigger, null), rect: trigger.getBoundingClientRect() },
                (ghost, ghostField) => decorateGhost(ghost, ghostField, clearButton, 'out', selectedText),
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
