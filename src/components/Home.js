import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet,StatusBar, ListView, ScrollView, TouchableOpacity, Image} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { podcastFetchNew} from "../actions/PodcastActions";
import { connect } from 'react-redux';
import ListItemUsers from '../components/ListItemUsers';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';


class Home extends Component{
    componentWillMount(){
        this.props.podcastFetchNew();

        this.creataDataSourceNewPodcasts(this.props);


        Variables.state.newPodcasts = [];
        const refNew = firebase.database().ref(`podcasts/`);

        refNew.limitToLast(15).on("value", function (snapshot) {
            Variables.state.newPodcasts = [];
            snapshot.forEach(function (data) {
                if(data.val()){
                    Variables.state.newPodcasts.push(data.val());
                }
            })
        });



        Variables.state.homeFollowedContent = [];
        const {currentUser} = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

        refFol.on("value", function (snapshot) {
            Variables.state.homeFollowedContent = [];
            snapshot.forEach(function (data) {

                firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(1).on("value", function (snap) {
                    snap.forEach(function (pod) {

                        firebase.database().ref(`podcasts/${pod.key}`).on("value", function (data2) {
                            if(data2.val()){
                                Variables.state.homeFollowedContent.push(data2.val())
                            }
                        })
                    });
                });

            })
        });


        Variables.state.selectedByTess = [];
        firebase.database().ref(`users/pgIx9JAiq9aQWcyUZX8AuIdqNmP2/podcasts`).limitToLast(2).on("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).on("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });

