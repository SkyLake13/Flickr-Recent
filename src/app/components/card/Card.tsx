import { getPhotoUrl } from '../../integration/flickr-client';
import { useFavourite } from './useFavourite';

import './Card.scss';
export interface CardProp {
    serverId: string, 
    photoId: string, 
    secret: string, 
    size: string,
    title: string,
    owner: string
}

function Card({ serverId, photoId, secret, size, title, owner }: CardProp) {
    const url = getPhotoUrl(serverId, photoId, secret, size);

    const [favourite, toggleFavourite] = useFavourite(serverId, photoId);

    const makeFavourite = () => {
        toggleFavourite();
    };

    const overlay = (
        <div className="card-overlay">
            <div className="card-info-container">
                <div className="title">{title}</div>
                <hr className="line-break"/>
                <div className="owner">{owner}</div>
                <button className="favourite-btn"
                    onClick={() => makeFavourite()}>
                    { favourite ? 'Unfavourite' : 'Favourite' }
                </button>
            </div>
        </div>);

    return (
        <div className="card-outer-container">
            <div className="card-inner-container">
                <picture>
                    <img src={url} alt={title} />
                </picture>
            </div>
            { overlay }
        </div>
    );
}

export { Card };