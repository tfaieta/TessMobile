import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';



// custom static nav bar, used throughout app

export default class CustomNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    goToRecord(){

        Navigation.showModal({
            screen: 'RecordFirst',
        })

    }

    goToAccount(){

        Navigation.showModal({
            screen: 'Account',
        })

    }

    render() {
        return (

            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, borderLeftColor: '#00000005', borderLeftWidth: 2, borderRightColor: '#00000005', borderRightWidth: 2,  borderBottomColor: '#00000015', borderBottomWidth: 2, }}>
                    <View style={{alignItems: 'flex-start'}}>
                        <Icon style={{
                            fontSize: 18,
                            backgroundColor: 'transparent',
                            color: '#506dcf',
                            marginHorizontal: 10,
                        }} name="search"/>
                    </View>

                    <View style={{flex:1,justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 10}}>
                        <Text style={styles.text}>Search</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.goToRecord}>
                            <Icon style={{
                                fontSize: 20,
                                backgroundColor: 'transparent',
                                color: '#000',
                                marginHorizontal: 10,
                            }} name="microphone"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goToAccount}>
                            <Icon style={{
                                fontSize: 20,
                                backgroundColor: 'transparent',
                                color: '#000',
                                marginHorizontal: 10,
                            }} name="user-circle"/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 0,
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.7,
    },
    button: {
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
    }
});

