import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'


export default function Birthday(props) {

    const {birthday, deleteBirthDay} = props;
    const passed = birthday.days > 0 ? true : false;


    const infoDay = () => {
        if (birthday.days === 0) {
            return <Text style={{color: '#fff'}}>It's its birthday </Text>;
        } 
        else {
          const days = -birthday.days;

          return (
            <View style={styles.textCurrent}>
              <Text>{days}</Text>
              <Text>{days === 1 ? 'Dia' : 'Dias'}</Text>
            </View>
          ); 
        }

      };


    return (
        <TouchableOpacity style={[
            styles.card,
             passed  // if, else if, else
              ? styles.passed
              : birthday.days === 0
              ? styles.actual
              : styles.current]} // end of styles

               delayPressIn={0}
               onPress={() => deleteBirthDay(birthday)}
               >
            
            <Text style={styles.userName}>
                {birthday.name} {birthday.lastName}
            </Text>

            {passed ? <Text style={{color:"#fff"}}> Passed </Text> : infoDay()} 

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
      },
      actual: {
        backgroundColor: '#559204',
      },
      current: {
        backgroundColor: '#1ae1f2',
      },
      passed: {
        backgroundColor: '#820000',
      },
      userName: {
        color: '#fff',
        fontSize: 16,
      },
      textCurrent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
