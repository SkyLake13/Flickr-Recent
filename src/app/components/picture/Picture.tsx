import { memo } from 'react';

import { getPhotoUrl } from '../../integration/flickr-client';

function Picture({ serverId, photoId, secret, title }: { serverId: string, photoId: string, secret: string, title: string }): JSX.Element {

    const mediaSize = [
        { media: '(min-width: 320px) and (max-width: 480px)', size: 'q' },
        { media: '(min-width: 768px) and (max-width: 1024px)', size: 'n' },
        { media: '(min-width: 1281px)', size: 'z' }
    ];

    const mediaUrls = mediaSize.map((el) => {
        return {
            media: el.media,
            src: getPhotoUrl(serverId, photoId, secret, el.size)
        };
    });

    const sources = mediaUrls.map((el) => <source key={el.media} srcSet={el.src} media={el.media} />);

    const defaultSrc = getPhotoUrl(serverId, photoId, secret, 'z');

    return (
        <picture>
            { sources }
            <img src={defaultSrc} alt={title} loading="lazy" />
        </picture>
    )
}

export default memo(Picture);