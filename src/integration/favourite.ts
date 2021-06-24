const STORAGE_KEY = 'photos';
interface Favourite {
    serverId: string;
    photoId: string;
}

const getFavourites = (): Favourite[] | null => {
    const value = sessionStorage.getItem(STORAGE_KEY);
    if (value) {
        return JSON.parse(value) as Favourite[];
    }

    return null;
}

const saveFavourites = (favourites: Favourite[]): void => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
}

const addFavourite = (serverId: string, photoId: string): void => {
    let favourites = getFavourites();
    if (favourites) {
        favourites = [...favourites, { serverId, photoId }];
        saveFavourites(favourites);
    } else {
        let favourites = [{ serverId, photoId }];

        saveFavourites(favourites);
    }
}

const removeFavourite = (serverId: string, photoId: string): void => {
    let favourites = getFavourites();
    if (favourites) {
        const index = favourites.findIndex((f) => f.serverId === serverId && f.photoId === photoId);
        if(index !== -1) {
            favourites.splice(index, 1);
            saveFavourites(favourites);
        }
    }
}

const isFavourite = (serverId: string, photoId: string): boolean => {
    let favourites = getFavourites();
    if (favourites) {
        if (favourites && favourites.length > 0) {
            return favourites.some((f) => f.serverId === serverId && f.photoId === photoId);
        }

        return false;
    }

    return false;
}

const saveFavourite = (serverId: string, photoId: string, fav: boolean): void => {
    fav ? addFavourite(serverId, photoId) : removeFavourite(serverId, photoId);
}

export { isFavourite, saveFavourite };