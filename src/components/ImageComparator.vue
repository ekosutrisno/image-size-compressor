<template>
    <div class="flex flex-col">
        <ImgComparisonSlider value="60" tabindex="0" class="slider-with-animated-handle cursor-grabbing focus:outline-none rounded-lg">
            <svg slot="handle" class="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
                <path stroke="#fff" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#fff" vector-effect="non-scaling-stroke"></path>
            </svg>
            <figure slot="first" class="before text-sm">
                <img style="width: 100%" class="object-cover w-full h-full" :src="image.fileOriginalUrl">
                <figcaption>Before</figcaption>
            </figure>
            <figure slot="second" class="after text-sm">
                <img style="width: 100%" class="object-cover w-full h-full" :src="image.fileCompressedUrl">
                <figcaption>After</figcaption>
            </figure>
        </ImgComparisonSlider>
        
        <div class="text-sm mt-5">
            <p class="bg-sky-500 text-white rounded-full w-max py-0.5 px-3">Info</p>
            <ul class="my-2">
                <li>Name: {{ image.fileOriginal.name }}</li>
                <li>Size: <span class="text-blue-500">{{ formatBytes(image.fileOriginal.size) }}</span> (Original), <span class="text-green-600">{{ formatBytes(image.fileCompressed.size) }}</span> (Compressed)</li>
                <li>Type: {{ image.fileOriginal.type }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ImagesModel } from '@/model/images.model';
import { ImgComparisonSlider } from '@img-comparison-slider/vue';
import { formatBytes } from '@/service/compress';

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