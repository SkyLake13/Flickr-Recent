import { getPhotos, getPhotoUrl } from './flickr-client';
import { RootObject } from './interfaces';

const photosMetadata = {
    photos: {
        photo: [
            {
                id: '1',
                owner: 'owner-1',
                secret: 'secret',
                server: 'server-1',
                title: 'title-1'
            },
            {
                id: '2',
                owner: 'owner-2',
                secret: 'secret',
                server: 'server-2',
                title: 'title-2'
            }
        ]
    }
} as RootObject;

describe('Flickr Client', () => {
    it('should get photos metadata', async() => {
        window.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(photosMetadata)
        });

        const response = await getPhotos(1, 5);

        expect(response).toBeDefined();
        expect(response.photos.photo).toHaveLength(2);

        expect(window.fetch).toHaveBeenCalled();
    });

    it('should return photo url', async() => {

        const input = {
            id: '1',
            owner: 'owner-1',
            secret: 'secret',
            server: 'server-1',
            title: 'title-1',
            size: 'w'
        };

        const url = getPhotoUrl(input.server, input.id, input.secret, input.size);

        expect(url).toEqual(`https://live.staticflickr.com/${input.server}/${input.id}_${input.secret}_${input.size}.jpg`);
    });
});
