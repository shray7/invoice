import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './store/reducer';

import { Provider } from 'react-redux';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { reduxFirestore, getFirestore, firestoreReducer, } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import thunk from 'redux-thunk'

const config = {
    apiKey: "AIzaSyD2bQqZgDcJc3srR8cPCaR2xV6AGZ2U32o",
    authDomain: "invoices-cda29.firebaseapp.com",
    databaseURL: "https://invoices-cda29.firebaseio.com",
    projectId: "invoices-cda29",
    storageBucket: "invoices-cda29.appspot.com",
    messagingSenderId: "667844325499",
    appId: "1:667844325499:web:2ae6f9db381ea120"
};
firebase.initializeApp(config);
//firebase.firestore();

const rootReducer = combineReducers({
    //firebase: firebaseReducer,
    firestore: firestoreReducer,  // <- needed if using firestore
    invoices: reducer,
    //queryPayload: reducerQuery,
})

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reactReduxFirebase(firebase), // firebase instance as first argument
        reduxFirestore(firebase) // <- needed if using firestore 
    )
)
//const store = createStoreWithFirebase(firestore(), rootReducer, initialState)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);
