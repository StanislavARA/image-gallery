import {Dimensions} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

export const commonStyles = {
    deviceWidth,

    deviceHeight,
};
