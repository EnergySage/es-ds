/**
 * resolves when the animation finishes, or cancels it and resolves after the
 * timeout: a frozen page (a hidden tab) never advances its animation timeline,
 * and whatever awaits the animation must not hang on it.
 */
export function settleAnimation(animation: Animation, timeoutMs: number) {
    return new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
            animation.cancel();
            resolve();
        }, timeoutMs);
        animation.finished
            .catch(() => undefined)
            .then(() => {
                clearTimeout(timer);
                resolve();
            });
    });
}
