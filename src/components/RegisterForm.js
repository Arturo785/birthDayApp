import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, KeyboardAvoidingView} from 'react-native'

export default function RegisterForm(props) {

    const {changeForm} = props
    //Uses the fun created to hold the object that returns
    const [formData, setFormData] = useState(defaultValue())

    const register = () =>{
        console.log(formData);
    }


    return (        
        <>

         <TextInput 
             placeholder= "E-mail"
             placeholderTextColor="#969696"
             style={styles.input} //Adds the new info with the old data of the object
             onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
         />
         <TextInput 
             placeholder= "Password"
             placeholderTextColor="#969696"
             style={styles.input}
             secureTextEntry={true}     //Adds the new info with the old data of the object
             onChange={(e) => setFormData({...formData, password : e.nativeEvent.text})}
         />
           
        <TextInput 
            placeholder= "Confirm Password"
            placeholderTextColor="#969696"
            style={styles.input}
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
});
