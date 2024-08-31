import React from 'react';

import {styles} from './styles';
import {ErrorModalPayload} from '../../../../application/services/ErrorInteractionDataGenerator';
import {Text, TouchableOpacity, View} from 'react-native';

interface Props {
    data: ErrorModalPayload;

    closeModal: () => void;
}

export const ErrorModal: React.FC<Props> = props => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.modal__info}>
                <Text style={styles.title}>{props.data.title}</Text>

                <Text style={styles.text}>{props.data.text}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={props.closeModal}>
                <Text style={styles.button__text}>{'OK'}</Text>
            </TouchableOpacity>
        </View>
    );
};
