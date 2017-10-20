import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet,StatusBar, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Variables from './Variables';
import firebase from 'firebase';
import { podcastFetchNew} from "../actions/PodcastActions";
import { connect } from 'react-redux';
import ListItemUsers from '../components/ListItemUsers';
import Swiper from 'react-native-swiper';



class Home extends Component{
    componentWillMount(){
        const {currentUser} = firebase.auth();

        firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.bio = snap.val().bio;

            }
            else {
                Variables.state.bio = "Tell others about yourself"
            }
        });
        firebase.database().ref(`/users/${currentUser.uid}/favCategory`).orderByChild("favCategory").on("value", function(snap) {
            if(snap.val()){
                Variables.state.favCategory = snap.val().favCategory;

            }
            else {
                Variables.state.favCategory = "Too hard to choose"
            }
        });
        firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.username = snap.val().username;

            }
            else {
                Variables.state.username = "None"
            }
        });


        this.props.podcastFetchNew();


        this.creataDataSourceNewPodcasts(this.props);

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


    constructor(props) {
        super(props);
    }





    renderRowNewPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }



    render() {
    return (
        <View
            style={styles.container}>

            <StatusBar
                barStyle="light-content"
            />

            <Swiper showsButtons buttonWrapperStyle = {{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: -320, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'}}>



                    <View style={{flex:1}}>
                    <Text style={styles.title}>New</Text>


                    <ListView
                        enableEmptySections
                        dataSource={this.dataSourceNewPodcasts}
                        renderRow={this.renderRowNewPodcasts}
                    />
                    </View>


                <View>
                    <Text style={styles.title}>From Tess</Text>
                    <Text style={styles.title2}>Hey Everyone! Thank you for downloading Tess, your feedback is important. We look forward to hearing from you! Check out our updates on the beta below. </Text>
                </View>



                <View>
                    <Text style={styles.title}>Selected by Tess</Text>
                </View>











            </Swiper>





                <PlayerBottom/>





        </View>



    );
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 80,
    },
    homeContainer:{
        flex:1,
        marginTop: -15,

    },
    barContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 10
    },

    title: {
        color: '#804cc8',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 30,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },
    title2: {
        color: '#804cc8',
        textAlign: 'center',
        fontSize: 18
    },


});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, {podcastFetchNew}) (Home);