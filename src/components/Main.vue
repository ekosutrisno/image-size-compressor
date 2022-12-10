<template>
        <div @dragover.prevent="dragover" @dragleave="dragleave" @drop.prevent="drop" class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div class="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div :class="[isDrag ? 'border-dashed border-sky-400' : 'border-gray-900/5']" class="relative bg-white px-6 py-8 border-2 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div class="mx-auto max-w-md">
                    <img src="/file.svg" class="h-12" alt="Image Compressor" />
                    <div class="text-base leading-7 text-gray-600">
                        <p>Reduce your file size to save more storage space.</p>
                            <UploadImage :files="files" @on-upload="(payload: ImagesModel[])=> files = payload" />
                        <p>When you optimize images for the web, you're reducing page load time and increasing site speed.</p>
                    </div>
                </div>
            </div>
            <img v-if="isDrag" class="transition w-60 h-60 absolute bottom-0 right-0" src="/dropbox.gif" aria-hidden="true" />
        </div>
    <ImageComparator v-for="file in files" :key="file.id" :image="file" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ImagesModel } from '@/model/images.model';
import UploadImage from './UploadImage.vue';
import { compressImages } from '@/service/compress';


const files = ref<ImagesModel[]>([]);
const isDrag =  ref<boolean>(false);

const onUploadFile = async (event: any, dragDrop?: boolean) => {
    const filesTemp: File[] = dragDrop
        ? event.dataTransfer.files
        : event.target.files;

    files.value = (await compressImages(filesTemp)).value
}

const dragover = (event: any) => {
    isDrag.value = true;
}

const dragleave = (event: any) => {
    isDrag.value = false;
}

const drop = (event: any) => {
    isDrag.value = false;
    onUploadFile(event, true);
}
</script>