import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

export const MainStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={'MAIN_SCREEN'}>
            <Stack.Screen name="MAIN_SCREEN" component={MainScreen} />
        </Stack.Navigator>
    );
};
