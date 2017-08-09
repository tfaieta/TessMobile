import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Slider,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import PlayerBottom from './PlayerBottom';

class Account extends Component {

    constructor(props) {
        super(props)
        this.state = { volume: 20}
    }
    getVal(val){

    }

    render() {
        return (
            <View
                style={styles.container}>



                <ScrollView>

                <Text style={styles.title2 }>My Name</Text>
                <StatusBar
                    barStyle="light-content"
                />

                <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 140,color:'#888784' }} name="md-contact">
                </Icon>

                    <Text style={styles.title2 }>Bio</Text>
                    <Text style={styles.title2 }>Content</Text>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>


                </ScrollView>





                <PlayerBottom/>

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
    title2: {
        color: 'rgba(1,170,170,1)',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
});

export default Account;