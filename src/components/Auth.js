import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView} from 'react-native'
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function Auth() {

    const [islogged, setIslogged] = useState(false)

    const changeForm = () =>{
        setIslogged(!islogged);
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        
        <View style={styles.view}>
        
            <Image style={styles.logo} source={require("../assets/logo.png")}></Image>

            {!islogged? (<LoginForm changeForm={changeForm}/>) : /* if not logged show loggin else register, the view is used to allow softKeyboard */
            <View style={styles.inner}> 
                <RegisterForm changeForm={changeForm}/> 
            </View>}

        </View>
        </KeyboardAvoidingView>
    );
}




const styles = StyleSheet.create({
    view:{
        flex : 1,
        alignItems : "center",
    },
    logo:{
        width : "80%",
        height: 240,
        marginTop : 50,
        marginBottom : 50,
    },
    container: {
        flex: 1
    },
    inner: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems : "center",
    width : "100%",
    },
})
