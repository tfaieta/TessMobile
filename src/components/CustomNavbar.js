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


    render() {
        return (

            <View style={styles.container}>


                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Icon style={{
                            fontSize: 18,
                            backgroundColor: 'transparent',
                            color: '#506dcf',
                            marginHorizontal: 10,
                        }} name="search"/>
                    </View>

                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                        <Text style={styles.text}>Search</Text>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', alignSelf:'flex-end'}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigator.push({
                                screen: 'RecordFirst',
                            })
                        }}>
                            <Icon style={{
                                flex: 1,
                                fontSize: 20,
                                backgroundColor: 'transparent',
                                color: '#000',
                                marginHorizontal: 12,
                            }} name="microphone"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigator.push({
                                screen: 'Account',
                            })

                        }}>
                            <Icon style={{
                                flex: 1,
                                fontSize: 20,
                                backgroundColor: 'transparent',
                                color: '#000',
                                marginHorizontal: 12,
                            }} name="user-circle"/>
                        </TouchableOpacity>
                    </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        alignSelf: 'center',
    },
    text: {
        flex:1,
        fontSize: 14,
        paddingRight: 140,
        color: '#000',
        textAlign: 'left',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
    }
});

