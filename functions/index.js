const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');
const firebase = require('firebase');
var DomParser = require('react-native-html-parser').DOMParser;


admin.initializeApp(functions.config().firebase);
firebase.initializeApp(functions.config().firebase);



exports.notificationPOTW = functions.database.ref(`/podcastOfTheWeek`)
    .onUpdate(event => {

        const getValuePromise = admin.database().ref(`podcastOfTheWeek`).once('value');

        return getValuePromise.then(snapshot => {
            console.log(snapshot.val());
            const podOfTheWeek = snapshot.val();

            const payload = {
                notification: {
                    title: "New Podcast of the Week!",
                    body: podOfTheWeek,
                    target: podOfTheWeek
                }
            };

            const topic = 'POTW';
            return admin.messaging()
                .sendToTopic(topic, payload);

        })
    });



exports.notificationNewEp = functions.database.ref(`/podcasts/{podcastKey}`)
    .onWrite((event) => {

        const episode = event.after.val();

            const podcastTitle = episode.podcastTitle;
            const podcastDescription = episode.podcastDescription;
            const podcastCategory = episode.podcastCategory;
            const id = event.key;
            const podcastArtist = episode.podcastArtist;
            const podcastURL = episode.podcastURL;
            const RSSID = episode.RSSID;
            const rss = episode.rss;

            const payload = {
                notification: {
                    title: "New Episode from " + podcastArtist,
                    body: podcastTitle,
                    target: podcastArtist,
                    id: id,
                    podcastTitle: podcastTitle,
                    podcastArtist: podcastArtist,
                    podcastCategory: podcastCategory,
                    podcastDescription: podcastDescription,
                    podcastURL: podcastURL,
                    RSSID: RSSID,
                    rss: rss
                },
            };

            const topic = `/topics/${podcastArtist}`;

            return admin.messaging()
                .sendToTopic(topic, payload);

    });




exports.notificationFollow = functions.database.ref(`/users/{id}/followers`)
    .onCreate(event => {

        return admin.database.ref(`users/${event.key}/token`).once('value', function (snapshot) {

            const token = snapshot.val();
            const podcastArtist = event.val();

            const payload = {
                notification: {
                    title: "New Follow!",
                    body: podcastArtist + " is now following you",
                    target: podcastArtist,
                    id: podcastArtist,
                },
            };

            return admin.messaging()
                .sendToDevice(token, payload)


        });
    });




