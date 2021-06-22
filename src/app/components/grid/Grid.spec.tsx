import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RootObject } from '../../integration/interfaces';
import { CardProp } from '../card/Card';
import { Grid } from './Grid';

jest.mock('../card/Card', () => {
    return {
        __esModule: true,
        Card: ({ serverId, photoId, secret, size, title, owner }: CardProp) => {
            return (
                <div className="card">
                    { `${serverId}_${photoId}_${secret}_${size}` }
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

jest.mock('./scroll-event-listener', () => {
    return {
        __esModule: true,

        debouncedListener: (atBottom: () => void) => {
            atBottom();
        }
    }
});

xdescribe('Grid', () => {
    afterEach(() => cleanup());

    it('should render', () => {
        act(() => {
            render(<Grid perPageCount={1} />);
        });
        

        screen.debug();        
    });
});
