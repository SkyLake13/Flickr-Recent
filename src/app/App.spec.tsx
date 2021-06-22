import { render, RenderResult, cleanup } from '@testing-library/react';

import { App } from './App';

jest.mock('./components', () => {
  return {
    __esModule: true,
    Grid: ({ perPageCount }: { perPageCount: number }) => {
      return (
        <>
          {perPageCount}
        </>
      );
    }
  }
});

describe('App component ', () => {
  let fixture: RenderResult;

  afterEach(() => cleanup());

  it("should render child component", () => {
    fixture = render(<App />);

    const main = fixture.container.querySelector('main');

    expect(main).toBeDefined();
    expect(Number(main?.textContent)).toEqual(20);
  });
});