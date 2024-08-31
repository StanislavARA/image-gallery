import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'stretch',
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },

    modal__info: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    title: {
        fontSize: 17,
        lineHeight: 20,
        fontWeight: '700',
        color: '#000000',
    },

    text: {
        fontSize: 12,
        lineHeight: 14,
        color: '#000000',
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000',
        backgroundColor: 'orange',
        marginHorizontal: 10,
        borderRadius: 16,
        height: 50,
    },

    button__text: {
        fontSize: 17,
        lineHeight: 20,
        fontWeight: '700',
    },
});
