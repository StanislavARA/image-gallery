import {useContext} from 'react';

import {RootStore, RootStoreContext} from '../context/RootStoreContext';

export const useAppStore = (): RootStore['applicationStore'] => {
    const rootStore = useContext(RootStoreContext);

    if (!rootStore) {
        throw new Error('Context error during initialization application');
    }

    return rootStore.applicationStore;
};
