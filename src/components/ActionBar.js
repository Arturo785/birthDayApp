import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from '../utils/firebase';

export default function ActionBar(props) {

    const {showList, setShowList} = props;

    return (
      <View style={styles.viewFooter}>

        <View style={styles.viewClose}>
          <Text style={styles.text} onPress={() => firebase.auth().signOut()}>
            Log-Out
          </Text>
        </View>

        <View style={styles.viewAdd}> 
            <Text style={styles.text} onPress={() => setShowList(!showList) /* to change views ( it's a boolean) */}> 
            {showList ? 'New Date' : 'Cancel Date'}
            </Text>
        </View>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    viewFooter: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      width: '100%',
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
      marginBottom: 20,
    },
    viewClose: {
      backgroundColor: '#820000',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 30,
    },
    viewAdd: {
      backgroundColor: '#1ea1f2',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 30,
    },
    text: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
    },
  });
