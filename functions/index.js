const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');
const firebase = require('firebase');


admin.initializeApp(functions.config().firebase);

exports.sendNewMessageNotificationPOTW = functions.database.ref(`/podcastOfTheWeek`)
    .onUpdate(event => {

        const getValuePromise = admin.database().ref(`podcastOfTheWeek`).once('value');

        return getValuePromise.then(snapshot => {
            console.log(snapshot.val());
            const podOfTheWeek = snapshot.val();

            const payload = {
                notification: {
                    title: "New Podcast of the Week!",
                    body: podOfTheWeek,
                    target: "Browse"
                }
            };

            return admin.messaging()
                .sendToTopic('notifications', payload);

        })
    });



exports.sendNewMessageNotificationNewEp = functions.database.ref(`/podcasts`)
    .onCreate(event => {

        const getValuePromise = admin.database().ref(`podcast/${event.key}`).once('value');

        return getValuePromise.then(snapshot => {
            console.log(snapshot.val());
            const podcastTitle = snapshot.val().podcastTitle;
            const podcastDescription = snapshot.val().podcastDescription;
            const podcastCategory = snapshot.val().podcastCategory;
            const id = event.key;
            const podcastArtist = snapshot.val().podcastArtist;
            const podcastURL = snapshot.val().podcastURL;
            const RSSID = snapshot.val().RSSID;
            const rss = snapshot.val().rss;

            const payload = {
                notification: {
                    title: "New Episode from " + podcastArtist,
                    body: podcastTitle,
                    target: "Player"
                },
                podcast: {
                    podcastTitle: podcastTitle,
                    podcastArtist: podcastArtist,
                    podcastCategory: podcastCategory,
                    podcastDescription: podcastDescription,
                    podcastURL: podcastURL,
                    id: id,
                    RSSID: RSSID,
                    rss: rss
                }
            };

            return admin.messaging()
                .sendToTopic('notifications', payload);

        })
    });