import {createContext} from 'react';

import {bootstrap} from '../../application/bootstrap';

export type RootStore = ReturnType<typeof bootstrap>;

export const RootStoreContext = createContext<null | RootStore>(null);
