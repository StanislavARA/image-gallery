import axios from 'axios';
import {PIXELS_API_ENDPOINTS} from '../config';
import {PixelsErrorFactory} from '../../PixelsErrorFactory';

export interface ApiRequestOptionsInterface {
    endpoint: PIXELS_API_ENDPOINTS;

    params?: Record<string, string>;
}

export class PixelsApiRequestService {
    constructor(
        private pixelsErrorFactory: PixelsErrorFactory,
        private url: string,
        private apiKey: string
    ) {}

    public async get<T>(options: ApiRequestOptionsInterface): Promise<T> {
        const response = await axios
            .get(
                options.params !== undefined
                    ? this.attachUrlParams(
                          this.assembleUrl(options.endpoint),
                          options.params
                      )
                    : this.assembleUrl(options.endpoint),

                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.apiKey,
                    },
                }
            )
            .catch(() => {
                throw this.pixelsErrorFactory.createNetworkError();
            });

        if (response.status !== 200) {
            throw this.pixelsErrorFactory.createApiError(response.status);
        }

        return response.data;
    }

    private assembleUrl(endpoint: string): string {
        return `${this.url}/${endpoint}`;
    }

    private attachUrlParams(
        url: string,
        params: Record<string, string>
    ): string {
        return Object.keys(params).reduce<string>((resultUrl, key, index) => {
            const value = params[key];

            if (index === 0) {
                return `${resultUrl}?${key}=${value}`;
            }

            return `${resultUrl}&${key}=${value}`;
        }, url);
    }
}
