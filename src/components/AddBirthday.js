import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment  from "moment";
import firebase from '../utils/firebase';
import "firebase/firestore";


firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase)

export default function AddBirthday(props) {

    const {user, setShowList, setReloadData} = props;

    const [isPickerVisible, setIsPickerVisible] = useState(false)

    const [formData, setFormData] = useState({});

    const [formError, setformError] = useState({});

    //Saves the data of the textInputs changes and stores on the object depending on the type
    const onChange = (e, type) =>{
        setFormData({...formData, [type] : e.nativeEvent.text})
    }

    const hideDatePicker = () =>{
        setIsPickerVisible(false)
    }

    const handlerConfirm = (data) =>{
        //console.log(moment(data).format("LL"))
        const dateBirth = data;
        console.log(dateBirth)

        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);

        setFormData({...formData, dateBirth})
        console.log(dateBirth)
        hideDatePicker();
    }

    const showDatePicker = () => {
        setIsPickerVisible(true)
    }

    const onSubmit = () => {
        let errors = {};

        if(!formData.name){
            errors.name = true;
        }
        if(!formData.lastName){
            errors.lastName = true;
        }
        if(!formData.dateBirth){
            errors.dateBirth = true;
        }
        else{
            //ok
            const data = formData
            data.dateBirth.setYear(0); // to have a standar number of millis
            db.collection(user.uid) // creates a collection inside fireStore with that id making an unique collection per user
                .add(data)
                .then(() =>{
                    console.log("Saved")
                    setReloadData(true);
                    setShowList(true); //to show the list again
                })
                .catch(() =>{
                    setformError({name: true, lastName: true, dateBirth:true});
                });
        }
        setformError(errors);
    }

    return (
        <>
         <View style={styles.container}>
             <TextInput placeholder="Name" placeholderTextColor="#969696" 
                style={[styles.input, formError.name && styles.errorInput]}
                onChange={(e) => onChange(e, "name")}
             />
             <TextInput placeholder="Last Name" placeholderTextColor="#969696" 
                style={[styles.input, formError.lastName && styles.errorInput]}
                onChange={(e) => onChange(e, "lastName")}
             />

             <View style={[styles.input, styles.datepicker, formError.dateBirth && styles.errorInput]}>
                 <Text style={[styles.textDate, formData.dateBirth && styles.textFullForm]}
                  onPress={showDatePicker}>
                     {formData.dateBirth ? moment(formData.dateBirth).format("LL") 
                     : "Date of birth"}        
                </Text>
             </View>
             <TouchableOpacity onPress={onSubmit}>
                 <Text style={styles.addButton}>
                     Create Birthday
                 </Text>
             </TouchableOpacity>
         </View>

         <DateTimePickerModal 
            isVisible={isPickerVisible}
            mode="date"
            onConfirm={handlerConfirm}
            onCancel={setIsPickerVisible}
        />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius : 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
      },
      datepicker: {
        justifyContent: 'center',
      },
      addButton: {
        fontSize: 18,
        color: '#fff',
      },
      textDate:{
        fontSize: 18,
        color : "#969696"
      },
      textFullForm:{
          color:"#fff"
      },
      errorInput:{
        borderColor : "#940c0c",
    },
})
