import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import PlayerBottom from './PlayerBottom';



class Library extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        statusBarTextColorScheme: 'light',
        navBarHidden: false,
        drawUnderTabBar: false,
        navBarCustomView: 'CustomNavbar',
        navBarCustomViewInitialProps: {navigator},
        navBarHideOnScroll: true,
        navBarBackgroundColor: '#fff',
        topBarElevationShadowEnabled: true,
        topBarShadowColor: '#000',
        topBarShadowOpacity: 1,
        topBarShadowOffset: 20,
        topBarShadowRadius: 10,
    };

    GoToRecentlyPlayed = () => {
        this.props.navigator.push({
            screen: 'RecentlyPlayed',
            animated: true,
            animationType: 'fade',
        });
    };

    GoToFavs = () => {
        this.props.navigator.push({
            screen: 'Favorites',
            animated: true,
            animationType: 'fade',
        });
    };

    GoToFollowedContent = () => {
        this.props.navigator.push({
            screen: 'Followed',
            animated: true,
            animationType: 'fade',
        });
    };

    GoToMyContent = () => {
        this.props.navigator.push({
            screen: 'MyContent',
            animated: true,
            animationType: 'fade',
        });
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />


                <Image
                    style={{width: 260, height:260, alignSelf: 'center', marginTop: 100}}
                    source={require('tess/src/images/library-nav.png')}
                >


                    <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.GoToFavs} style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.GoToRecentlyPlayed} style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.GoToFollowedContent}  style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.GoToMyContent} style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                    </View>
                    </View>



                </Image>


                <PlayerBottom navigator={this.props.navigator}/>

            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#FFF',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',

    },

    buttonPreview: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingBottom: 15,
    },

    buttonUpload: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonCancel: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonContainer: {
        marginTop: 50,
    },

    header: {
        marginTop:25,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

    }
});

export default Library;