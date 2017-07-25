import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements'



class SearchPage extends Component{

    render() {
        return (
            <View style={styles.container}>


                <StatusBar
                    barStyle="light-content"
                />


            <ScrollView style={styles.container}>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    Results</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    Results</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    Results</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    Results</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    Results</Text>
                    </Icon>
                </TouchableOpacity>


            </ScrollView>



            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 30,
    },

    title: {
        color: '#804cc8',
        marginTop: 20,
        marginLeft: 20,
        flex:1,
        textAlign: 'left',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    containerSearch:{
        marginTop: 20,
        backgroundColor: '#804cc8',

    },

});

export default SearchPage;