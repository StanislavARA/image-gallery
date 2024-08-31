import {AuthError} from '../../sharedKernel/Errors/commonApiErrors/AuthError';
import {ForbiddenError} from '../../sharedKernel/Errors/commonApiErrors/ForbiddenError';
import {NotFoundError} from '../../sharedKernel/Errors/commonApiErrors/NotFoundError';
import {InternalServerError} from '../../sharedKernel/Errors/commonApiErrors/InternalServerError';
import {NoConnectionToTheServerError} from '../../sharedKernel/Errors/commonApiErrors/NoConnectionToTheServerError';
import {NotDefinedApiError} from '../../sharedKernel/Errors/commonApiErrors/NotDefinedApiError';
import {NetworkError} from '../../sharedKernel/Errors/commonApiErrors/NetworkError';
import {DefaultUserActionError} from '../../sharedKernel/Errors/commonApiErrors/DefaultUserActionError';
import {ApplicationError} from '../../sharedKernel/Errors/ApplicationError';

export class PixelsErrorFactory {
    public createApiError(status: number): ApplicationError {
        switch (status) {
            case 400:
                return new DefaultUserActionError();
            case 401:
                return new AuthError();
            case 403:
                return new ForbiddenError();
            case 404:
                return new NotFoundError();
            case 500:
                return new InternalServerError();
            case 503:
                return new NoConnectionToTheServerError();
            default:
                return new NotDefinedApiError();
        }
    }

    public createNetworkError(): NetworkError {
        return new NetworkError();
    }
}
