import { RootObject } from './interfaces';

const FLICKR_KEY = '8808028abf5ea034d0492b2c5d5d9151';
const FLICKR_SECRET = 'a4ae766b4b9fcc8f';

const getPhotosUrl = (api_key: string, countPerPage: number, page: number): string => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent`
                    + `&api_key=${api_key}`
                    + `&per_page=${countPerPage}`
                    + `&page=${page}`
                    + `&format=json`
                    + `&nojsoncallback=1`;
    return url;
}

const getPhotoUrl = (serverId: string, photoId: string, secret: string, size: string): string => {
    const url = `https://live.staticflickr.com/${serverId}/${photoId}_${secret}_${size}.jpg`;
    return url;
}

const getPhotos = (page: number, count: number): Promise<RootObject> => {
    const photosUrl = getPhotosUrl(FLICKR_KEY, count, page);

    const headers = new Headers({ 'Content-Type': 'application/json' });

    const request = new Request(photosUrl, {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    });

    return fetch(photosUrl)
        .then((response) => {
            return response.json() as Promise<RootObject>;
        });
}

export { getPhotos, getPhotoUrl };