import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, KeyboardAvoidingView, Button} from 'react-native';
import firebase from "./src/utils/firebase";
import "firebase/auth";
import Auth from "./src/components/Auth"
import ListhBirthday from "./src/components/ListBirthday"
import {decode, encode} from "base-64"

if(!global.btoa){
    global.btoa = encode;
}

if(!global.atob){
    global.atob = decode;
}

export default function App() {

    const [user, setuser] = useState(undefined);

    //Is constantly listening to changes therefore showing the needed view
    useEffect(() => {
    firebase.auth().onAuthStateChanged((response) =>{
        setuser(response);
    })
    }, [])

    if(user === undefined){
        return null;
    }

    return (
        <>
        <StatusBar barStyle="light-content" />

        <SafeAreaView style={styles.background}>  
            {user ? <ListhBirthday user={user}/> : <Auth style={styles.inner}/>}
        </SafeAreaView>

        </>
    );
}


const styles = StyleSheet.create({
    background:{
        backgroundColor : "#15212b",
        height: "100%",
    },
})
