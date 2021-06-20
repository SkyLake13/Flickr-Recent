import { getPhotoUrl } from '../../integration/flickr-client';
import { useState } from 'react';

import './Card.scss';
import { useFavourite } from './useFavourite';

interface CardProp {
    serverId: string, 
    photoId: string, 
    secret: string, 
    size: string,
    title: string,
    owner: string
}

export function Card({ serverId, photoId, secret, size, title, owner }: CardProp) {
    const url = getPhotoUrl(serverId, photoId, secret, size);

    const [hover, setHover] = useState<boolean>(false);
    const [favourite, toggleFavourite] = useFavourite(serverId, photoId);

    const mouseEnter = () => {
        setHover(true);
    };

    const mouseLeave = () => {
        setHover(false);
    };

    const makeFavourite = () => {
        toggleFavourite();
    };

    const overlay = () => {
        return (<div className="overlay">
                    <div className="favourite-container">
                        <div className="title">{title}</div>
                        <hr className="line-break"/>
                        <div className="owner">{owner}</div>
                        <button className="favourite-btn"
                            onClick={() => makeFavourite()}>
                                { favourite ? 'Unfavourite' : 'Favourite' }
                            </button>
                    </div>
                </div>);
    };

    return (
        <div className="card-outer-container" onMouseEnter={() => mouseEnter()}
        onMouseLeave={() => mouseLeave()}>
            <div className="card-inner-container">
                <picture>
                    <img src={url} alt="" />
                </picture>
            </div>
            { hover && overlay() }
        </div>
    );
}