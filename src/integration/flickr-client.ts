import { RootObject } from './interfaces';

const photosMetadataUrl = (api_key: string, countPerPage: number, page: number): string => {
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
    console.log(process.env);
    
    const api_key = process.env.REACT_APP_FLICKR_KEY;
    if(!api_key) {
        throw Error('api key not found');
    }
    const photosUrl = photosMetadataUrl(api_key, count, page);

    return fetch(photosUrl)
        .then((response) => response.json() as Promise<RootObject>);
}

export { getPhotos, getPhotoUrl };