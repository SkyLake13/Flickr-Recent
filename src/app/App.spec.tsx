import { act } from "react-dom/test-utils";
import { render, RenderResult, cleanup } from '@testing-library/react';

import { App } from './App';

describe('App component ', () => {
  let fixture: RenderResult;

  afterEach(() => {
    cleanup();
  });

  it("Main renders correctly", () => {
    act(() => {
      fixture = render(<App />)
    });

    const xyz = fixture.container.querySelector('.main');
    
    expect(xyz?.textContent).toBe('This is react typescipt app.');
  });
});