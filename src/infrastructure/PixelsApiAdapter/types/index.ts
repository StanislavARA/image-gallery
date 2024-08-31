export interface PixelsApiPhotosListResponse<T> {
    page: number;

    per_page: number;

    photos: Array<T>;
}
