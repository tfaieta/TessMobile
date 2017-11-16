import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';


class Queue extends Component{

    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


    render() {
        return (
            <View
                style={styles.container}>


                <View style={{flexDirection: 'row', paddingVertical:5, borderRadius: 10, borderWidth: 2, borderColor: 'rgba(187,188,205,0.3)',   }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Recently Played</Text>
                    </View>

                    <View>
                    </View>

                </View>



                <ScrollView>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,  fontSize: 35,color:'#5757FF' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20, fontSize: 35,color:'#5757FF' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#5757FF' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20, fontSize: 35,color:'#5757FF' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>


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
        color: '#9496A3',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 20,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        backgroundColor: 'transparent',

    }

});

export default Queue;