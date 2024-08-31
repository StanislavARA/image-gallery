import {ErrorModalPayload} from '../../../application/services/ErrorInteractionDataGenerator';
import React from 'react';
import {ErrorModal} from '../../components/modals/ErrorModal';
import {showModal} from '../../components/ModalStack';

export function useErrorModal(data: ErrorModalPayload): void {
    showModal(closeModal => ({
        content: <ErrorModal data={data} closeModal={closeModal} />,
        onBackdropClick: closeModal,
        onCloseButtonClick: closeModal,
    }));
}
