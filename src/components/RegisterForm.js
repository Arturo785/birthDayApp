import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, KeyboardAvoidingView} from 'react-native'
import {validateEmail} from "../utils/validations";
import firebase from '../utils/firebase';

export default function RegisterForm(props) {

    const {changeForm} = props
    //Uses the fun created to hold the object that returns
    const [formData, setFormData] = useState(defaultValue())

    const [formError, setformError] = useState({});

    const register = () =>{
        let errors = {};

        if(!formData.email){
            errors.email = true;
        }
        if(!formData.password){
            errors.password = true;
        }
        if(!formData.repeatPassword){
            errors.repeatPassword = true;
        }
        else if(!validateEmail(formData.email)){
            errors.email = true;
        }
        else if(formData.password !== formData.repeatPassword){
            errors.password = true;
            errors.repeatPassword = true;
        }
        else if(formData.password.length < 6){
            errors.password = true;
        }
        else{
            // ok  
            firebase 
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() =>{
                console.log("Account created")
            })
            .catch(() => { // if something goes wrong
                setformError({
                    email: true,
                    password: true,
                    repeatPassword: true,
                  });
            });
        }
        setformError(errors)
    }


    return (        
        <>

         <TextInput 
             placeholder= "E-mail"
             placeholderTextColor="#969696"    // if solo es asi && terniario es asi ?
             style={[styles.input, formError.email && styles.errorInput]} //Adds the new info with the old data of the object
             onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
         />
         <TextInput 
             placeholder= "Password"
             placeholderTextColor="#969696"
             style={[styles.input, formError.password && styles.errorInput]}
             secureTextEntry={true}     //Adds the new info with the old data of the object
             onChange={(e) => setFormData({...formData, password : e.nativeEvent.text})}
         />
           
        <TextInput 
            placeholder= "Confirm Password"
            placeholderTextColor="#969696"
            style={[styles.input, formError.repeatPassword && styles.errorInput]}
            secureTextEntry={true}
            onChange={(e) => setFormData({...formData, repeatPassword : e.nativeEvent.text})}
        />
        
        <TouchableOpacity delayPressIn={0} onPress={register}>
             <Text style={styles.textButton}>Register</Text>
         </TouchableOpacity>
 
        <View style={styles.login}>
            <TouchableOpacity onPress={changeForm} delayPressIn={0}>
                <Text style={styles.textButton}> Sign-in  </Text>
            </TouchableOpacity>
        </View>

        </>
        
    )
}

function defaultValue(){
    return{
        email: "",
        password: "",
        repeatPassword: "",
    };
}

const styles = StyleSheet.create({
    textButton :{
        color : "#fff",
        fontSize : 18,
    },
    input:{
        height : 50,
        color : "#fff",
        width : "80%",
        marginBottom : 25,
        backgroundColor : "#1e3040",
        paddingHorizontal : 20,
        borderRadius : 20,
        fontSize : 18,
        borderWidth : 1,
        borderColor : "#1e3040",
    },
    login:{
        flex:1,
        justifyContent: "flex-end",
        marginBottom : 40,
    },
    errorInput:{
        borderColor : "#940c0c",
    },
});
