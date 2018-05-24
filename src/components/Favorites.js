import React, { Component } from 'react';
import { View, StyleSheet, ListView, Alert, ScrollView, Text} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import Variables from "./Variables";
import ListItem from "./ListItem";



class Favorites extends Component{

    componentWillMount(){
        Variables.state.favPodcasts = [];
        const { currentUser } = firebase.auth();
        const refFav = firebase.database().ref(`users/${currentUser.uid}/favorites`);

        refFav.orderByChild('favorites').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val().id){
                    firebase.database().ref(`podcasts/${data.val().id}`).on("value", function (snap) {
                        Variables.state.favPodcasts.push(snap.val())
                    })
                }
                else{
                    Variables.state.favPodcasts.push(data.val());
                }
            })
        });
    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
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
            dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts),
            loading: true,
            favorite: true,
            length: 0
        };
        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts), length: Variables.state.favPodcasts.length})},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts), length: Variables.state.favPodcasts.length})},3000);
    }



    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };



    onGarbagePress(){
        Alert.alert(
            'Are you sure you want to delete?',
            '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => console.warn('delete')
                },
            ],
            { cancelable: false }
        )
    }



    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };




    render() {
        return (
            <View
                style={styles.containerMain}>


                <ScrollView>

                    <Text style={styles.title}>{this.state.length} Episodes</Text>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />


                    <View style={{paddingBottom:120}}>

                    </View>

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

    title: {
        backgroundColor: 'transparent',
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginTop: 80,
        paddingVertical: 10,
        marginBottom: 1,
    },

});


export default Favorites;