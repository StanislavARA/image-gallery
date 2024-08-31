import {StyleSheet} from 'react-native';
import {commonStyles} from '../../../commonStyles/common-styles';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    photo: {
        flex: 1,
        borderRadius: 20,
        width: commonStyles.deviceWidth,
        height: commonStyles.deviceHeight,
    },
});
