const STORAGE_KEY = 'photos';

interface Favourite {
    serverId: string;
    photoId: string;
}

const addFavourite = (serverId: string, photoId: string): void => {
    const value = sessionStorage.getItem(STORAGE_KEY);
    if (value) {
        let favourites = JSON.parse(value) as Favourite[];
        favourites = [...favourites, { serverId, photoId }];

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } else {
        let favourites: Favourite[] = [{ serverId, photoId }];

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    }
}

const removeFavourite = (serverId: string, photoId: string): void => {
    const value = sessionStorage.getItem(STORAGE_KEY);
    if (value) {
        let favourites = JSON.parse(value) as Favourite[];
        const index = favourites.findIndex((f) => f.serverId === serverId && f.photoId === photoId);
        if(index !== -1) {
            favourites.splice(index, 1);

            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
        }
    }
}

const isFavourite = (serverId: string, photoId: string): boolean => {
    const value = sessionStorage.getItem(STORAGE_KEY);
    if (value) {
        let favourites = JSON.parse(value) as Favourite[];
        if (favourites && favourites.length > 0) {
            return favourites.some((f) => f.serverId === serverId && f.photoId === photoId);
        }

        return false;
    }

    return false;
}

export { addFavourite, removeFavourite, isFavourite };