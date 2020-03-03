import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import store from "./store";
import {loadUser} from "./actions/authActions";

import NavBar from "./components/Menu/NavBar";
import Footer from "./components/Menu/Footer";
import Home from "./pages/Home";
import VolcadeMap from "./components/VolcadeMap/VolcadeMap";
import VolcanoList from "./components/Volcanoes/VolcanoList";
import VolcanoDetails from "./pages/VolcanoDetails";
import WaterfallList from "./components/Waterfalls/WaterfallList";
import WaterfallDetails from "./pages/WaterfallDetails";
import Container from "reactstrap/es/Container";

const App = () => {

    const state = {
        user: ''
    };
    useEffect(() => {
        //if (state.user) {
        //store.dispatch(loadUser());
       // }
    }, []);
    
    return (
        <Router history={new Router()}>
            <div className="App">
                <NavBar/>
                <Container style={{marginBottom: '50px'}}>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/online-map" exact component={VolcadeMap}/>
                        <Route path="/volcanoes" exact component={VolcanoList}/>
                        <Route path="/volcanoes/:id" exact component={VolcanoDetails}/>
                        <Route path="/waterfalls" exact component={WaterfallList}/>
                        <Route path="/waterfalls/:id" exact component={WaterfallDetails}/>
                        <Route path="/profile" exact component={Home}/>
                    </Switch>
                </Container>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;
