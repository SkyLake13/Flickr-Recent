import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './components';

function App() {
  return (
    <main>
      <Grid perPageCount={20} />
    </main>
  );
}

export default App;
