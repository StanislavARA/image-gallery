import {PhotoPixels} from '../../../application/entities/PhotoPixels';
import {PhotoPixelsApi} from '../../../application/infrastructurePorts/entities/PhotoPixelsApi';

export class PhotosAdapter {
    public adapt(employees: Array<PhotoPixelsApi>): Array<PhotoPixels> {
        return employees.map(photo => {
            return {
                id: photo.id,
                width: photo.width,
                height: photo.height,
                tinyUrl: photo.src.tiny,
                mediumUrl: photo.src.medium,
                alt: photo.alt,
            };
        });
    }
}
