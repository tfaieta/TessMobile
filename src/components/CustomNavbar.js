import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';



// custom static nav bar, used throughout app

export default class CustomNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }



    goToAccount(){

    }

    render() {
        return (

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 10, borderBottomColor: '#00000010', borderBottomWidth: 2, }}>
                    <View style={{alignItems: 'flex-start'}}>
                        <Image
                            style={{tintColor: '#506dcf'}}
                            source={require('tess/src/images/iconSearch.png')}
                        />
                    </View>

                    <View style={{flex:1,justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 10}}>
                        <Text style={styles.text}>Search</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.goToAccount}>
                            <Image
                                style={{tintColor: 'black', marginHorizontal: 10}}
                                source={require('tess/src/images/iconMic.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.goToAccount}>
                            <Image
                                style={{tintColor: 'black', marginHorizontal: 10}}
                                source={require('tess/src/images/iconAccount.png')}
                            />
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
        // backgroundColor: 'green'
    },
    text: {
        fontSize: 14,
        color: '#000',
        marginTop: 5,
        textAlign: 'left',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
    }
});
