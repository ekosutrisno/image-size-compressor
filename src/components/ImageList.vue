<template>
    <section class="p-5 md:p-10">
        <div class="flex items-center justify-between space-x-4 mb-10">
            <div>
                <h1 class="font-semibold">List of Images</h1>
            </div>
            <div class="inline-flex items-center justify-between space-x-4 ">
                <button type="button" @click="downloadAll" class="bg-white border text-sm hover:text-white hover:bg-sky-500 transition-colors text-sky-500 inline-flex items-center space-x-2 border-sky-400 rounded-md py-1.5 px-3">
                    <svg width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M470.7 280.2c3-11.2 4.7-22.9 4.7-35c0-75.8-61.4-137.1-137.1-137.1c-19.5 0-38 4.1-54.7 11.4c-16.8-39-55.6-66.3-100.7-66.3c-60.6 0-109.7 49.1-109.7 109.7c0 4.1.8 7.9 1.2 11.9C30.5 195.1 0 239.3 0 290.9c0 70.7 57.3 128 128 128h310.9c40.4 0 73.1-32.7 73.1-73.1c0-29-16.9-53.7-41.3-65.6zM256 364l-91.4-91.4h54.9v-91.4h73.1v91.4h54.9L256 364z"/></svg>
                    <span>Download All</span>
                </button>
                <button type="button" @click="$emit('clear')" class="bg-white border text-sm hover:text-white hover:bg-sky-500 transition-colors text-sky-500 inline-flex items-center space-x-2 border-sky-400 rounded-md py-1.5 px-3">
                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"/></svg>
                    <span>Clear All</span>
                </button>
            </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-10">
            <ImageComparator @remove="remove" v-for="file in files" :key="file.id" :image="file" class="h-full w-full object-cover" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ImagesModel } from '@/model/images.model';
import ImageComparator from './ImageComparator.vue';
import JSZip from "jszip";
import FileSaver from "file-saver";
import { ref } from 'vue';

const props = defineProps<{ files: ImagesModel[] }>();
const status = ref<number>(0);

function downloadAll() {
    const zip = new JSZip();

    props.files.forEach((images: ImagesModel)=> {
        const file = images.fileCompressed;

        status.value += 1;

        // Zipping Process
        zip.file(file.name, file, {binary: true});

        if(status.value == props.files.length){
            zip.generateAsync({"type": "blob"})
                .then((content: any) =>{
                    FileSaver.saveAs(
                        content,
                        `compressed_images.zip`
                      );

                });
        };

    })


}

function remove(image:ImagesModel) {
    const index = props.files.indexOf(image);

    if(index > -1) 
        props.files.splice(index, 1);
}
</script>