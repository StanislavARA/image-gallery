import React from 'react';
import {showModal} from '../../components/ModalStack';
import {PhotoPixels} from '../../../application/entities/PhotoPixels';
import {PhotoModal} from '../../components/modals/PhotoModal';

export function usePhotoModal(): {
    showPhotoModal: (photo: PhotoPixels) => void;
} {
    return {
        showPhotoModal(photo: PhotoPixels) {
            showModal(closeModal => ({
                content: <PhotoModal photo={photo} />,
                onBackdropClick: () => closeModal(),
            }));
        },
    };
}
