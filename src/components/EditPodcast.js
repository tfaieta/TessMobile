import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import firebase from 'firebase';
import SimplePicker from 'react-native-simple-picker';
import Icon from 'react-native-vector-icons/Ionicons';




const labels = ['News', 'Fitness', 'Gaming', 'Society & Culture', 'Sports', 'Entertainment', 'Comedy', 'Lifestyle', 'Religion & Spirituality', 'Science & Nature', 'Tech', 'Travel', 'Learn Something', 'Storytelling', 'Other'];
const options = ['News', 'Fitness', 'Gaming', 'Society & Culture', 'Sports', 'Entertainment', 'Comedy', 'Lifestyle', 'Religion & Spirituality', 'Science & Nature', 'Tech', 'Travel', 'Learn Something', 'Storytelling', 'Other'];




class EditPodcast extends Component {
    componentWillMount(){
        const rowData = this.props.rowData;
        this.setState({title: rowData.podcastTitle, description: rowData.podcastDescription, category: rowData.podcastCategory})
    }

    constructor(props){
        super(props);
        this.state={
            title: '',
            description: '',
            category: ''
        }
    }





    render(){

        const rowData = this.props.rowData;
        const navigator = this.props.navigator;
        const {currentUser} = firebase.auth();


            return(
                <View style= {styles.container}>
                    <View>
                        <Text style={styles.textTitle}>Edit Podcast</Text>
                    </View>

                    <Text style={styles.textStyle}>Title</Text>
                        <TextInput
                            style ={styles.input}
                            placeholder = {rowData.podcastTitle}
                            placeholderTextColor='#FFF'
                            returnKeyType='next'
                            label="Title"
                            value={this.state.title}
                            onChangeText={text => this.setState({title: text})}
                            maxLength={50}
                            multiline={true}
                            onSubmitEditing={(event) => {
                                this.refs.input2.focus();
                            }}
                        />

                    <Text style={styles.textStyle}>Description</Text>
                        <TextInput
                            ref='input2'
                            style ={styles.input2}
                            placeholder = {rowData.podcastDescription}
                            placeholderTextColor='#FFF'
                            returnKeyType='done'
                            label="Description"
                            blurOnSubmit={true}
                            value={this.state.description}
                            onChangeText={text => this.setState({description: text})}
                            multiline={true}
                            maxLength={200}
                        />


                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <Icon style={{
                            textAlign: 'left',
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop:10,
                            color: '#fff',
                            backgroundColor: 'transparent',
                        }} name="md-folder">
                        </Icon>
                        <Text style={{ color: '#fff', marginTop: 10, fontSize: 16, marginLeft: 10, fontFamily: 'Hiragino Sans', }}>Categories</Text>
                        <Text
                            style={{ color: '#fff', marginTop: 10, fontSize: 16, marginLeft: 30, fontFamily: 'Hiragino Sans', }}
                            onPress={() => {
                                this.refs.picker1.show();
                            }}
                        >
                            {this.state.category}
                        </Text>
                        <Icon style={{
                            flex:1,
                            textAlign: 'right',
                            fontSize: 18,
                            marginRight: 10,
                            marginTop:10,
                            color: '#fff',
                            backgroundColor: 'transparent',
                        }} name="ios-arrow-forward"
                              onPress={() => {
                                  this.refs.picker1.show();
                              }}>
                        </Icon>
                    </View>


                    <SimplePicker
                        ref={'picker1'}
                        options={options}
                        labels={labels}
                        itemStyle={{
                            fontSize: 22,
                            color: 'black',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontFamily: 'Hiragino Sans',
                        }}
                        onSubmit={itemValue => {
                            this.setState({category: itemValue})
                        }}
                    />




                    <TouchableOpacity onPress={() => {
                        if(rowData.id){
                            const {podcastTitle} = this.state.title;


                            if(podcastTitle != ''){
                                firebase.database().ref(`podcasts/${rowData.id}`)
                                    .update({   podcastTitle: this.state.title  });
                            }

                            const {podcastDescription} = this.state.description;

                            if(podcastDescription != ''){
                                firebase.database().ref(`podcasts/${rowData.id}`)
                                    .update({   podcastDescription: this.state.description  });
                            }

                            const {podcastCategory} = this.state.category;

                            if(podcastCategory != ''){
                                firebase.database().ref(`podcasts/${rowData.id}`)
                                    .update({   podcastCategory: this.state.category  });
                            }

                            navigator.dismissAllModals();
                        }

                    }}>
                        <Text style={styles.textStyle}>Make Changes</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress = {() => {
                        navigator.dismissModal();
                    }}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>




                </View>
            )


    }


}




const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: "#9f60ff90"
    },
    textStyle:{
        color: '#fff',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 18,
        backgroundColor: 'transparent',
        marginTop: 30,
    },
    textTitle:{
        color: '#fff',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 14,
        marginTop: 40,
        backgroundColor: 'transparent',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    textArtist:{
        color: '#fff',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    input: {
        height: 60,
        backgroundColor: 'transparent',
        fontSize: 15,
        marginHorizontal: 20,
        color: '#FFF',
        paddingHorizontal: 10,
    },

    input2: {
        height: 120,
        backgroundColor: 'transparent',
        color:'#FFF',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        fontSize: 15,
    },

});


export default EditPodcast;