export interface ImagesModel {
    fileOriginal: File | Blob;
    fileOriginalUrl: string;
    fileCompressed: File | Blob;
    fileCompressedUrl: string;
    id: number;
}