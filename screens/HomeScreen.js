import React,{useLayoutEffect,useEffect,useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import CustomListItem from "../components/CustomListItem";
import { Avatar } from 'react-native-elements';
import { auth,db } from "../firebase";
import { AntDesign,SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const [chats,setChats]=useState([])
    const signOut=()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerLeft:()=>(
                <View>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5} >
                    <Avatar rounded source={{uri:auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight:()=>(
                <View 
                style={{flexDirection:"row",
                justifyContent:"space-between",
                width:80,
                marginRight:20,     
                }} >
                    <TouchableOpacity activeOpacity={0.5}>
                       <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate("AddChat")}}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                    
                </View>
            )
        })

      
    }, [navigation])
    const enterchat=(id,chatName)=>{
        navigation.navigate("Chat",{
            id,
            chatName
        })
    }

    useEffect(()=>{
       const unsubscribe=db.collection("chats").onSnapshot((snapshot)=>
       setChats(
           snapshot.docs.map((doc)=>({
               id:doc.id,
               data:doc.data(),
           }))
       ))
       return unsubscribe
    },[])

    return (
       <SafeAreaView style={styles.container} >
           <ScrollView>
               {
                   chats.map(({id,data:{chatName}})=>(
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterchat} />
                   ))
               }
               
           </ScrollView>
       </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})
