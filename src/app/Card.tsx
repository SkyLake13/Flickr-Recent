import { getPhotoUrl } from './integration/http-client';

import './Card.scss';

export default function({ serverId, photoId, secret, size, title, owner }
                                : {
                                    serverId: string, 
                                    photoId: string, 
                                    secret: string, 
                                    size: string,
                                    title: string,
                                    owner: string
                                }) {
    const url = getPhotoUrl(serverId, photoId, secret, size);

    return (
        <div className="card-outer-container">
            <div className="card-inner-container">
                <picture>
                    <img src={url} alt="" />
                </picture>
            </div>
            <div className="overlay">
                <div className="favourite-outer-container">
                    <div className="favourite-container">
                        <div className="title">{title}</div>
                        <div className="line-break"> </div>
                        <div className="owner">{owner}</div>
                        <button className="favourite-btn">Favourite</button>
                    </div>
                </div>
            </div>
        </div>
    );
}