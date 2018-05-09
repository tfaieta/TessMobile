import React, { Component  } from 'react';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import {AudioUtils} from 'react-native-audio';
import {
    PODCAST_UPDATE,
    PODCAST_CREATE,
    PODCAST_FETCH_SUCCESS, PODCAST_FETCH_SUCCESS_NEW
} from './types';
import Variables from "../components/Variables";

let podFile = AudioUtils.DocumentDirectoryPath + '/test.aac';


export const podcastUpdate = ({prop, value}) => {
    return {
        type: PODCAST_UPDATE,
        payload: {prop, value}
    };
};

export const podcastCreate = ({ podcastTitle, podcastDescription, podcastCategory, podcastArtist, podcastLength, navigator }) => {
    const {currentUser} = firebase.auth();
    const {user} = currentUser.uid;
    this.state = {
        loading: false,
        dp: null
    };

    return (dispatch) => {

        let likes = 0;
        let ref = '';
        let id = '';

            firebase.database().ref(`/podcasts`)
            .push({podcastTitle, podcastDescription, podcastCategory, podcastArtist, podcastLength, likes})
            .then((snap) => {

                dispatch({type: PODCAST_CREATE});
                ref = snap.ref;
                id = snap.key;


                ref.update({id});
                firebase.database().ref(`/users/${currentUser.uid}`).child('podcasts').child(id).update({id});


            const Blob = RNFetchBlob.polyfill.Blob;
            const fs = RNFetchBlob.fs;
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
            window.Blob = Blob;
            const uid = firebase.auth().uid;
            const podcastPath = podFile;
            let uploadBlob = null;
            const podcastRef = firebase.storage().ref(`/users/${currentUser.uid}/${snap.key}`);
            let mime = 'audio/aac';

            fs.readFile(podcastPath, 'base64')
                .then((data) => {
                    return Blob.build(data, {type: `${mime};BASE64`})
                })
                .then((blob) => {
                    uploadBlob = blob;
                    var upload = podcastRef.put(blob, {contentType: mime});

                    upload.on('state_changed', function (snapshot) {

                        Variables.state.uploadProgress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function(error) {
                        // Handle unsuccessful uploads
                        console.log(error)
                    }, function() {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

                        console.log("success");
                        uploadBlob.close();

                        Variables.state.uploadProgress = 0;

                        navigator.push({
                            screen: 'RecordSuccess',
                            animated: true,
                            animationType: 'fade',
                            tabBarHidden: false,
                            navigatorStyle: {
                                tabBarHidden: false,
                            },
                        });

                    });

                    })


                })



    }
};



export const podcastFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/podcast`)
            .on('value', snapshot => {
                dispatch({ type: PODCAST_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};


export const podcastFetchNew = () => {

    return (dispatch) => {
        firebase.database().ref('/podcasts').limitToLast(100)
            .on('value', snapshot => {
                dispatch({ type: PODCAST_FETCH_SUCCESS_NEW, payload: snapshot.val() });
            });
    };
};



export const podcastFetchUser = (podcastArtist) => {

    return (dispatch) => {
        firebase.database().ref(`/users/${podcastArtist}/podcast`)
            .on('value', snapshot => {
                dispatch({ type: PODCAST_FETCH_SUCCESS_NEW, payload: snapshot.val() });
            });
    };
};


export const podcastFetchFollowed = (podcastArtist) => {

    return (dispatch) => {
        firebase.database().ref(`/users/${podcastArtist}/podcast`)
            .on('value', snapshot => {
                dispatch({ type: PODCAST_FETCH_SUCCESS_NEW, payload: snapshot.val() });
            });
    };
};


export const podcastFetchFavs = (podcastArtist) => {

    return (dispatch) => {
        firebase.database().ref(`/users/${podcastArtist}/podcast`)
            .on('value', snapshot => {
                dispatch({ type: PODCAST_FETCH_SUCCESS_NEW, payload: snapshot.val() });
            });
    };
};