import { useEffect, useRef, useState } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';
import { Card } from '../card/Card';
import { getPhotos } from '../../integration/flickr-client';
import { Photo } from '../../integration/interfaces';

import styles from './Grid.module.scss';

function Grid({ perPageCount }: { perPageCount: number }) {
    const [page, setPage] = useState<number>(0);
    const [photos, setPhotos] = useState<Photo[]>([]);

    const bottom = useRef(null);
    const atBottom = useIntersectionObserver(bottom, { threshold: 0 });

    useEffect(() => {
        if(atBottom) {
            setPage(page+1);

            getPhotos(page, perPageCount).then((res) => {
                setPhotos([...photos, ...res.photos.photo]);
            });
        }
    }, [atBottom, perPageCount]);

    return (
            <div className={styles.outer_grid}>
                <div className={styles.side}></div>
                <div>
                    <div className={styles.grid}>
                        <CardList photos={photos} />
                    </div>
                    <div ref={bottom} className={styles.loading}>Loading...</div>
                </div>
                <div className={styles.side}></div>
                
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