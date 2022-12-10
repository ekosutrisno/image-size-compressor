<template>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 w-full p-5 md:p-10 gap-5">
        <ImageComparator v-for="file in files" :key="file.id" :image="file" class="h-full w-full object-cover" />
    </div>
</template>

<script setup lang="ts">
import { ImagesModel } from '@/model/images.model';
import ImageComparator from './ImageComparator.vue';
defineProps<{ files: ImagesModel[] }>()
</script>