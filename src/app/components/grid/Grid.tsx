import { useCallback, useEffect, useState } from 'react';
import { Card } from '../card/Card';
import { getPhotos } from '../../integration/http-client';
import { Photo } from '../../integration/interfaces';

import './Grid.scss';

export function Grid() {
    const size = 'm';
    const perPageCount = 20;

    const [page, setPage] = useState<number>(1);
    const [ photos, setPhotos ] = useState<Photo[]>([]);

    const scrollListener = useCallback((): void => {
        const documentHeight = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;

        if(currentScroll + 200 > documentHeight) {
            document.removeEventListener('scroll', scrollListener);
            setPage(page + 1);
        }
    }, [page])

    document.addEventListener('scroll', scrollListener);

    useEffect(() => {
        getPhotos(page, perPageCount).then((res) => {
            setPhotos([...photos, ...res.photos.photo]);
        });
    }, [page]);

    const cardList = () => {
        return photos.map((photo) => <Card 
                                key={ `${photo.server}_${photo.id}_${photo.title}` }
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