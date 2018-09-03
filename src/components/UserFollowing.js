import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ListView, Text, TouchableOpacity, Image} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchFollowed } from "../actions/PodcastActions"
import Variables from "./Variables";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';

import { Navigation } from 'react-native-navigation';
import ListItemFollowed from "./ListItemFollowed";



class UserFollowing extends Component{

static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'dark',
        statusBarColor: '#fff',
    };

    componentWillMount(){
        Variables.state.userFollowing = [];

        const refFol = firebase.database().ref(`users/${Variables.state.browsingArtist}/following`);

        refFol.orderByChild('following').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                Variables.state.userFollowing.push(data.key);
            })
        });

    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.userFollowing),
            loading: true,
        };

        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userFollowing)})},1000)
    }

    state={
        loading: true
    };


    renderRow = (podcast) => {
        const {navigator} = this.props;
        return <ListItemFollowed podcast={podcast} navigator={navigator}/>;
    };


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
        Navigation.dismissModal({
            animationType: 'slide-down'
        });
    };



    render() {

        return (
            <View
                style={styles.container}>


                <View style={{backgroundColor: '#fff', flexDirection: 'row', paddingVertical:5, paddingBottom: 15, borderWidth: 2,borderBottomColor: 'rgba(187,188,205,0.3)', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#fff'}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 35,color:'#007aff'
                            }} name="ios-arrow-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Following</Text>
                    </View>

                    <View>
                    </View>

                </View>



                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />





                <PlayerBottom navigator={this.props.navigator}/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },
    container2: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginVertical: 0,
        marginHorizontal: 0,
        
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },


    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 3,
    },

    header: {
        marginTop: 25,
        marginLeft: -12,
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        
    },

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchFollowed })(UserFollowing);
