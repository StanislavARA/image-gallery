import {InternalServerError} from '../../../sharedKernel/Errors/commonApiErrors/InternalServerError';
import {AuthError} from '../../../sharedKernel/Errors/commonApiErrors/AuthError';
import {ForbiddenError} from '../../../sharedKernel/Errors/commonApiErrors/ForbiddenError';
import {NotDefinedApiError} from '../../../sharedKernel/Errors/commonApiErrors/NotDefinedApiError';
import {NetworkError} from '../../../sharedKernel/Errors/commonApiErrors/NetworkError';
import {DefaultUserActionError} from '../../../sharedKernel/Errors/commonApiErrors/DefaultUserActionError';
import {InvalidResponseError} from '../../../sharedKernel/Errors/commonApiErrors/InvalidResponseError';

export interface ErrorModalPayload {
    title: string;

    text: string;
}

export class ErrorInteractionDataGenerator {
    public generatePayloadForModal(error: Error): ErrorModalPayload {
        const errorModalPayload: ErrorModalPayload = {
            title: 'Error',
            text: 'Unknown error',
        };

        if (error instanceof InternalServerError) {
            errorModalPayload.text = 'internalServerError';
        }

        if (error instanceof AuthError) {
            errorModalPayload.text = 'authError';
        }

        if (error instanceof ForbiddenError) {
            errorModalPayload.text = 'ForbiddenError';
        }

        if (error instanceof NotDefinedApiError) {
            errorModalPayload.text = 'NotDefinedApiError';
        }

        if (error instanceof NetworkError) {
            errorModalPayload.text = 'Попробуйте включить VPN';
        }

        if (error instanceof DefaultUserActionError) {
            errorModalPayload.text = 'DefaultUserActionError';
        }

        if (error instanceof InvalidResponseError) {
            errorModalPayload.text = 'InvalidResponseError';
        }

        return errorModalPayload;
    }
}
