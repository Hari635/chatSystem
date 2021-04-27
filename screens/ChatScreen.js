import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet,  View,TouchableOpacity,SafeAreaView,KeyboardAvoidingView, ScrollView,Platform,Keyboard,TouchableWithoutFeedback } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Avatar,Text } from 'react-native-elements';
import { AntDesign,FontAwesome,Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

import {db,auth} from "../firebase"

const ChatScreen = ({navigation,route}) => {
    const [input,setInput]=useState("");
    const [message,setMessage]=useState([])
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
            headerTitle:()=>(
                <View
                style={{flexDirection:"row",
                        alignItems:"center",        
            }}>
                <Avatar rounded source={{uri:message[0]?.data.photoURL}} />
                <Text h4 >{route.params.chatName}</Text>

                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity style={{marginLeft:10}} onPress={navigation.goBack} >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View
                style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20
                }}
                >
                    <TouchableOpacity> 
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call"  size={24} color="white"  />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation,message])
    
    useLayoutEffect(()=>{
        const unsubscribe=db.collection("chats")
        .doc(route.params.id)
        .collection("message")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>setMessage(
            snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            }))
        ))

        return unsubscribe

    },[route])

    const sendMessage = ()=>{
        Keyboard.dismiss()
        db.collection("chats").doc(route.params.id).collection("message").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
        setInput("")
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
            behavior={Platform.OS==="ios"?"padding":"height"}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView contentContainerStyle={{paddingTop:15}}>
                    {/* chat comes here */}
                    
                    {message.map(({id,data})=>
                    data.email === auth.currentUser.email ?(
                       <View key={id} style={styles.reciever} >
                           
                           <Avatar
                           rounded
                           containerStyle={{
                            position:"absolute",
                            bottom:-15,
                            right:-5,
                           }}
                           position="absolute"
                           bottom={-15}
                           right={-5}
                           size={30}
                            source={{
                                uri:data.photoURL
                            }}
                            />
                           <Text style={styles.recieverText}>{data.message}</Text>
                       </View>
                    ):(
                        <View key={id} style={styles.sender} >
                            {/* {console.log("inside auth user")} */}
                            <Avatar
                           rounded
                           containerStyle={{
                            position:"absolute",
                            bottom:-15,
                            right:-5,
                           }}
                           position="absolute"
                           bottom={-15}
                           right={-5}
                           size={30}
                            source={{
                                uri:data.photoURL
                            }}
                            />
                            <Text style={styles.senderText} >{data.message}</Text>
                            <Text style={styles.senderName} >{data.displayName}</Text>
                        </View>

                    ))
                    }
                </ScrollView>
                <View style={styles.footer} >
                   <TextInput value={input} onChangeText={(text)=>setInput(text)} placeholder="Signal Message" style={styles.textInput}
                   onSubmitEditing={sendMessage}
                   />
                   <TouchableOpacity onPress={sendMessage}>
                       <Ionicons name='send' size={24} color="#2B68E6" />
                   </TouchableOpacity>
                </View>
                </>
                </TouchableWithoutFeedback>
                
            </KeyboardAvoidingView>

        </SafeAreaView>
        
    )
}

export default ChatScreen

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,

    },
    sender: {
        padding:15,
        backgroundColor:"#2c6BED",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative"

    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30
    },
    reciever:{
        padding:15,
        backgroundColor:"#2c6BED",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"

    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    },
    recieverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10
    }
})
