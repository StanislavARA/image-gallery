import {observer} from 'mobx-react-lite';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useAppStore} from '../../hooks/useAppStore';
import {PhotosList} from '../../components/PhotosList';
import {styles} from './styles';

export const MainScreen: React.FC = observer((): React.ReactElement => {
    const {isInitialized} = useAppStore();

    return isInitialized ? (
        <PhotosList />
    ) : (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
    );
});