        firebase.database().ref(`users/sJsB8XK4XRZ8tNpeGC14JNsa6Jj1/podcasts`).limitToLast(2).on("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).on("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });

        firebase.database().ref(`users/1F1q9gRKWyMQ8cSATXqGT4PnCaK2/podcasts`).limitToLast(2).on("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).on("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        firebase.database().ref(`users/upwadf76CrOBee8aSwzcCZR4kM33/podcasts`).limitToLast(2).on("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).on("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        firebase.database().ref(`users/3tHL3dIcINUdMeKZn6ckf81e2Sk2/podcasts`).limitToLast(2).on("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).on("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
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


    constructor(props) {
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts),
            dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),
            dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess),
        };
        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts), dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},1500)
    }





    renderRowNewPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }



    _selectedByTess(length){
        if (length > 0){
            return(
                <ListView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    enableEmptySections
                    dataSource={this.state.dataSourceSel}
                    renderRow={this.renderRowNewPodcasts}
                />
            )
        }
        else{
            return(
                <Text style = {styles.title3}>We are looking for content to select...</Text>
            )
        }
    }

    _newFromFollow(length){
        if(length > 0){


            return(
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignSelf:'flex-start'}}>
                            <Text style={styles.title}>From People You Follow</Text>
                        </View>

                        <View style={{alignSelf:'flex-end', flex:1}}>
                            <TouchableOpacity onPress={() => {
                                let data = Variables.state.homeFollowedContent;
                                let title = "From People You Follow ";

                                this.props.navigator.push({
                                    screen: 'ViewAll',
                                    animated: true,
                                    animationType: 'fade',
                                    passProps: {data, title},
                                });

                            }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                <Text style={styles.viewAll}>View all</Text>
                                <Icon style={{
                                    fontSize: 14,
                                    backgroundColor: 'transparent',
                                    marginTop: 20,
                                    color: '#5757FF',
                                    marginLeft: 10,
                                    marginRight: 15,
                                }} name="ios-arrow-forward">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={this.state.dataSourceFol}
                        renderRow={this.renderRowNewPodcasts}
                    />

                </View>
            );


        }

    }



    pressFitness = () => {
        this.props.navigator.push({
            screen: 'Fitness',
            animated: true,
            animationType: 'fade',
        });
    };
    pressCurrEvents = () => {
        this.props.navigator.push({
            screen: 'News',
            animated: true,
            animationType: 'fade',
        });
    };
    pressTech = () => {
        this.props.navigator.push({
            screen: 'Tech',
            animated: true,
            animationType: 'fade',
        });
    };
    pressTravel = () => {
        this.props.navigator.push({
            screen: 'Travel',
            animated: true,
            animationType: 'fade',
        });
    };


    pressViewAll(data, title){
        this.props.navigator.push({
            screen: 'ViewAll',
            animated: true,
            animationType: 'fade',
            passProps: {data, title},
        });
    }



    render() {

            return (
                <View
                    style={styles.container}>

                    <StatusBar
                        barStyle="dark-content"
                    />


                    <ScrollView>


                        {this._newFromFollow(Variables.state.homeFollowedContent.length)}




                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>Latest Episodes</Text>
                                </View>

                                <View style={{alignSelf:'flex-end', flex:1}}>
                                    <TouchableOpacity onPress={() => {
                                        let data = Variables.state.newPodcasts;
                                        let title = "Latest Episodes";

                                        this.props.navigator.push({
                                            screen: 'ViewAll',
                                            animated: true,
                                            animationType: 'fade',
                                            passProps: {data, title},
                                        });

                                    }} style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                        <Text style={styles.viewAll}>View all</Text>
                                        <Icon style={{
                                            fontSize: 14,
                                            backgroundColor: 'transparent',
                                            marginTop: 20,
                                            color: '#5757FF',
                                            marginLeft: 10,
                                            marginRight: 15,
                                        }} name="ios-arrow-forward">
                                        </Icon>
                                    </TouchableOpacity>
                                </View>

                            </View>


                            <ListView
                                ref={(ref) => this.listView = ref}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                enableEmptySections
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRowNewPodcasts}
                            />
                        </View>



                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>Selected by Tess</Text>
                                </View>

                                <View style={{alignSelf:'flex-end', flex:1}}>
                                    <TouchableOpacity onPress={() => {
                                        let data = Variables.state.selectedByTess;
                                        let title = "Selected by Tess";

                                        this.props.navigator.push({
                                            screen: 'ViewAll',
                                            animated: true,
                                            animationType: 'fade',
                                            passProps: {data, title},
                                        });

                                    }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                        <Text style={styles.viewAll}>View all</Text>
                                        <Icon style={{
                                            fontSize: 14,
                                            backgroundColor: 'transparent',
                                            marginTop: 20,
                                            color: '#5757FF',
                                            marginLeft: 10,
                                            marginRight: 15,
                                        }} name="ios-arrow-forward">
                                        </Icon>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {this._selectedByTess(Variables.state.selectedByTess.length)}

                        </View>



                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>Featured Categories</Text>
                                </View>

                            </View>

                        </View>


                        <ScrollView style={{height: 122, marginVertical: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>

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
                                </Image>
                            </TouchableOpacity>


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
                                </Image>
                            </TouchableOpacity>


                        </ScrollView>





                        <View style={{paddingBottom: 150}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>From Tess</Text>
                                </View>

                                <View style={{alignSelf:'flex-end', flex:1}}>
                                    <TouchableOpacity style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                        <Text style={styles.viewAll}>View all</Text>
                                        <Icon style={{
                                            fontSize: 14,
                                            backgroundColor: 'transparent',
                                            marginTop: 20,
                                            color: '#5757FF',
                                            marginLeft: 10,
                                            marginRight: 15,
                                        }} name="ios-arrow-forward">
                                        </Icon>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <Text style={styles.title2}>Hey Everyone! Thank you for downloading Tess, your feedback is important. We look forward to hearing from you! Check out our updates on the beta below. </Text>
                        </View>


                    </ScrollView>




                    <PlayerBottom navigator={this.props.navigator}/>

                </View>

            );


}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 20,
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
        color: '#2A2A30',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        marginTop: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },
    title2: {
        color: '#9496A3',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 16,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: 'transparent',
        marginRight: 10
    },

    title3: {
        color: '#2A2A30',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 14,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },

    viewAll: {
        color: '#5757FF',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 12,
        marginTop: 20,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },

    catTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
    }


});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, {podcastFetchNew}) (Home);