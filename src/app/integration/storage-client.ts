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

export { getFavourites, saveFavourites };