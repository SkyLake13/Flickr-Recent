
import { cleanup, render } from '@testing-library/react';
import { default as Picture } from './Picture';
import { getPhotoUrl } from '../../integration/flickr-client';

describe('Picture', () => {
    afterEach(() => cleanup());
    
    it('should render', () => {
        const props = {
            serverId: 'serverId', 
            photoId: 'photoId', 
            secret: 'secret', 
            title: 'title'
        };

        const fixture = render(<Picture serverId={props.serverId}
                        photoId={props.photoId}
                        secret={props.secret}
                        title={props.title} />);
        
        
        const defaultSrc = getPhotoUrl(props.serverId, props.photoId, props.secret, 'z');

        const img = fixture.container.querySelector('img');
        expect(img).toBeDefined();
        expect(img?.src).toEqual(defaultSrc);

        const sources = fixture.container.querySelectorAll('source');
        expect(sources).toBeDefined();
        expect(sources).toHaveLength(3);
    });
});
