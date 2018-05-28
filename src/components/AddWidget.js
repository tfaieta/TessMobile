import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ListView, TouchableOpacity, Text,Image, ScrollView, Dimensions} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchNew} from "../actions/PodcastActions";
import firebase from 'firebase';
import Variables from "./Variables";
import Icon from 'react-native-vector-icons/Ionicons';
import ListItem from "./ListItem";
import ListItemUsers from "./ListItemUsers";
import Widget from "./Widget";


var {height, width} = Dimensions.get('window');


class AddWidget extends Component{

    componentDidMount(){

        this.props.podcastFetchNew();

        this.creataDataSourceNewPodcasts(this.props);


        Variables.state.newPodcasts = [];
        Variables.state.newPodcastsArtsts = [];
        const refNew = firebase.database().ref(`podcasts/`);

        refNew.limitToLast(250).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val()){
                    if(Variables.state.newPodcastsArtsts.includes(data.val().podcastArtist)){
                        Variables.state.newPodcasts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                        Variables.state.newPodcastsArtsts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                        Variables.state.newPodcasts.push(data.val());
                        Variables.state.newPodcastsArtsts.push(data.val().podcastArtist);
                    }
                    else{
                        Variables.state.newPodcasts.push(data.val());
                        Variables.state.newPodcastsArtsts.push(data.val().podcastArtist)
                    }
                }
            });
            Variables.state.newPodcasts.reverse();
        });



        Variables.state.homeFollowedContent = [];
        const {currentUser} = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

        refFol.on("value", function (snapshot) {
            snapshot.forEach(function (data) {

                firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(1).once("value", function (snap) {
                    snap.forEach(function (pod) {

                        firebase.database().ref(`podcasts/${pod.key}`).once("value", function (data2) {
                            if(data2.val()){
                                Variables.state.homeFollowedContent.push(data2.val());
                                for(let i = Variables.state.homeFollowedContent.length-1; i > 0 && Variables.state.homeFollowedContent[i].id > Variables.state.homeFollowedContent[i-1].id; i--){
                                    let temp = Variables.state.homeFollowedContent[i-1];
                                    Variables.state.homeFollowedContent[i-1] = Variables.state.homeFollowedContent[i];
                                    Variables.state.homeFollowedContent[i] = temp;
                                }
                            }
                        })

                    });

                });

            })
        });





        Variables.state.selectedByTess = [];

        //TheMaddyIce
        firebase.database().ref(`users/upwadf76CrOBee8aSwzcCZR4kM33/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Two Bros and a Pod
        firebase.database().ref(`users/JHPYRdcWtOheHCkrddZjJaLXtPg2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Big Tay
        firebase.database().ref(`users/1F1q9gRKWyMQ8cSATXqGT4PnCaK2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Tim Dulak
        firebase.database().ref(`users/3tHL3dIcINUdMeKZn6ckf81e2Sk2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Joey Bradfield
        firebase.database().ref(`users/gdGuN9v14qU9pSHXSk1KbDGlUsu1/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Dom Gold
        firebase.database().ref(`users/6px5go2E3USvYvkcNQejkLkJx3H3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Eat the fruit
        firebase.database().ref(`users/7ubx6NftyyQbAwufE7BquuSJ6gJ3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Abbey
        firebase.database().ref(`users/P2HAtFE3YKXe8uP9Mu1HyCE2cD83/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //ShakDaddy
        firebase.database().ref(`users/u1osicyhjcR5j3EHx6m1SMe2LpJ3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Nick Ruspantini
        firebase.database().ref(`users/pgIx9JAiq9aQWcyUZX8AuIdqNmP2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Tony
        firebase.database().ref(`users/sJsB8XK4XRZ8tNpeGC14JNsa6Jj1/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });




        Variables.state.fromTess = [];
        firebase.database().ref(`users/dlUCIXXnXGTgJZwYLE1KUYWGkQ73/podcasts`).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.fromTess.push(snapshot.val())
                    }
                })
            })
        });



        Variables.state.currCategory = [];
        const refCat = firebase.database().ref(`podcasts/`);

        refCat.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val().podcastCategory == 'Tech') {
                    Variables.state.currCategory.push(data.val());
                }
            })
        });



        firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed`).on("value", function (snapshot) {
            Variables.state.recentlyPlayed = [];
            snapshot.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.val().id}`).on("value", function (data) {
                    if(data.val()){
                        Variables.state.recentlyPlayed.push(data.val())
                    }

                })
            });
            Variables.state.recentlyPlayed.reverse();
        });


    }


    componentWillReceiveProps(nextProps) {

        this.creataDataSourceNewPodcasts(nextProps);
    }


    creataDataSourceNewPodcasts({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSourceNewPodcasts = ds.cloneWithRows(podcast);
    }




    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
        clearTimeout(this.timeout5);
        clearTimeout(this.timeout6);
        clearTimeout(this.timeout7);
        clearTimeout(this.timeout8);
    }

    constructor(props){
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts),
            dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),
            dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess),
            dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess),
            dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory),
            dataSourceRecent: dataSource.cloneWithRows(Variables.state.recentlyPlayed),
            url: '',
            refreshing: false,
            userProfileImage: '',

            techAdded: false,
            travelAdded: false,
            fitnessAdded: false,
            newsAdded: false,
            recentlyAdded: false
        };
        this.timeout1 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent), recentlyAdded: added,  dataSourceRecent: dataSource.cloneWithRows(Variables.state.recentlyPlayed), dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory)  })},2000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},2000);
        this.timeout3 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},2000);
        this.timeout4 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},2000);

        this.timeout5 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent), dataSourceRecent: dataSource.cloneWithRows(Variables.state.recentlyPlayed), dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory)  })},4000);
        this.timeout6 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},4400);
        this.timeout7 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},4800);
        this.timeout8 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},5200);

        const {currentUser} = firebase.auth();
        let added = false;
        firebase.database().ref(`users/${currentUser.uid}/widgets/Recently Played`).once("value", function (data) {
            if(data.val()){
                added = true;
            }
        });
    }



    renderRowPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }

    renderWidget(length, data, title){
        return <Widget length={length} data={data} title={title} />
    }

    _widget(length, data, title){
        return(
            <Widget data={data} length={length} title={title}/>
        )

    }

    renderAdd(state,title){

        if(!state){
            return(
                <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => {
                    const title = "Tech";

                    const {currentUser} = firebase.auth();
                    firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                        if(data.val()){
                            console.warn("already a widget");
                        }
                        else{
                            firebase.database().ref(`users/${currentUser.uid}/widgets/`).once("value", function (snapshot) {
                                const position = snapshot.numChildren();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title, position});
                            })

                        }
                    });
                    state = true;


                }}>
                    <View style={{alignSelf:'flex-end', flexDirection:'row',}}>
                        <Icon style={{
                            fontSize: 26,
                            backgroundColor: 'transparent',
                            color: '#eaeaea',
                            marginLeft: 10,
                            marginRight: 15,
                        }} name="md-add">
                        </Icon>
                    </View>
                </TouchableOpacity>
            )

        }
        else{
            return(
                <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={(title) => {

                    const {currentUser} = firebase.auth();
                    firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                        if(data.val()){
                            firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).remove();
                        }
                        else{
                            console.warn("already is")
                        }
                    });
                    state = false;


                }}>
                    <View style={{alignSelf:'center', flexDirection:'row',}}>
                        <Icon style={{
                            fontSize: 26,
                            backgroundColor: 'transparent',
                            color: '#d15564',
                            marginLeft: 10,
                            marginRight: 15,
                        }} name="md-remove">
                        </Icon>
                    </View>
                </TouchableOpacity>

            )
        }

    }

    _widgetCat = (title) => {

        return(
            <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-start', paddingVertical: 10}}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                </View>

                <ScrollView style={{height: 122, marginVertical: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>

                    <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressFitness}>
                        <Image
                            style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                            source={require('tess/src/images/fitness.png')}
                        >
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: 30,
                                fontSize: 30,
                                backgroundColor: 'transparent',
                                color: '#FFF'
                            }} name="ios-flash">
                            </Icon>
                            <Text style={styles.catTitle}>Fitness</Text>

                            {this.renderAdd(this.state.fitnessAdded, "Fitness")}

                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, marginRight: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressCurrEvents}>
                        <Image
                            style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                            source={require('tess/src/images/worldNews.png')}
                        >
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: 30,
                                fontSize: 30,
                                backgroundColor: 'transparent',
                                color: '#FFF'
                            }} name="md-globe">
                            </Icon>
                            <Text style={styles.catTitle}>News</Text>

                            {this.renderAdd(this.state.newsAdded, "News")}

                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressTech}>
                        <Image
                            style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                            source={require('tess/src/images/tech.jpeg')}
                        >
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: 30,
                                fontSize: 30,
                                backgroundColor: 'transparent',
                                color: '#FFF'
                            }} name="md-phone-portrait">
                            </Icon>
                            <Text style={styles.catTitle}>Tech</Text>

                            {this.renderAdd(this.state.techAdded, "Tech")}

                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressTravel}>
                        <Image
                            style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                            source={require('tess/src/images/travel.png')}
                        >
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: 30,
                                fontSize: 30,
                                backgroundColor: 'transparent',
                                color: '#FFF'
                            }} name="md-plane">
                            </Icon>
                            <Text style={styles.catTitle}>Travel</Text>

                            {this.renderAdd(this.state.travelAdded, "Travel")}

                        </Image>
                    </TouchableOpacity>


                </ScrollView>

            </View>
        );




    };


    _widgetPlaylists(title){


        return(
            <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-start', paddingVertical: 10}}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.artistTitle}>You do not have any playlists to add.</Text>
                    </View>

                </View>



            </View>
        );

    }


    _widgetRecent = () => {


        if(this.state.recentlyAdded){

            return(
                <View style={{backgroundColor: '#fff', borderRadius: 10, borderColor: '#506dcf', borderWidth: 2, marginHorizontal: 10, marginVertical: 5}}>
                    <View style={{flexDirection:'row',}}>
                        <View style={{flex: 1, alignSelf:'flex-start', paddingVertical: 10}}>
                                <Text style={styles.title}>Recently Played</Text>
                            <Text style={styles.artistTitle}>View your play history.</Text>
                        </View>

                            <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {

                                let title = 'Recently Played';

                                const {currentUser} = firebase.auth();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                                    if(data.val()){
                                        let currentPosition = data.val().position;
                                        firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).remove();
                                        firebase.database().ref(`users/${currentUser.uid}/widgets`).once("value", function (snapshot) {
                                            snapshot.forEach(function (data) {
                                                if(data.val().position >= currentPosition){
                                                    let title = data.val().title;
                                                    let position = data.val().position - 1;
                                                    firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title, position});
                                                }

                                            })

                                        })

                                    }
                                    else{
                                        console.warn("already is")
                                    }
                                });
                                this.setState({recentlyAdded: false})


                            }}>
                                <View style={{alignSelf:'center', flexDirection:'row',}}>
                                    <Icon style={{
                                        fontSize: 26,
                                        backgroundColor: 'transparent',
                                        color: '#506dcf',
                                        marginLeft: 10,
                                        marginRight: 15,
                                    }} name="md-add">
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                    </View>

                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={this.state.dataSourceRecent}
                        renderRow={this.renderRowPodcasts}
                    />
                </View>
            );

        }
        else{

            return(
                <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                    <View style={{flexDirection:'row' ,}}>
                        <View style={{flex: 1, alignSelf:'flex-start', paddingVertical: 10}}>
                                <Text style={styles.title}>Recently Played</Text>
                            <Text style={styles.artistTitle}>View your play history.</Text>
                        </View>

                            <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {
                                const title = "Recently Played";

                                const {currentUser} = firebase.auth();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                                    if(data.val()){
                                        console.warn("already a widget");
                                    }
                                    else{
                                        firebase.database().ref(`users/${currentUser.uid}/widgets/`).once("value", function (snapshot) {
                                            const position = snapshot.numChildren();
                                            firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title, position});
                                        })

                                    }
                                });
                                this.setState({recentlyAdded: true})


                            }}>
                                <View style={{alignSelf:'center', flexDirection:'row',}}>
                                    <Icon style={{
                                        fontSize: 26,
                                        backgroundColor: 'transparent',
                                        color: '#828393',
                                        marginLeft: 10,
                                        marginRight: 15,
                                    }} name="md-add">
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                    </View>

                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={this.state.dataSourceRecent}
                        renderRow={this.renderRowPodcasts}
                    />
                </View>
            );

        }


    };



    render() {
        return (
            <View
                style={styles.containerMain}>

                <ScrollView>

                    {this._widgetRecent()}

                    {this._widget(Variables.state.homeFollowedContent.length, this.state.dataSourceFol, "Catch Up")}

                    {this._widget(Variables.state.homeFollowedContent.length, this.state.dataSourceFol, "New From Following")}

                    {this._widget(Variables.state.newPodcasts.length, this.state.dataSource, "Latest")}

                    {this._widget(Variables.state.selectedByTess.length, this.state.dataSourceSel, "Selected By Tess")}

                    {this._widget(Variables.state.fromTess.length, this.state.dataSourceTess, "From Tess")}

                </ScrollView>

                <PlayerBottom navigator={this.props.navigator}/>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },

    viewAll: {
        color: '#506dcf',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        marginTop: 20,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },

    catTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
    },

    titleCatchUp: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#828393',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        backgroundColor: 'transparent',
        marginHorizontal: 20
    },

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchNew })(AddWidget);