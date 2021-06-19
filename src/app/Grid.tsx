import { useEffect, useState } from 'react';
import Card from './Card';
import { getPhotos } from './integration/http-client';
import { Photo, RootObject } from './integration/interfaces';

import './Grid.scss';

export function Grid() {
    const [size] = useState<string>('w');
    const [page, setPage] = useState<number>(1);

    const [ photos, setPhotos ] = useState<Photo[]>([]);

    const scrollListener = (): void => {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;

        if(currentScroll > documentHeight) {
            document.removeEventListener('scroll', scrollListener);
            console.log('You are at the bottom!')
            setPage(page + 1);
        }
    }

    document.addEventListener('scroll', scrollListener);

    useEffect(() => {
        getPhotos(page, 20).then((res) => {
            const _photos = [...photos, ...res.photos.photo];
            setPhotos(_photos);
        });
    }, [page]);

    const cardList = () => {
        return photos.map((photo) => <Card key={photo.id} serverId={photo.server} 
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