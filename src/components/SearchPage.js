import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions} from 'react-native';
import Divider from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import ListItem from "./ListItem";
import ListItemFollowed from "./ListItemFollowed"

var {height, width} = Dimensions.get('window');

class SearchPage extends Component{

static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'dark',
        statusBarColor: '#fff',
    };


    componentWillMount(){
        Variables.state.mySearches = [];
        const refMy = firebase.database().ref(`podcasts/`);

        refMy.once("value", function (snapshot) {
            Variables.state.mySearches = [];
            snapshot.forEach(function (data) {

                if(data.val().podcastTitle.toLowerCase().includes(Variables.state.searchWord.toLowerCase())) {
                    Variables.state.mySearches.push(data.val());
                }
            })
        });

        const refArtist = firebase.database().ref(`users/`);

        refArtist.once("value", function (snapshot) {
            Variables.state.mySearchesPodcast = [];
            snapshot.forEach(function (data) {
                if (data.val()) {
                    firebase.database().ref(`/users/${data.key}/username`).orderByChild("username").once("value", function (snap) {
                        if (snap.val()) {
                            if (snap.val().username.toLowerCase().includes(Variables.state.searchWord.toLowerCase())) {
                                Variables.state.mySearchesPodcast.push(data.key);
                            }
                        }
                    });
                }
            })
        })
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }


    searchActivate = () => {
        Variables.state.searchWord = this.state.search;
        this.props.navigator.push({
            screen: 'SearchPage',
            animated: true,
            animationType: 'fade',
        });
    };

    constructor(props) {
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.mySearches),
            search: Variables.state.searchWord,
            searchFinished: false,
            podcastSource: dataSource.cloneWithRows(Variables.state.mySearchesPodcast)
        };

        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.mySearches),
            podcastSource: dataSource.cloneWithRows(Variables.state.mySearchesPodcast), searchFinished: true})}, 5000);
    }

    _renderResults =(mySearches, mySearchesPodcast) => {
        if(this.state.searchFinished){
            if(mySearches > 0 || mySearchesPodcast > 0){
                return(
                    <View style={{flex:1}}>
                        <View style={styles.separatorBar}>
                            <Text style={styles.separators}>Podcasts</Text>
                        </View>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.podcastSource}
                            renderRow={this.renderRowPodcast}
                            renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        />
                        <View style={styles.separatorBar}>
                            <Text style={styles.separators}>Episodes</Text>
                        </View>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        />
                    </View>
                )
            }
            else{
                return(
                    <View>
                        <Text style={styles.title2}>No Results Found</Text>
                    </View>
                )
            }
        }
        else{
            return(
                <View>
                    <ActivityIndicator style={{paddingVertical: height/33.35, alignSelf:'center'}} color='#3e4164' size ="large"/>
                </View>
            )
        }
    };

    podcastRequest = () => {
          return (
              <TouchableOpacity style={styles.bar} onPress={this.goToPage}>
                  <Text style={styles.textRequest}>Can't find a podcast? Recommend it!</Text>
              </TouchableOpacity>
          )
    };

    goToPage = () => {
        this.props.navigator.push({
            screen: 'Recommend',
            animated: true,
            animationType: 'fade',
        });
    };

    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };

    renderRowPodcast = (rowData) => {
        return <ListItemFollowed podcast={rowData} navigator={this.props.navigator} />;
    };

    Back= () => {
        this.props.navigator.popToRoot({
            animated: true,
            animationType: 'fade',
        });
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.backColor}>

                    <TouchableOpacity style={styles.backButtonContainer} onPress={this.Back}>
                        <View>
                            <Icon style={{
                                fontSize: width/22.83,
                                backgroundColor: 'transparent',
                                color: '#506dcf',
                                marginHorizontal: width/41.1,
                                marginBottom: height/85,
                            }} name="ios-arrow-back"/>
                        </View>
                    </TouchableOpacity>

                    <SearchBar
                        lightTheme
                        round
                        noIcon={true}
                        inputStyle={{backgroundColor: '#fff', color: '#2A2A30', marginHorizontal: width/50,
                            fontFamily: 'Montserrat-SemiBold', fontStyle: 'normal', paddingBottom: height/80.31}}
                        containerStyle= {styles.containerSearch}
                        placeholder={this.state.search}
                        placeholderTextColor = '#2A2A30'
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={this.state.search}
                        onChangeText={search => this.setState({ search })}
                        returnKeyType='search'
                        onSubmitEditing={this.searchActivate}
                    />

                </View>

                <ScrollView>
                    {this._renderResults(Variables.state.mySearches.length, Variables.state.mySearchesPodcast.length)}
                    <View style={{paddingBottom: height/133.4}}>
                    </View>
                    {this.podcastRequest()}
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
    },
    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/44.47,
        backgroundColor: 'transparent',
        marginHorizontal: height/33.35,

    },
    backColor:{
        backgroundColor:  '#fff',
        flexDirection: 'row',
        marginTop: height/33.35,
    },

    containerSearch:{
        marginLeft: height/66.7,
        marginTop: height/33.35,
        width: height/1.942,
        backgroundColor: '#fff',
        borderColor:'#fff',
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
    },
    backButtonContainer:{
        paddingTop: height/23.821,
        paddingLeft: height/66.7,
    },

    containerList: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },


    containerMain:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: height/26.68,
        paddingBottom: height/33.35,
        marginLeft: height/33.35,

    },

    container2: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    title2: {
        color: '#2A2A30',
        flex:1,
        marginTop: height/33.35,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/44.35,
        backgroundColor: 'transparent'
    },
    titleOther: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/44.47,
        backgroundColor: 'transparent',
        marginHorizontal: height/33.35,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/44.47,
        backgroundColor: 'transparent',
        marginLeft: height/33.35,
    },

    header: {
        marginTop: height/26.68,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/37.06,
        backgroundColor: 'transparent',

    },

    containerOther: {
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 7,
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: height/333.5,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height/222.33,
        marginHorizontal: -100,
    },
    textRequest: {
        color: '#3e4164',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/45.35,
    },
    separators: {
        color: '#3e4164',
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: height/36.35,
    },
    bar: {
        flex: 1,
        height: height/14,
        width: width,
        backgroundColor: '#fff',
    },
    separatorBar: {
        flex: 1,
        height: height/12,
        width: width,
        backgroundColor: '#fff',
        marginTop: height/33.35
    },
});

export default SearchPage;