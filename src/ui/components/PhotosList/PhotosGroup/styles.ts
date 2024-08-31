import {StyleSheet} from 'react-native';

import {commonStyles} from '../../../commonStyles/common-styles';

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },

    item: {
        borderRadius: 10,
        width: commonStyles.deviceWidth / 2,
        height: commonStyles.deviceWidth / 2,
    },
});
