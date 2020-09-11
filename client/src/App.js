import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from 'grommet'

import Home from './components/Home'
import SearchResults from './components/Search/SearchResults'
import Navbar from './components/Navigation/Navbar'
import Footer from './components/Navigation/Footer'
import { fetchFavorites } from './store/auth'


function App() {
    const token = localStorage.getItem("SESSION_TOKEN");
    const id = localStorage.getItem("USER_ID");
    const dispatch = useDispatch();

    useEffect(() => {
        // Pass session details to Redux Store so Session persists
        if (token && id) {
            dispatch(fetchFavorites(token, id))
        }
    })
    return (
        <Box fill style={{ position: "absolute" }} background="url(https://cocktail-hour-user-photos.s3.us-east-2.amazonaws.com/scope1.jpg)">
            <BrowserRouter>
                <Navbar />
                {/* Setting this Box as main Content Container, positioning it underneath the Navbar */}
                <Box style={{ position: "relative", top: 85 }} >
                    <Switch>
                        <Route
                            exact path="/"
                            component={Home} />
                        <Route
                            path="/search_results"
                            component={SearchResults} />
                    </Switch>
                </Box>
            </BrowserRouter>
            <Footer />
        </Box>
    );
}

export default App;
