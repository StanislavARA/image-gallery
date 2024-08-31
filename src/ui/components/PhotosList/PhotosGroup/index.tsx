import {observer} from 'mobx-react-lite';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {PhotoPixels} from '../../../../application/entities/PhotoPixels';
import FastImage from 'react-native-fast-image';
import {usePhotoModal} from '../../../hooks/modals/usePhotoModal';
import {uuidv4} from '../../../../utils/uuid';

interface Props {
    group: Array<PhotoPixels>;
}

export const PhotosGroup: React.FC<Props> = observer(props => {
    const {showPhotoModal} = usePhotoModal();

    return (
        <View style={styles.wrapper}>
            {props.group.map(photo => {
                return (
                    <TouchableOpacity
                        key={uuidv4()}
                        onPress={() => showPhotoModal(photo)}>
                        <FastImage
                            style={[styles.item]}
                            source={{uri: photo.tinyUrl}}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
});
