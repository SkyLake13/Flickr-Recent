import { useEffect, useState } from 'react';
import { isFavourite, saveFavourite } from '../../integration/favourite';

function useFavourite(serverId: string, photoId: string): [ boolean, () => void ] {
    const [fav, setFav] = useState<boolean>(false);

    useEffect(() => {
        const _fav = isFavourite(serverId, photoId);
        setFav(_fav);
    }, [fav]);

    const toggleFavourite = () => {
        saveFavourite(serverId, photoId, !fav);
        setFav(!fav);
    };

    return [fav, toggleFavourite];
}

export { useFavourite };