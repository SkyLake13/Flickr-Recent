import { getPhotoUrl } from './integration/http-client';

export default function({ serverId, photoId, secret, size }
                                : {serverId: string, photoId: string, secret: string, size: string}) {
    const url = getPhotoUrl(serverId, photoId, secret, size);

    return (
        <div className="card-outer-container">
            <div className="card-inner-container">
                <picture>
                    <img src={url} alt="" />
                </picture>
            </div>
        </div>
    );
}