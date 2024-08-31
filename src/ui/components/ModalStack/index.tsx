import {last, remove} from 'lodash';
import {action, observable, runInAction} from 'mobx';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import Modal from 'react-native-modal';

import {styles} from './styles';
import {uuidv4} from '../../../utils/uuid';
import {commonStyles} from '../../commonStyles/common-styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ANIMATION_TIME = 200;

export interface ModalShowParams {
    content: React.ReactNode;
}

type ModalStackItem = ModalShowParams & {
    modalId: string;

    closeModal: () => void;
};

const modalStack: Array<ModalStackItem> = observable([]);

export const showModal = action(
    (getParams: (closeModal: () => void) => ModalShowParams): Promise<void> => {
        return new Promise(resolve => {
            const modalId = uuidv4();

            const closeModal = (): void => {
                runInAction(() => {
                    remove(
                        modalStack,
                        (item: ModalStackItem) => item.modalId === modalId
                    );
                });

                resolve();
            };

            const modalParams = getParams(closeModal);

            modalStack.push({
                ...modalParams,
                modalId,
                closeModal,
            });
        });
    }
);

export const ModalStack: React.FC = observer(() => {
    const topModal = last(modalStack) as ModalStackItem;

    const insets = useSafeAreaInsets();

    const topRef = useRef(new Animated.Value(0)).current;

    const animateOpeningModal = (): void => {
        Animated.timing(topRef, {
            toValue: 1,
            duration: ANIMATION_TIME,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    const animateClosureModal = (): void => {
        Animated.timing(topRef, {
            toValue: 0,
            duration: ANIMATION_TIME,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            topModal.closeModal && topModal.closeModal();
        });
    };

    const renderContent = (): React.ReactElement => (
        <View style={styles.contentArea}>{topModal.content}</View>
    );

    useEffect(() => {
        if (topModal) {
            animateOpeningModal();
        }
    }, [topModal]);

    return (
        <>
            {topModal && (
                <Modal
                    style={[styles.container, {top: insets.top}]}
                    isVisible
                    useNativeDriverForBackdrop
                    swipeDirection={['down']}
                    swipeThreshold={100}
                    onBackdropPress={animateClosureModal}
                    onSwipeComplete={animateClosureModal}
                    onBackButtonPress={animateClosureModal}
                    propagateSwipe>
                    <Animated.View
                        style={[
                            styles.swipeableArea,
                            {
                                top: topRef.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [commonStyles.deviceHeight, 0],
                                }),
                            },
                        ]}>
                        {renderContent()}
                    </Animated.View>
                </Modal>
            )}
        </>
    );
});
