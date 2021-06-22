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

    it('should build src url for image', () => {
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

        const image = fixture.container.querySelector('img');

        expect(image).toBeDefined();
        expect(image?.src).toEqual(expected_imageSrcUrl);
    });

    it('should render the favourite button', () => {
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

        const fav_button = fixture.container.querySelector('.favourite-btn');

        expect(fav_button).toBeDefined();
        expect(fav_button?.textContent).toEqual('Favourite');
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

        const fav_button = screen.getByText('Favourite');
        expect(fav_button).toBeDefined();

        fireEvent.click(fav_button);

        const unfav_button = screen.getByText('Unfavourite');
        expect(unfav_button).toBeDefined();
    });
});
