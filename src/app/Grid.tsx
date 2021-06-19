import { useEffect, useState } from 'react';
import Card from './Card';
import { getPhotos } from './integration/http-client';
import { RootObject } from './integration/interfaces';

import './Grid.scss';

export function Grid() {
    const [size] = useState<string>('w');

    const [ rootObject, setRootObject ] = useState<RootObject>();

    useEffect(() => {
        getPhotos(1, 20).then((res) => setRootObject(res));
    }, []);

    const cardList = () => {
        return rootObject?.photos.photo
        .map((photo) => <Card key={photo.id} serverId={photo.server} 
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