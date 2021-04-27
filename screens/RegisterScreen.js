import { StatusBar } from 'expo-status-bar';
import React,{useState,useLayoutEffect} from 'react';
import { StyleSheet,  View, KeyboardAvoidingView } from 'react-native';
import { Button,Input,Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen=({navigation})=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [imageUrl,setImageUrl]=useState("")
    useLayoutEffect(() => { 
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        })
    }, [navigation])
    const register=()=>{
        auth.createUserWithEmailAndPassword(email,password).then(
            (authUser)=>{
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL:imageUrl || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2Fmmhwxw_transparent-user-png-default-user-image-png-png%2F&psig=AOvVaw0hKvnSuwln2g5B8S2Td0Mj&ust=1619488517866000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODShIfnmvACFQAAAAAdAAAAABAD"
                });
            }
        ).catch((error)=>alert(error.message))
    }
    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{marginBottom:50}} >
                 Create a Account
            </Text>
            <View style={styles.InputContainer} >
              <Input
              placeholder="Full Name"
              autoFocus
              type='text'
              value={name}
              onChangeText={(text)=>setName(text)}

              />
               <Input
              placeholder="Email"
              type='email'
              value={email}
              onChangeText={(text)=>setEmail(text)}
              />
               <Input
              placeholder="Password"
              type='password'
              value={password}
              onChangeText={(text)=>setPassword(text)}
              
              />
               <Input
              placeholder="Profile Picture URL(optional)"
              type='text'
              value={imageUrl}
              onChangeText={(text)=>setImageUrl(text)}
              onSubmitEditing={register}
              />
            </View>
            <Button 
            containerStyle={styles.button}
            raised
            onPress={register}
            title="Register"
            />

        </KeyboardAvoidingView>
    )

}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    button: {
        width:200,
        marginTop:10,
    },
    InputContainer:{
        width:300
    }
})