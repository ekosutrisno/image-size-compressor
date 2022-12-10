<template>
    <ImgComparisonSlider value="60" tabindex="0" class="slider-with-animated-handle cursor-grabbing focus:outline-none rounded-lg">
        <svg slot="handle" class="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
            <path stroke="#fff" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#fff" vector-effect="non-scaling-stroke"></path>
        </svg>
        <figure slot="first" class="before text-sm">
            <img style="width: 100%" :src="image.fileOriginalUrl">
            <figcaption>Before</figcaption>
        </figure>
        <figure slot="second" class="after text-sm">
            <img style="width: 100%" :src="image.fileCompressedUrl">
            <figcaption>After</figcaption>
        </figure>
    </ImgComparisonSlider>
</template>

<script setup lang="ts">
import { ImagesModel } from '@/model/images.model';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';

defineProps<{ image: ImagesModel }>()
</script>

<style scoped>
.before,
.after {
    margin: 0;
}

.before figcaption,
.after figcaption {
    background: #fff;
    border: 1px solid #c0c0c0;
    border-radius: 8px;
    color: #2e3452;
    opacity: 0.8;
    padding: 8px 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    line-height: 100%;
}

.before figcaption {
    left: 12px;
}

.after figcaption {
    right: 12px;
}

.custom-animated-handle {
    transition: transform 0.2s;
}

.slider-with-animated-handle:hover .custom-animated-handle {
    transform: scale(1.2);
}
</style>