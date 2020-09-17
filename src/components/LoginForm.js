import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function LoginForm(props) {

    const {changeForm} = props

    return (
        <View>
            <Text>LoginForm</Text>
            <TouchableOpacity onPress={changeForm} delayPressIn={0}>
                <Text style={styles.textButton}> Register  </Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    textButton :{
        color : "#fff",
        fontSize : 18,

    }
});
