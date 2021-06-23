import { useFavourite } from './useFavourite';
import { default as Picture } from '../picture/Picture';

import './Card.scss';
export interface CardProp {
    serverId: string, 
    photoId: string, 
    secret: string, 
    title: string,
    owner: string
}

function Card({ serverId, photoId, secret, title, owner }: CardProp) {
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
                <Picture serverId={serverId} 
                    photoId={photoId} 
                    secret={secret}  
                    title={title} />
            </div>
            { overlay }
        </div>
    );
}

export { Card };