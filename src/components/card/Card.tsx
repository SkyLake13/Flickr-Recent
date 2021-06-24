import { useFavourite } from './useFavourite';
import { default as Picture } from '../picture/Picture';

import styles from './Card.module.scss';
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
        <div className={styles.card_overlay}>
            <div className={styles.card_info_container}>
                <div className={styles.title}>{title}</div>
                <hr className={styles.line_break}/>
                <div className={styles.owner}>{owner}</div>
                <button className={styles.favourite_btn}
                    onClick={() => makeFavourite()}>
                    { favourite ? 'Unfavourite' : 'Favourite' }
                </button>
            </div>
        </div>);

    return (
        <div className={styles.card_outer_container}>
            <div className={styles.card_inner_container}>
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