import 'reflect-metadata';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {bootstrap} from './src/application/bootstrap';
import {RootStoreContext} from './src/ui/context/RootStoreContext';
import {useErrorModal} from './src/ui/hooks/modals/useErrorModal';

(async () => {
    const rootStore = bootstrap();

    rootStore.errorsDispatcher.setInterfaceErrorHandler(useErrorModal);

    const AppWrapper = (): React.ReactElement => {
        return (
            <RootStoreContext.Provider value={rootStore}>
                <App />
            </RootStoreContext.Provider>
        );
    };

    AppRegistry.registerComponent(appName, () => AppWrapper);
})();
