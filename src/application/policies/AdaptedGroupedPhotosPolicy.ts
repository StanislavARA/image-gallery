import {PhotoPixels} from '../entities/PhotoPixels';

const PHOTOS_IN_GROUP = 2;

export class AdaptedGroupedDishesPolicy {
    constructor(private photos: Array<PhotoPixels>) {}

    public getGroupsForRender(): Array<Array<PhotoPixels>> {
        const result: Array<Array<PhotoPixels>> = [];

        for (
            let i = 0;
            i < Math.ceil(this.photos.length / PHOTOS_IN_GROUP);
            i++
        ) {
            const groups = this.photos.slice(
                i * PHOTOS_IN_GROUP,
                i * PHOTOS_IN_GROUP + PHOTOS_IN_GROUP
            );

            result.push(groups);
        }

        return result;
    }
}
