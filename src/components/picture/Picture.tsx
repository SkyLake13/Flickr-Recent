import { memo } from 'react';

import { getPhotoUrl } from '../../integration/flickr-client';

import styles from './Picture.module.scss';

/* https://www.flickr.com/services/api/misc.urls.html
s	thumbnail	75	cropped square
q	thumbnail	150	cropped square
t	thumbnail	100	
m	small	240	
n	small	320	
w	small	400	
(none)	medium	500	
z	medium	640	
c	medium	800	 
*/

function Picture({ serverId, photoId, secret, title }: { serverId: string, photoId: string, secret: string, title: string }): JSX.Element {

    const mediaSize = [
        { media: '(min-width: 310px) and (max-width: 420px)', size: 'q' },
        { media: '(min-width: 421px) and (max-width: 768px)', size: 'n' },
        { media: '(min-width: 769px) and (max-width: 1366px)', size: 'w' },
        { media: '(min-width: 1367px)', size: 'z' }
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
        <picture className={styles.card_picture}>
            { sources }
            <img src={defaultSrc} alt={title} loading="lazy" />
        </picture>
    )
}

export default memo(Picture);