import React, {Component} from 'react';
import { StyleSheet} from 'react-native';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';



class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCMCsGc-foyjeiknZt9Nw5Sh8NrC2azZUg',
            authDomain: 'tess-36c94.firebaseapp.com',
            databaseURL: 'https://tess-36c94.firebaseio.com',
            projectId: 'tess-36c94',
            storageBucket: 'tess-36c94.appspot.com',
            messagingSenderId: '1071246914359'

        };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
        <Provider store = {store}>
            <Router />
        </Provider>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default App;