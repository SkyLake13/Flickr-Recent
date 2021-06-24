import { render, RenderResult, cleanup  } from '@testing-library/react';
import { useState } from 'react';

import { Card, CardProp } from './Card';

jest.mock('../../integration/favourite', () => {
    let store: {serverId: string, photoId: string}[] = [];
    return {
        __esModule: true,
        isFavourite: (serverId: string, photoId: string): boolean => {
            return store.some((el) => el.serverId === serverId && el.photoId === photoId);
        },
        saveFavourite: (serverId: string, photoId: string, fav: boolean): void => {
            if (fav) {
                store = [...store, { serverId, photoId }];
            } else {
                const index = store.findIndex((el) => el.serverId === serverId && el.photoId === photoId)
                store.splice(index, 1);
            }
        }
    }
})

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
            title: 'title',
            owner: 'owner'
        }

        fixture = render(<Card serverId={props.serverId} 
            photoId={props.photoId} 
            secret={props.secret}
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
    });

    it('should make a card favourite', () => {
        const props: CardProp = {
            serverId: 'serverId', 
            photoId: 'photoId', 
            secret: 'secret', 
            title: 'title',
            owner: 'owner'
        }

        fixture = render(<Card serverId={props.serverId} 
            photoId={props.photoId} 
            secret={props.secret} 
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
            serverId: 'serverId-1', 
            photoId: 'photoId-1', 
            secret: 'secret',
            title: 'title',
            owner: 'owner'
        }

        fixture = render(<Card serverId={props.serverId} 
            photoId={props.photoId} 
            secret={props.secret} 
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
