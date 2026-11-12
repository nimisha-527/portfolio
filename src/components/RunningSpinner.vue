<template>
    <div class="running-spinner" role="status" aria-label="Loading">
        <svg viewBox="0 0 48 56" aria-hidden="true">
            <circle class="head" cx="24" cy="8" r="5" />
            <circle class="eye" cx="27" cy="7" r="0.8" />
            <path class="body" d="M24 15v17" />
            <g class="arm arm-left">
                <path d="M24 19l-9 10" />
            </g>
            <g class="arm arm-right">
                <path d="M24 19l9 10" />
            </g>
            <g class="leg leg-left">
                <path d="M24 32l-8 12 1 7" />
            </g>
            <g class="leg leg-right">
                <path d="M24 32l8 12-1 7" />
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
export default {
    name: 'RunningSpinner'
}
</script>

<style scoped>
.running-spinner {
    display: flex;
    justify-content: center;
    color: white;
}

.running-spinner svg {
    width: 3rem;
    height: 3.5rem;
    overflow: visible;
    animation: run-bob 360ms ease-in-out infinite;
}

.running-spinner circle,
.running-spinner path {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
}

.running-spinner .head {
    fill: currentColor;
    stroke: none;
}

.running-spinner .eye {
    fill: #A47864;
    stroke: none;
}

.arm,
.leg {
    transform-box: view-box;
    transform-origin: 24px 19px;
}

.leg {
    transform-origin: 24px 32px;
}

.arm-left,
.leg-right {
    animation: run-cycle 360ms ease-in-out infinite;
}

.arm-right,
.leg-left {
    animation: run-cycle-reverse 360ms ease-in-out infinite;
}

@keyframes run-cycle {
    0%,
    100% {
        transform: rotate(-35deg);
    }

    50% {
        transform: rotate(35deg);
    }
}

@keyframes run-cycle-reverse {
    0%,
    100% {
        transform: rotate(35deg);
    }

    50% {
        transform: rotate(-35deg);
    }
}

@keyframes run-bob {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-3px);
    }
}

@media (prefers-reduced-motion: reduce) {
    .running-spinner svg,
    .arm,
    .leg {
        animation: none;
    }
}
</style>