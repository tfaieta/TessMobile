import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet,StatusBar, ListView, ScrollView, TouchableOpacity, Image} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { podcastFetchNew} from "../actions/PodcastActions";
import { connect } from 'react-redux';
import ListItemUsers from '../components/ListItemUsers';
import Icon from 'react-native-vector-icons/Ionicons';


class Home extends Component{
    componentWillMount(){
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
    pressSeeAllNew = () => {

    };



    render() {
    return (
        <View
            style={styles.container}>

            <StatusBar
                barStyle="dark-content"
            />


                    <ScrollView>


                    <View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{alignSelf:'flex-start'}}>
                            <Text style={styles.title}>New Releases</Text>
                            </View>
                            <View style={{alignSelf:'flex-end'}}>
                                <TouchableOpacity onPress={this.pressSeeAllNew} style={{marginLeft: 80, marginTop:3}}>
                                    <Text style={styles.viewAll}>View all</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={this.dataSourceNewPodcasts}
                        renderRow={this.renderRowNewPodcasts}
                    />
                    </View>



                    <ScrollView style={{height: 122, marginVertical: 20}} horizontal={true} showsHorizontalScrollIndicator={false}>
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



            <View>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-start'}}>
                        <Text style={styles.title}>Selected by Tess</Text>
                    </View>
                    <View style={{alignSelf:'flex-end'}}>
                        <TouchableOpacity style={{marginLeft: 50, marginTop:3}}>
                            <Text style={styles.viewAll}>View all</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <ListView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    enableEmptySections
                    dataSource={this.dataSourceNewPodcasts}
                    renderRow={this.renderRowNewPodcasts}
                />
            </View>


                        <ScrollView style={{height: 122, marginVertical: 20}} horizontal={true} showsHorizontalScrollIndicator={false}>
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

                            <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, marginRight: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressTravel}>
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
                        </ScrollView>




                <View style={{paddingBottom: 150}}>
                    <Text style={styles.title}>From Tess</Text>
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
        fontSize: 20,
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

    viewAll: {
        color: '#5757FF',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 16,
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