/**
 * Created by nickruspantini on 6/17/17.
 */
import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import StartUp from './components/StartUp';
import LoginForm from './components/LoginForm';
import CreateAccount from './components/CreateAccount';


const RouterComponent = () => {
    return (
        <Router sceneStyle={{paddingTop:65}}>

            <Scene key = "StartUp" component={StartUp} title="Welcome to Tess" initial  />
            <Scene key = "LoginForm" component={LoginForm} title = "Login"  />
            <Scene key = "CreateAccount" component={CreateAccount} title = "Create Account"  />

        </Router>
    )

};


export default RouterComponent;
