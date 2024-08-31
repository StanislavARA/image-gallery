import {PhotoPixelsApi} from './entities/PhotoPixelsApi';

export interface IPixelsApiAdapter {
    getPhotos(pageNumber: number): Promise<Array<PhotoPixelsApi>>;
}
