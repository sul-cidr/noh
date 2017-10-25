import React from 'react';
import { render } from 'react-dom';
import Hello from './components/Hello';

const App = () => <Hello />;

render(<App />, document.getElementById('hello'));
