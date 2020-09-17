import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from 'grommet'

import Home from './components/Home'
import MyDrinks from './components/Favorite/MyDrinks'
import Footer from './components/Navigation/Footer'
import Navbar from './components/Navigation/Navbar'
import SearchResults from './components/Search/SearchResults'
import SearchPage from './components/Search/SearchPage'
import { setUser } from './store/auth'
import CreateDrinks from './components/Create/CreateDrinks';


function App() {
    const token = localStorage.getItem("SESSION_TOKEN");
    const id = localStorage.getItem("USER_ID");
    const dispatch = useDispatch();

    useEffect(() => {
        // Pass session details to Redux Store so Session persists
        if (token && id) {
            dispatch(setUser(token, id))
        }
    })
    return (
        <BrowserRouter>
            <Box
                fill
                style={{ position: "fixed" }}
                background="url(https://cocktail-hour-user-photos.s3.us-east-2.amazonaws.com/scope1.jpg)">
                <Navbar />
                <Switch >
                    <Route
                        exact path="/"
                        component={Home} />
                    <Route
                        path="/create_drink"
                        component={CreateDrinks} />
                    <Route
                        path="/search"
                        component={SearchPage} />
                    <Route
                        path="/search_results"
                        component={SearchResults} />
                    <Route
                        path="/my_drinks"
                        component={MyDrinks} />
                </Switch>
                <Footer />
            </Box>
        </BrowserRouter>
    );
}

export default App;
