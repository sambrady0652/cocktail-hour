import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home'
import Navbar from './components/Navigation/Navbar'


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/"
                    component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
