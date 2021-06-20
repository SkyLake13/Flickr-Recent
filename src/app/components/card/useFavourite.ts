import { useEffect, useState } from 'react';
import { isFavourite, removeFavourite, addFavourite } from '../../integration/favourite';

export function useFavourite(serverId: string, photoId: string): [ boolean, () => void ] {
    const [fav, setFav] = useState<boolean>(false);

    useEffect(() => {
        const _ = isFavourite(serverId, photoId);
        setFav(_);
    }, [fav]);

    const setFavourite = () => {
        if (fav) {
            removeFavourite(serverId, photoId);
        } else {
            addFavourite(serverId, photoId);
        }
        
        setFav(!fav);
    };

    return [fav, setFavourite];
}