import { useEffect, useRef, useState } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';
import { Card } from '../card/Card';
import { getPhotos } from '../../integration/flickr-client';
import { Photo } from '../../integration/interfaces';

import styles from './Grid.module.scss';
import { isFavourite, saveFavourite } from '../../integration/favourite';

function Grid({ perPageCount }: { perPageCount: number }) {
    const page = useRef<number>(0);
    const [photos, setPhotos] = useState<Photo[]>([]);

    const bottom = useRef(null);
    const atBottom = useIntersectionObserver(bottom, { threshold: 0 });

    useEffect(() => {
        if(atBottom) {
            page.current = page.current + 1;

            getPhotos(page.current, perPageCount).then((res) => {
                setPhotos((photos) => [...photos, ...res.photos.photo]);
            });
        }
    }, [atBottom, perPageCount]);

    const toggleFavourite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as any;
        const serverId = target.dataset.serverId;
        const photoId = target.dataset.photoId;

        const favourite = isFavourite(serverId, photoId);
        saveFavourite(serverId, photoId, !favourite);
        target.textContent = !favourite ? 'Unfavourite' : 'Favourite';
    }

    return (
            <div className={styles.outer_grid}>
                <div className={styles.grid_margin}>
                    <div className={styles.grid} onClick={ e => toggleFavourite(e) }>
                        <CardList photos={photos} />
                    </div>
                    <div ref={bottom} className={styles.loading}>Loading...</div>
                </div>
            </div>
    );
}

function CardList({photos}: {photos: Photo[]}): JSX.Element {
    return (
        <>
            {
                photos.map((photo, i) => <Card key={ `${photo.server}_${photo.id}_${i}` }
                                                serverId={photo.server} 
                                                photoId={photo.id} 
                                                secret={photo.secret} 
                                                title={photo.title}
                                                owner={photo.owner} 
                                        />)
            }
        </>
        
    )
}

export { Grid };