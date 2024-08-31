import {action, makeObservable, observable, computed} from 'mobx';
import {PhotoPixels} from '../entities/PhotoPixels';

import {PixelsApiAdapter} from '../../infrastructure/PixelsApiAdapter';
import {PhotosAdapter} from '../../infrastructure/PixelsApiAdapter/adapters/PhotosAdapter';
import {AdaptedGroupedDishesPolicy} from '../policies/AdaptedGroupedPhotosPolicy';

export class PhotosStore {
    public currentPhotosPage = 1;

    public photos: Array<PhotoPixels>;

    constructor(
        private pixelsApiAdapter: PixelsApiAdapter,
        private photosAdapter: PhotosAdapter
    ) {
        this.photos = [];

        makeObservable(this, {
            photos: observable,
            currentPhotosPage: observable,

            setPhotos: action,
            requestPhotos: action,
            setCurrentPhotosPage: action,
            increaseCurrentPhotosPage: action,
            refresh: action,
            clearPhotos: action,

            mainScreenPhotosQuery: computed,
        });
    }

    async requestPhotos(): Promise<void> {
        const photos = await this.pixelsApiAdapter.getPhotos(
            this.currentPhotosPage
        );

        if (photos.length !== 0) {
            const adaptedPhotos = this.photosAdapter.adapt(photos);

            this.setPhotos(adaptedPhotos);

            this.increaseCurrentPhotosPage();
        }
    }

    async refresh(): Promise<void> {
        this.setCurrentPhotosPage(1);

        this.clearPhotos();

        await this.requestPhotos();
    }

    setPhotos(photos: Array<PhotoPixels>): void {
        this.photos.push(...photos)
    }

    clearPhotos(): void {
        this.photos = [];
    }

    setCurrentPhotosPage(value: number): void {
        this.currentPhotosPage = value;
    }

    increaseCurrentPhotosPage(): void {
        this.setCurrentPhotosPage(this.currentPhotosPage + 1);
    }

    get mainScreenPhotosQuery(): Array<Array<PhotoPixels>> {
        return new AdaptedGroupedDishesPolicy(this.photos).getGroupsForRender();
    }
}
