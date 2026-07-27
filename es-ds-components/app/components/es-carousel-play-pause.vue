<script setup lang="ts">
/*
    A standalone, presentational play/pause control for an autoplaying <es-carousel>.

    It is intentionally "dumb": it renders a state (playing/paused) and emits `toggle` on click.
    It has no knowledge of Embla or any carousel — the parent wires it to a carousel's exposed
    autoplay state so it can be positioned anywhere (typically next to a section heading, which
    downstream repos own).

    Example:
        <es-carousel-play-pause
            v-if="carousel?.autoplayEnabled"
            :playing="carousel?.isPlaying ?? false"
            @toggle="carousel?.toggle()" />
        <es-carousel ref="carousel" auto-play ... />
*/

interface IProps {
    // whether autoplay is currently in its "playing" mode (drives icon + accessible name)
    playing: boolean;
    // button diameter in pixels
    size?: number;
    variant?: 'default' | 'brand';
}
const props = withDefaults(defineProps<IProps>(), {
    size: 40,
    variant: 'default',
});

defineEmits<{
    toggle: [];
}>();

const sizePx = computed(() => `${props.size}px`);
const iconSizePx = computed(() => `${Math.round(props.size * 0.45)}px`);
</script>

<template>
    <button
        type="button"
        class="es-carousel-play-pause"
        :class="{ 'es-carousel-play-pause--brand': variant === 'brand' }"
        :aria-label="playing ? 'Pause automatic slide show' : 'Start automatic slide show'"
        @click="$emit('toggle')">
        <icon-pause
            v-if="playing"
            :width="iconSizePx" />
        <icon-play
            v-else
            :width="iconSizePx" />
    </button>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-carousel-play-pause {
    align-items: center;
    background: transparent;
    border: 1px solid variables.$gray-200;
    border-radius: 50%;
    color: variables.$gray-900;
    cursor: pointer;
    display: inline-flex;
    height: v-bind(sizePx);
    justify-content: center;
    line-height: 0;
    padding: 0;
    width: v-bind(sizePx);

    &:hover {
        color: variables.$gray-700;
    }
    &:active {
        color: variables.$gray-700;
    }
    &:focus-visible {
        outline: 2px solid variables.$blue-600;
        outline-offset: 2px;
    }
}

.es-carousel-play-pause--brand {
    color: variables.$blue-600;

    &:hover {
        color: variables.$blue-700;
    }
    &:active {
        color: variables.$blue-800;
    }
}
</style>
