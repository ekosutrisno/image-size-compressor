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
        
        <div class="text-xs mt-5">
            <div class="flex items-center justify-between">
                <p class="bg-sky-500 text-white rounded-full w-max py-0.5 px-3">Info</p>
                <div class="inline-flex items-center space-x-2">
                    <svg @click="download(image)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-sky-400 hover:text-sky-500 cursor-pointer transition">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <svg @click="remove(image)" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-sky-400 hover:text-sky-500 cursor-pointer transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>

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

defineProps<{ image: ImagesModel }>();
const emit = defineEmits(['remove'])

function download(image: ImagesModel) {
    var fileURL = image.fileCompressedUrl;
    var fileLink = document.createElement("a");

    fileLink.href = fileURL;
    fileLink.setAttribute("download", `${image.fileCompressed.name}`);
    document.body.appendChild(fileLink);
    fileLink.click();
}

function remove(image: ImagesModel) {
    emit('remove', image);
}

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