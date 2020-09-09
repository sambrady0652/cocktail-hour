import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './components/Home'
import { setUser } from './store/auth'


function App() {
    const token = localStorage.getItem("SESSION_TOKEN");
    const id = localStorage.getItem("USER_ID");
    const dispatch = useDispatch();

    // Pass session details to Redux Store so Session persists
    useEffect(() => {
        if (token && id) {
            dispatch(setUser(token, id))
        }
    })
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/"
                    component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
