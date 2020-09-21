import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import {validateEmail} from "../utils/validations";
import firebase from '../utils/firebase';

export default function LoginForm(props) {

    const {changeForm} = props

    const [formData, setformData] = useState(defaultValue)

    const [formError, setformError] = useState({});


    const login = () =>{
        let errors = {};

        if(!formData.email){
            errors.email = true;
        }
        if(!formData.password){
            errors.password = true;
        }
        else if(!validateEmail(formData.email)){
            errors.email = true;
        }
        else if(formData.password.length < 6){
            errors.password = true;
        }
        else{
            firebase.auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(console.log("signed"))
            .catch( () => { // if something goes wrong
                setformError({
                    email: true,
                    password: true,
                  });
            });
        }

        setformError(errors)
    }

    const onChange = (e, type) =>{
        setformData({...formData,  [type]: e.nativeEvent.text}) // gets the value of the key type
    }

    return (
        <>
         <TextInput
             style={[styles.input, formError.email && styles.errorInput]}
             placeholder="E-mail"
             placeholderTextColor="#969696"
             onChange={(e) => onChange(e, "email")} // sends the event to the overriding of onChange and the type "what is changing"
         />
         <TextInput
             style={[styles.input, formError.password && styles.errorInput]}
             placeholder="Password"
             placeholderTextColor="#969696"
             secureTextEntry={true}
             onChange={(e) => onChange(e, "password")} // sends the event to the overriding of onChange and the type "what is changing"
         />
 
         <TouchableOpacity onPress={login} delayPressIn={0}>
             <Text style={styles.textButton}> Log-in  </Text>
         </TouchableOpacity>

         <View style={styles.register}>
            <TouchableOpacity onPress={changeForm} delayPressIn={0}>
                <Text style={styles.textButton}> Register  </Text>
            </TouchableOpacity>
         </View>

        </>
    )
}

function defaultValue(){
    return{
        email: "",
        password: "",
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
      register: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
      },
      errorInput: {
        borderColor: '#940c0c',
      },
});
