import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {styles} from './styles';
import {PhotoPixels} from '../../../application/entities/PhotoPixels';
import {useAppStore} from '../../hooks/useAppStore';
import {uuidv4} from '../../../utils/uuid';
import {PhotosGroup} from './PhotosGroup';

export const PhotosList: React.FC = observer(() => {
    const {photosStore, isInitialized} = useAppStore();

    const [isPending, setIsPending] = useState(false);

    const loadMore = async () => {
        setIsPending(true);

        await photosStore.requestPhotos();

        setIsPending(false);
    };

    const photosListForRender = useMemo(
        () => photosStore.mainScreenPhotosQuery,
        [photosStore.mainScreenPhotosQuery]
    );

    const renderPhoto = useCallback(({item}: {item: Array<PhotoPixels>}) => {
        return <PhotosGroup group={item} />;
    }, []);

    return (
        <View style={styles.wrapper}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                keyExtractor={() => uuidv4()}
                data={photosListForRender}
                contentContainerStyle={styles.flatList}
                renderItem={renderPhoto}
                windowSize={5}
                maxToRenderPerBatch={8}
                onEndReached={async () => {
                    await loadMore();
                }}
                onEndReachedThreshold={0.5}
                refreshing={!isInitialized}
                onRefresh={() => photosStore.refresh()}
                ListFooterComponent={() => {
                    return isPending ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : null;
                }}
            />
        </View>
    );
});
