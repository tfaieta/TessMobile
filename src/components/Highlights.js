import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, ListView, Dimensions} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import ListItemHighlight from "./ListItemHighlight";

var {height, width} = Dimensions.get('window');


// displays collection of highlights (in library)


class Highlights extends Component{

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
            statusBarColor: '#fff',
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarNoBorder: true
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        let data = [];
        this.state = {
            myHighlights: dataSource.cloneWithRows(data),
            length: 0,

        };


        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/highlights`).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                if(snap.val()){
                    data.push(snap.val());
                }
            });
        });

        setTimeout(() => {
            this.setState({myHighlights: dataSource.cloneWithRows(data.reverse()), length: data.length})
        }, 1200)

    };





    renderRow = (data) => {
        return <ListItemHighlight highlight={data} navigator={this.props.navigator}  />;
    };



    render() {
        return (
            <View
                style={styles.container}>

                <ScrollView>

                    <Text style={styles.title}>{this.state.length} highlights</Text>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.myHighlights}
                        renderRow={this.renderRow}
                    />

                    <View style={{paddingBottom: height/5.56}}>

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
        backgroundColor: '#f5f4f9',
        marginTop: height/10.26,
    },

    title: {
        backgroundColor: 'transparent',
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/20.83,
        paddingVertical: height/66.7,
        marginBottom: height/667,
    },

});

export default Highlights;