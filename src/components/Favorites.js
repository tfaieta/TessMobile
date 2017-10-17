import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ScrollView, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchFavs } from "../actions/PodcastActions"
import ListItem from './ListItem';
import firebase from 'firebase';



class Favorites extends Component{

    componentWillMount(){

        const { currentUser } = firebase.auth();
        const ref = firebase.database().ref(`users/${currentUser.uid}/favorites`);
        ref.orderByChild('favorites').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                console.warn("favorites: " + data.key + data.val());
            })
        });

        this.props.podcastFetchFavs('');



        this.creataDataSource(this.props);

    }

    componentWillReceiveProps(nextProps) {

        this.creataDataSource(nextProps);
    }


    creataDataSource({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(podcast);
    }

    renderRow(podcast) {
        return <ListItem podcast={podcast} />;
    }


    render() {
        return (
            <View
                style={styles.container}>
                <ScrollView>

                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />

                </ScrollView>



                <PlayerBottom/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 70,
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchFavs })(Favorites);