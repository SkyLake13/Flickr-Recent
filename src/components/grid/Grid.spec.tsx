import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RootObject } from '../../integration/interfaces';
import { CardProp } from '../card/Card';
import { Grid } from './Grid';

jest.mock('../card/Card', () => {
    return {
        __esModule: true,
        Card: ({ serverId, photoId, secret, title, owner }: CardProp) => {
            return (
                <div className="card">
                    { `${serverId}_${photoId}_${secret}` }
                </div>
            );
        }
    }
});

jest.mock('../../integration/flickr-client', () => {
    return {
        __esModule: true,
        getPhotos: ({ page, perPageCount }: { page: number, perPageCount: number })
                        : Promise<RootObject> => {
                                return Promise.resolve<RootObject>({
                                    photos: {
                                        photo: [
                                            {
                                                id: '1',
                                                owner: 'owner-1',
                                                secret: 'secret',
                                                server: 'server-1',
                                                title: 'title'
                                            }
                                        ]
                                    }
                                });
        }
    }
});

jest.mock('./useIntersectionObserver', () => {
    return {
        __esModule: true,
        useIntersectionObserver: () => true
    }
});

describe('Grid', () => {
    afterEach(() => cleanup());

    it('should render', () => {
        
        render(<Grid perPageCount={1} />);
        
        const loading = screen.findByText('Loading');
        expect(loading).toBeDefined();      
    });
});
