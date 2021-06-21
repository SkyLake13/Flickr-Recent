import { useCallback, useEffect, useState } from 'react';

import { Card } from '../card/Card';
import { getPhotos } from '../../integration/flickr-client';
import { Photo } from '../../integration/interfaces';
import { debouncedListener } from './scroll-event-listener';

import './Grid.scss';


const SCROLL_EVENT = 'scroll';

function Grid({ perPageCount }: { perPageCount: number }) {
    const size = 'm';

    const [page, setPage] = useState<number>(1);
    const [ photos, setPhotos ] = useState<Photo[]>([]);

    useEffect(() => {
        getPhotos(page, perPageCount).then((res) => {
            setPhotos([...photos, ...res.photos.photo]);
        });
        // Remove Scroll event listener at component unmount
        return document.removeEventListener(SCROLL_EVENT, scrollListenerCallback);
    }, [page]);

    // Callback when scroll position is at bottom
    const atBottom = () => {
        // Remove Scroll event listener at bottom
        document.removeEventListener(SCROLL_EVENT, scrollListenerCallback);
        setPage(page + 1);
    }

    const scrollListenerCallback = useCallback(() => debouncedListener(() => atBottom()), [page])

    document.addEventListener(SCROLL_EVENT, scrollListenerCallback);

    const cardList = () => {
        return photos.map((photo, i) => <Card 
                                key={ `${photo.server}_${photo.id}_${i}` }
                                serverId={photo.server} 
                                photoId={photo.id} 
                                secret={photo.secret} 
                                size={size} 
                                title={photo.title}
                                owner={photo.owner}/>);
    }

    return (
        <div className="grid-container">
            {cardList()}
        </div>
    );
}

export { Grid };