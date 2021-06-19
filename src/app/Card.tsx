import { getPhotoUrl } from './integration/http-client';

import './Card.scss';
import { useEffect, useState } from 'react';
import { isFavourite, setFavourite, removeFavourite } from './integration/favourite';

interface CardProp {
    serverId: string, 
    photoId: string, 
    secret: string, 
    size: string,
    title: string,
    owner: string
}

export default function({ serverId, photoId, secret, size, title, owner }: CardProp) {
    const url = getPhotoUrl(serverId, photoId, secret, size);

    const [hover, setHover] = useState<boolean>(false);
    const [favourite, setfavourite] = useState<boolean>(false);

    useEffect(() => {
        const _ = isFavourite(serverId, photoId);
        setfavourite(_);
    }, [favourite]);

    const mouseEnter = () => {
        setHover(true);
    };

    const mouseLeave = () => {
        setHover(false);
    };

    const makeFavourite = () => {
        if (favourite) {
            removeFavourite(serverId, photoId);
        } else {
            setFavourite(serverId, photoId);
        }
        
        setfavourite(!favourite);
    };

    const overlay = () => {
        return (<div className="overlay">
                    <div className="favourite-outer-container">
                        <div className="favourite-container">
                            <div className="title">{title}</div>
                            {/* <div className="line-break"> </div> */}
                            <hr className="line-break"/>
                            <div className="owner">{owner}</div>
                            <button className="favourite-btn"
                                onClick={() => makeFavourite()}>
                                    { favourite ? 'Unfavourite' : 'Favourite' }
                                </button>
                        </div>
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
            { true && overlay() }
        </div>
    );
}