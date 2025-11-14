<script setup lang="ts">
import { computed, useSlots } from 'vue';

const props = defineProps({
    height: {
        type: [Number, String],
        default: 48,
    },
});

const slots = useSlots();

const spinnerSize = computed(() => {
    const size = typeof props.height === 'number' ? `${props.height}px` : props.height;
    return size;
});
</script>

<template>
    <div class="spinner-container">
        <div
            class="animated-logo"
            :style="{ width: spinnerSize, height: spinnerSize }">
            <!-- Top lightning bolt -->
            <div class="lightning-top">
                <img
                    src="/favicon-192.png"
                    alt=""
                    class="logo-base" />
            </div>
            <!-- Bottom lightning bolt -->
            <div class="lightning-bottom">
                <img
                    src="/favicon-192.png"
                    alt=""
                    class="logo-base" />
            </div>
            <!-- Blue rectangle -->
            <div class="rectangle">
                <img
                    src="/favicon-192.png"
                    alt="Loading..."
                    class="logo-base" />
            </div>
        </div>
        <div
            v-if="slots.default"
            class="spinner-text">
            <slot />
            <span class="spinner-dots"></span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.spinner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    gap: 1rem;
}

.animated-logo {
    position: relative;
    display: block;
}

.logo-base {
    width: 100%;
    height: 100%;
    display: block;
}

// Hide all parts by default, show only specific regions
.lightning-top,
.lightning-bottom,
.rectangle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

// Top half - show only top lightning
.lightning-top {
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
    animation: slideInFromTop 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

// Bottom half - show only bottom lightning
.lightning-bottom {
    clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
    animation: slideInFromBottom 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

// Blue rectangle only (bottom right area)
.rectangle {
    clip-path: polygon(75% 75%, 90% 75%, 90% 90%, 75% 90%);
    animation: dropIn 3s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
}

@keyframes slideInFromTop {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    20% {
        transform: translateY(0);
        opacity: 1;
    }
    80% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-100%);
        opacity: 0;
    }
}

@keyframes slideInFromBottom {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    10% {
        transform: translateY(100%);
        opacity: 0;
    }
    30% {
        transform: translateY(0);
        opacity: 1;
    }
    80% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(100%);
        opacity: 0;
    }
}

@keyframes dropIn {
    0% {
        transform: translateY(-150%) scale(0.3);
        opacity: 0;
    }
    40% {
        transform: translateY(-150%) scale(0.3);
        opacity: 0;
    }
    55% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    80% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-150%) scale(0.3);
        opacity: 0;
    }
}

.spinner-text {
    color: #162676;
    font-size: 0.875rem;
    text-align: center;
}

.spinner-dots {
    display: inline-block;
    width: 1.5em;
    text-align: left;

    &::after {
        content: '.';
        animation: dots 1.5s steps(3, end) infinite;
    }
}

@keyframes dots {
    0%,
    33% {
        content: '.';
    }
    34%,
    66% {
        content: '..';
    }
    67%,
    100% {
        content: '...';
    }
}

// Respect reduced motion preferences
@media (prefers-reduced-motion: reduce) {
    .lightning-top,
    .lightning-bottom,
    .rectangle {
        animation: none;
        opacity: 1;
        transform: none;
    }
}
</style>
