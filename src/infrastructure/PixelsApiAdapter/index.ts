import {PixelsApiRequestService} from './PixelsApiRequestService';
import {PhotoPixelsApi} from '../../application/infrastructurePorts/entities/PhotoPixelsApi';
import {PIXELS_API_ENDPOINTS} from './config';
import {PixelsApiPhotosListResponse} from './types';
import {InvalidResponseError} from '../../sharedKernel/Errors/commonApiErrors/InvalidResponseError';
import {IPixelsApiAdapter} from '../../application/infrastructurePorts/IPixelsApiAdapter';

export class PixelsApiAdapter implements IPixelsApiAdapter {
    constructor(private pixelsApiRequestService: PixelsApiRequestService) {}

    private async fetchListEntities<T>(
        endpoint: PIXELS_API_ENDPOINTS,
        params?: Record<any, any>
    ): Promise<T> {
        const response = await this.pixelsApiRequestService.get<T>({
            endpoint,
            params: params,
        });

        if (!response) {
            throw new InvalidResponseError();
        }

        return response;
    }

    async getPhotos(pageNumber: number): Promise<Array<PhotoPixelsApi>> {
        const response = await this.fetchListEntities<
            PixelsApiPhotosListResponse<PhotoPixelsApi>
        >(PIXELS_API_ENDPOINTS.CURATED, {
            page: pageNumber,
        });

        return response.photos;
    }
}
