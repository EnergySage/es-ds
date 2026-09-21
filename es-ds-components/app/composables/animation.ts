/**
 * Resolves when the animation finishes — or cancels it and resolves after the
 * timeout, because a page whose rendering is frozen (a hidden or backgrounded
 * tab) never advances its animation timeline, and whatever awaits the animation
 * must not hang on it.
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
