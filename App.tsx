import React from 'react';
import {
    createNavigationContainerRef,
    NavigationContainer,
} from '@react-navigation/native';
import {ModalStack} from './src/ui/components/ModalStack';
import {observer} from 'mobx-react-lite';
import {MainStack} from './src/ui/navigation/MainStack';
import {useAppStore} from './src/ui/hooks/useAppStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const navigationRef = createNavigationContainerRef();

const App = observer(() => {
    const store = useAppStore();

    store.init();

    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
                <ModalStack />

                <MainStack />
            </NavigationContainer>
        </SafeAreaProvider>
    );
});
export default App;
