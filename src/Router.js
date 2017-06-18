/**
 * Created by nickruspantini on 6/17/17.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import StartUp from './components/StartUp';
import LoginForm from './components/LoginForm';
import CreateAccount from './components/CreateAccount';


const RouterComponent = () => {
    return (
        <Router headerStyle={styles.header} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>

            <Scene key = "StartUp" component={StartUp} title="Welcome to Tess" hideNavBar={true} initial  />
            <Scene key = "LoginForm" component={LoginForm} title = "Login" hideNavBar={false} />
            <Scene key = "CreateAccount" component={CreateAccount} title = "Create Account" hideNavBar={false}  />

        </Router>
    )

};

const styles = StyleSheet.create({
    header: {
      color: 'red'
    },
    navBar: {
        backgroundColor:'transparent'
    },
    navBarTitle:{
        color:'transparent',
        opacity: 0.2
    },
    barButtonTextStyle:{
        color:'transparent',
        opacity: 0.2
    },
    barButtonIconStyle:{
        tintColor:'rgb(255,255,255)'
    },

}
);



export default RouterComponent;
