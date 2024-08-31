import {
    ErrorInteractionDataGenerator,
    ErrorModalPayload,
} from '../ErrorInteractionDataGenerator';
import {ApplicationError} from '../../../sharedKernel/Errors/ApplicationError';

export class ErrorsDispatcher {
    private interfaceErrorHandler?: (data: ErrorModalPayload) => void;

    constructor(
        private errorInteractionDataGenerator: ErrorInteractionDataGenerator
    ) {}

    public setInterfaceErrorHandler(
        handler: (data: ErrorModalPayload) => void
    ) {
        this.interfaceErrorHandler = handler;
    }

    public handleError(error: Error): void {
        if (error instanceof ApplicationError && this.interfaceErrorHandler) {
            this.interfaceErrorHandler(
                this.errorInteractionDataGenerator.generatePayloadForModal(
                    error
                )
            );
        } else {
            console.warn(error.name);
            console.warn(error.message);
            console.warn(error.stack);
        }
    }
}
