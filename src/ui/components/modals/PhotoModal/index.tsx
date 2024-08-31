import React from 'react';

import {styles} from './styles';
import {View} from 'react-native';
import {PhotoPixels} from '../../../../application/entities/PhotoPixels';
import FastImage from 'react-native-fast-image';

interface Props {
    photo: PhotoPixels;
}

export const PhotoModal: React.FC<Props> = props => {
    return (
        <View style={styles.wrapper}>
            <FastImage
                style={styles.photo}
                source={{uri: props.photo.mediumUrl}}
            />
        </View>
    );
};
