import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, KeyboardAvoidingView} from 'react-native';
import firebase from "./src/utils/firebase";
import "firebase/auth";
import Auth from "./src/components/Auth"

export default function App() {

    const [user, setuser] = useState(undefined);

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
            {user ? <Text>Estas loggeado</Text>: <Auth style={styles.inner}/>}
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
