import {ErrorsDispatcher} from './services/ErrorsDispatcher';
import {ErrorInteractionDataGenerator} from './services/ErrorInteractionDataGenerator';
import {
    PIXELS_API_KEY,
    PIXELS_URL,
} from '../infrastructure/PixelsApiAdapter/config';
import {PixelsApiAdapter} from '../infrastructure/PixelsApiAdapter';
import {ApplicationStore} from './stores/ApplicationStore';
import {PixelsApiRequestService} from '../infrastructure/PixelsApiAdapter/PixelsApiRequestService';
import {PixelsErrorFactory} from '../infrastructure/PixelsErrorFactory';
import {PhotosStore} from './stores/PhotosStore';
import {PhotosAdapter} from '../infrastructure/PixelsApiAdapter/adapters/PhotosAdapter';
import {setUnhandledPromiseRejectionTracker} from 'react-native-promise-rejection-utils';

export function bootstrap() {
    const errorsDispatcher = new ErrorsDispatcher(
        new ErrorInteractionDataGenerator()
    );

    const pixelsApiRequestService = new PixelsApiRequestService(
        new PixelsErrorFactory(),
        PIXELS_URL,
        PIXELS_API_KEY
    );

    const pixelsApiAdapter = new PixelsApiAdapter(pixelsApiRequestService);

    const photosStore = new PhotosStore(pixelsApiAdapter, new PhotosAdapter());

    const applicationStore = new ApplicationStore(photosStore);

    ErrorUtils.setGlobalHandler(function (error: Error) {
        errorsDispatcher.handleError(error);
    });

    setUnhandledPromiseRejectionTracker((id, error) => {
        errorsDispatcher.handleError(error as Error);
    });

    return {
        applicationStore,
        errorsDispatcher,
    };
}
