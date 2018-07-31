import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemPodcast from "./ListItemPodcast";
var {height, width} = Dimensions.get('window');


// search component for onboard process

class OnboardSearch extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        tabBarHidden: true,
        statusBarTextColorScheme: 'dark',
        statusBarColor: '#fff',
    };


    componentWillMount(){
        const refArtist = firebase.database().ref(`users/`);

        if(Variables.state.searchWord != ''){
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

    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }


    searchActivate = () => {
        Variables.state.searchWord = this.state.search;
        this.props.navigator.push({
            screen: 'OnboardSearch',
            animated: true,
            animationType: 'fade',
        });
    };

    constructor(props) {
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            search: Variables.state.searchWord,
            searchFinished: false,
            podcastSource: dataSource.cloneWithRows(Variables.state.mySearchesPodcast)
        };

        if(Variables.state.searchWord != ''){
            this.timeout2 = setTimeout(() => {this.setState({
                podcastSource: dataSource.cloneWithRows(Variables.state.mySearchesPodcast), searchFinished: true})}, 7000);
        }

    }

    _renderResults = (mySearchesPodcast) => {
        if(Variables.state.searchWord != ''){
            if(this.state.searchFinished){
                if(mySearchesPodcast > 0){
                    return(
                        <View style={{flex:1}}>
                            <ListView
                                enableEmptySections
                                dataSource={this.state.podcastSource}
                                renderRow={this.renderRowPodcast}
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

    renderRowPodcast = (rowData) => {
        return <ListItemPodcast podcast={rowData} navigator={this.props.navigator} />;
    };

    Back = () => {
        this.props.navigator.pop({
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
                        inputStyle={{backgroundColor: '#f5f4f9', color: '#2A2A30', marginHorizontal: width/50,
                            fontFamily: 'Montserrat-SemiBold', fontStyle: 'normal', paddingBottom: height/80.31}}
                        containerStyle= {styles.containerSearch}
                        placeholder={'Search...'}
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
                    {this._renderResults(Variables.state.mySearchesPodcast.length)}
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
        backgroundColor: '#f5f4f9',
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
        marginHorizontal: height/33.35,
    },
    backColor:{
        backgroundColor:  '#f5f4f9',
        flexDirection: 'row',
        marginTop: height/33.35,
    },
    containerSearch:{
        marginLeft: height/66.7,
        marginTop: height/33.35,
        width: height/1.942,
        backgroundColor: '#f5f4f9',
        borderColor:'#f5f4f9',
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#f5f4f9',
        borderBottomColor: '#f5f4f9',
    },
    backButtonContainer:{
        paddingTop: height/23.821,
        paddingLeft: height/66.7,
    },
    containerMain:{
        flex: 1,

    },
    container2: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#f5f4f9',
        opacity: 1,
        borderColor: '#f5f4f9',
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
    bar: {
        flex: 1,
        height: height/14,
        width: width,
        backgroundColor: '#f5f4f9',
    },
});

export default OnboardSearch;
