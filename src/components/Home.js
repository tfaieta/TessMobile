import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import Variables from './Variables';
import firebase from 'firebase';



class Home extends Component{
    componentWillMount(){
        const {currentUser} = firebase.auth();

        firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.bio = snap.val().bio;

            }
            else {
                Variables.state.bio = "Tell others about yourself"
            }
        });
        firebase.database().ref(`/users/${currentUser.uid}/favCategory`).orderByChild("favCategory").on("value", function(snap) {
            if(snap.val()){
                Variables.state.favCategory = snap.val().favCategory;

            }
            else {
                Variables.state.favCategory = "Tell others about yourself"
            }
        });
    }



    render() {
    return (
        <View
            style={styles.container}>

            <StatusBar
                barStyle="light-content"
            />



            <View style={styles.homeContainer}>
            <ScrollView showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>


                <Text style={styles.title}>Featured</Text>
            <ScrollView horizontal={true} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>

                <TouchableOpacity>
                <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

            </ScrollView>





                <Text style={styles.title}>Trending</Text>
            <ScrollView horizontal={true} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

            </ScrollView>



                <Text style={styles.title}>Recommended</Text>
                <ScrollView horizontal={true} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                </ScrollView>



            </ScrollView>
            </View>







                <PlayerBottom/>





        </View>



    );
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 80,
    },
    homeContainer:{
        marginTop: -15,
    },
    barContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 10
    },

    title: {
        color: '#804cc8',
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent',
    },
    title2: {
        color: 'rgba(1,170,170,1)',
        flex:1,
        textAlign: 'center',
        fontSize: 20
    },


});

export default Home;