exports.feedFetcher = functions.database.ref(`/feedFetcher`)
    .onUpdate(event => {

        console.log(event);


        console.log("Initializing");


        // loop for every rss feed in database
        let podcasts = [];

        return new Promise((resolve, reject) => {
        admin.database().ref('feeds').once("value", function (snapshot) {
            console.log("Starting");


            snapshot.forEach(function (snap) {
                console.log(snap.val());

                void fetch(snap.val())
                    .then((response) => response.text())
                    .then((responseData) => {
                    console.log("reading feed... " + snap.val());

                        var doc = new DomParser().parseFromString(responseData,'text/html');
                        var items = doc.getElementsByTagName('item');
                        var channel = doc.getElementsByTagName("title");


                        // profile bio
                        var userBio = "";
                        let bio = "";
                        if(doc.getElementsByTagName("description").length > 0){
                            userBio = doc.getElementsByTagName("description");
                            bio = userBio[0].textContent;
                            bio = bio.replace("<p>", " ");
                            bio = bio.replace("</p>", " ");
                            bio = bio.replace("<a", " ");
                            bio = bio.replace("</a>", " ");
                            bio = bio.replace("href=", " ");
                            bio = bio.replace("rel=", " ");
                            bio = bio.replace("target=", " ");
                            bio = bio.replace("<em/>", " ");
                            bio = bio.replace("<em>", " ");
                            bio = bio.replace("&nbsp", " ");
                        }
                        console.log("bio: " + bio);


                        // profile image
                        let profileImage = '';
                        if(doc.getElementsByTagName("image").length > 0){
                            const image = doc.getElementsByTagName("image");
                            const pI = image[0].getElementsByTagName('url');
                            profileImage = pI[0].textContent;
                        }
                        console.log("profile image: " + profileImage);


                        // profile username
                        let username = channel[0].textContent;
                        let usernameData = channel[0].textContent;
                        usernameData = usernameData.replace("#", " ");
                        usernameData = usernameData.replace("$", " ");
                        usernameData = usernameData.replace("[", " ");
                        usernameData = usernameData.replace("]", " ");
                        usernameData = usernameData.replace(".", "");
                        usernameData = usernameData.replace("http://", "");


                        // category
                        let category = '';
                        if(doc.getElementsByTagName('itunes:category').length > 0){
                            category = doc.getElementsByTagName('itunes:category')[0].getAttribute('text');
                        }
                        const podcastCategory = category;
                        console.log("category: " + podcastCategory);



                        // create account for user if it doesn't exist
                        // reserve username & create user if needed
                        console.log("checking if account exists");
                        admin.database().ref(`users`).child(usernameData).once("value", function (snapshot) {
                            if(snapshot.val()){
                                console.log("Account Exists: " + usernameData)
                            }
                            else{
                                firebase.database().ref(`users`).child(usernameData).child("/username").update({username});
                                firebase.database().ref(`users`).child(usernameData).child("/bio").update({bio});
                                firebase.database().ref(`users`).child(usernameData).child("/profileImage").update({profileImage});
                                firebase.database().ref(`usernames`).child(usernameData.toLowerCase()).update({username: usernameData.toLowerCase()});
                                console.log("Account Added: " + usernameData)
                            }
                        });




                        let episodes = [];
                        // get info for each episode
                        // items.length gets max size of rss feed, 0 is most recent
                        let size = 0;
                        if(items.length >= 4){
                            size = 4;
                        }
                        else{
                            size = items.length-1
                        }
                        console.log("checking " + size +  " episodes from " + snap.val()+ "...");
                        for (var i=0; i >= 0; i--) {

                            //artist
                            let podcastArtist = usernameData;

                            //title
                            const title = items[i].getElementsByTagName('title');
                            let podcastTitle = title[0].textContent;
                            console.log("episode title: " + podcastTitle);

                            //description
                            const description = items[i].getElementsByTagName('description');
                            console.log("episode description" + description[0].textContent);
                            let podcastDescription = description[0].textContent;
                            podcastDescription = podcastDescription.replace("<p>", " ");
                            podcastDescription = podcastDescription.replace("</p>", " ");
                            podcastDescription = podcastDescription.replace("<a", " ");
                            podcastDescription = podcastDescription.replace("&amp", " ");
                            podcastDescription = podcastDescription.replace("href=", " ");
                            podcastDescription = podcastDescription.replace("<em>", " ");
                            podcastDescription = podcastDescription.replace("</em>", " ");
                            podcastDescription = podcastDescription.replace("</a>", " ");
                            podcastDescription = podcastDescription.replace("<h2", " ");
                            podcastDescription = podcastDescription.replace("id=", " ");
                            podcastDescription = podcastDescription.replace("</h2>", " ");
                            podcastDescription = podcastDescription.replace("</p>", " ");
                            podcastDescription = podcastDescription.replace("<br>", " ");
                            podcastDescription = podcastDescription.replace("<div>", " ");
                            podcastDescription = podcastDescription.replace("</div>", " ");
                            podcastDescription = podcastDescription.replace("<ul>", " ");
                            podcastDescription = podcastDescription.replace("<li>", " ");
                            podcastDescription = podcastDescription.replace("</li>", " ");
                            podcastDescription = podcastDescription.replace("<strong>", " ");
                            podcastDescription = podcastDescription.replace("</strong>", " ");
                            podcastDescription = podcastDescription.replace("<sup>", " ");
                            podcastDescription = podcastDescription.replace("</sup>", " ");
                            podcastDescription = podcastDescription.replace("<br><br>", " ");
                            podcastDescription = podcastDescription.replace("<br>", " ");


                            //length
                            let length = '';
                            if(items[i].getElementsByTagName('itunes:duration').length > 0){
                                length = "itunes duration:" + items[i].getElementsByTagName('itunes:duration');
                                length = length.replace("itunes duration:", "");
                                length = length.replace("<itunes:duration>", "");
                                length = length.replace("</itunes:duration>", "");
                            }
                            const podcastLength = length;
                            console.log("episode length: " + podcastLength);


                            //rss = true, need to tell firebase it's an rss podcast
                            const rss = true;


                            //likes = 0
                            const likes = 0;

                            //joint title (for database)
                            let jointTitle = podcastArtist + podcastTitle;
                            if(jointTitle.length > 60 ){
                                jointTitle = (jointTitle.slice(0,60))
                            }
                            jointTitle = jointTitle.replace("#", "_");
                            jointTitle = jointTitle.replace("$", "_");
                            jointTitle = jointTitle.replace("[", "_");
                            jointTitle = jointTitle.replace("]", "_");
                            jointTitle = jointTitle.replace(".", "_");
                            const RSSID = jointTitle;
                            console.log("RSSID: " + RSSID);


                            console.log("starting episode upload");
                            // get url -> upload
                            if(items[i].getElementsByTagName('enclosure').length > 0){
                                var link = items[i].getElementsByTagName('enclosure')[0].getAttribute('url');
                                console.log("link: " + link);
                                const podcastURL = link;


                                // upload to database if doesn't exist (follow podcastCreate)
                                return admin.database().ref(`podcasts`).orderByChild("RSSID").equalTo(jointTitle.toString()).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.log("episode EXISTS: " + RSSID)
                                    }
                                    else{
                                        let item = firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID, podcastLength, time: firebase.database.ServerValue.TIMESTAMP});
                                        const ref = item.ref;
                                        const id = item.key;
                                        ref.update({id});
                                        firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});
                                        console.log("episode ADDED: " + RSSID);

                                    }

                                });



                            }
                            // another way of getting url -> upload
                            else if(items[i].getElementsByTagName('link').length > 0){
                                var link2 = items[i].getElementsByTagName('link');
                                console.log("link: " + link2[0].textContent);
                                const podcastURL = link2[0].textContent;


                                // upload to database if doesn't exist (follow podcastCreate)
                                return admin.database().ref(`podcasts`).orderByChild("RSSID").equalTo(jointTitle.toString()).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.log("episode EXISTS: " + RSSID)
                                    }
                                    else{
                                        let item = firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID, podcastLength, time: firebase.database.ServerValue.TIMESTAMP});
                                        const ref = item.ref;
                                        const id = item.key;
                                        ref.update({id});
                                        firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});
                                        console.log("episode ADDED: " + RSSID);

                                    }

                                });



                            }
                            else{
                                console.log("Error: no download url, Can't upload episode");
                                episodes.push('');
                            }
                        }
                        return(episodes);

                    });


            });

         });

        });


    });