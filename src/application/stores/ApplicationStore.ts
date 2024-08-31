import {action, makeObservable, observable} from 'mobx';
import {PhotosStore} from './PhotosStore';

export class ApplicationStore {
    public isInitialized = false;

    constructor(public photosStore: PhotosStore) {
        makeObservable(this, {
            isInitialized: observable,

            setIsInitialized: action,
            init: action,
        });
    }

    async init(): Promise<void> {
        try {
            await this.photosStore.requestPhotos();
        } finally {
            this.setIsInitialized(true);
        }
    }

    setIsInitialized(value: boolean): void {
        this.isInitialized = value;
    }
}
