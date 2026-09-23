// how long past an animation's own duration to keep waiting before giving up on
// it; long enough that a running animation always settles on its own
const DEADLINE_SLACK_MS = 150;

/**
 * awaits an animation with a deadline: resolves when it finishes, or cancels it
 * and resolves shortly after its duration is up. never rejects, so a caller
 * cannot hang on a hidden tab, whose animation timeline stops advancing.
 */
export function awaitAnimationOrTimeout(animation: Animation, durationMs: number) {
    return new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
            animation.cancel();
            resolve();
        }, durationMs + DEADLINE_SLACK_MS);
        animation.finished
            .catch(() => undefined)
            .then(() => {
                clearTimeout(timer);
                resolve();
            });
    });
}
