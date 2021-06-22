import { render, RenderResult, cleanup, fireEvent, screen  } from '@testing-library/react';
import { useState } from 'react';
import { getPhotoUrl } from '../../integration/flickr-client';

import { Card, CardProp } from './Card';

jest.mock('./useFavourite', () => {
    return {
        __esModule: true,
        useFavourite: () => {
            const [fav, setFav] = useState<boolean>(false);

            const toggleFavourite = () => {
                setFav(!fav);
            };

            return [fav, toggleFavourite];
        }
    }
});

describe('Card', () => {
    let fixture: RenderResult;

    afterEach(() => {
        cleanup();
    });

    it('should render properly', () => {
        const props: CardProp = {
            serverId: 'serverId', 
            photoId: 'photoId', 
            secret: 'secret', 
            size: 'size',
            title: 'title',
            owner: 'owner'
        }

        const expected_imageSrcUrl = getPhotoUrl(props.serverId, 
            props.photoId, props.secret, props.size);

        fixture = render(<Card serverId={props.serverId} 
            photoId={props.photoId} 
            secret={props.secret} 
            size={props.size} 
            title={props.title}
            owner={props.owner} />);


        const title = fixture.container.querySelector('.title');
        expect(title).toBeDefined();
        expect(title?.textContent).toEqual(props.title);

        const owner = fixture.container.querySelector('.owner');
        expect(owner).toBeDefined();
        expect(owner?.textContent).toEqual(props.owner);

        const fav_button = fixture.container.querySelector('.favourite-btn');
        expect(fav_button).toBeDefined();
        expect(fav_button?.textContent).toEqual('Favourite');

        const image = fixture.container.querySelector('img');
        expect(image).toBeDefined();
        expect(image?.src).toEqual(expected_imageSrcUrl);
        expect(image?.alt).toEqual(props.title);        
    });

    it('should make a card favourite', () => {
        const props: CardProp = {
            serverId: 'serverId', 
            photoId: 'photoId', 
            secret: 'secret', 
            size: 'size',
            title: 'title',
            owner: 'owner'
        }

        fixture = render(<Card serverId={props.serverId} 
            photoId={props.photoId} 
            secret={props.secret} 
            size={props.size} 
            title={props.title}
            owner={props.owner} />);
          
        
        const fav_button: HTMLButtonElement | null = fixture.container.querySelector('.favourite-btn');
        expect(fav_button).toBeDefined();
        expect(fav_button?.textContent).toEqual('Favourite');

        fav_button?.click()

        const unfav_button: HTMLButtonElement | null = fixture.container.querySelector('.favourite-btn');
        expect(unfav_button).toBeDefined();
        expect(unfav_button?.textContent).toEqual('Unfavourite');
    });

    it('should make a card unfavourite', () => {
        const props: CardProp = {
            serverId: 'serverId', 
            photoId: 'photoId', 
            secret: 'secret', 
            size: 'size',
            title: 'title',
            owner: 'owner'
        }

        fixture = render(<Card serverId={props.serverId} 
            photoId={props.photoId} 
            secret={props.secret} 
            size={props.size} 
            title={props.title}
            owner={props.owner} />);

        const fav_button: HTMLButtonElement | null = fixture.container.querySelector('.favourite-btn');
        expect(fav_button).toBeDefined();
        expect(fav_button?.textContent).toEqual('Favourite');

        fav_button?.click()

        const unfav_button: HTMLButtonElement | null = fixture.container.querySelector('.favourite-btn');
        expect(unfav_button).toBeDefined();
        expect(unfav_button?.textContent).toEqual('Unfavourite');

        unfav_button?.click()

        const updated_fav_button: HTMLButtonElement | null = fixture.container.querySelector('.favourite-btn');
        expect(updated_fav_button).toBeDefined();
        expect(updated_fav_button?.textContent).toEqual('Favourite');
    });
});
