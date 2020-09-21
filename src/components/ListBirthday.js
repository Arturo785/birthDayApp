import React, {useState, useEffect} from 'react'
import { StyleSheet, View, ScrollView, Alert, } from 'react-native'
import ActionBar from "./ActionBar";
import AddBirthday from "./AddBirthday";
import Birthday from "./Birthday";
import firebase from '../utils/firebase';
import moment  from "moment";
import "firebase/firestore";

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase)

export default function ListBirthday(props) {

    const {user} = props;

    const [showList, setShowList] = useState(true)

    const [birthdays, setBirthdays] = useState([]);
    const [passedBirthdays, setPassedBirthdays] = useState([]);
    const [reloadData, setReloadData] = useState(false);


    useEffect(() =>{
        setBirthdays([]);
        setPassedBirthdays([]);
        db.collection(user.uid)
        .orderBy("dateBirth", "asc")
        .get()
        .then((response) =>{
            const itemsArray = [];

            response.forEach((doc) =>{
                const data = doc.data();
                data.id = doc.id; // adds the id to the data
                itemsArray.push(data)
            });
            formatData(itemsArray);
        });

        setReloadData(false);
    }, [reloadData]);


    const formatData = (items) => {
        const currentDate = moment().set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        });
    
        const birthdayTempArray = [];
        const passedBirthdayTempArray = [];
    
        items.forEach((item) => {
          const dateBirth = new Date(item.dateBirth.seconds * 1000);
          const dateBirthday = moment(dateBirth);
          const currentYear = moment().get('year');

          dateBirthday.set({year: currentYear});
    
          const diffDate = currentDate.diff(dateBirthday, 'days');
          const itemTemp = item;

          itemTemp.dateBirth = dateBirthday;
          itemTemp.days = diffDate;
    
          if (diffDate <= 0) {
            birthdayTempArray.push(itemTemp);
          } 
          else {
            passedBirthdayTempArray.push(itemTemp);
          }

        });
    
/*         console.log("days1 " + birthdayTempArray);
        console.log("days 2 " + passedBirthdayTempArray); */
        
        setBirthdays(birthdayTempArray);
        setPassedBirthdays(passedBirthdayTempArray);
      };

      const deleteBirthDay = (birthday) =>{
          Alert.alert(
              "Delete birthday",
              `Are you sure you want to delete ${birthday.name} birhday? this action can't be undone`,
              [
                {
                  text: "Cancel", 
                  style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () =>{
                        db.collection(user.uid)
                            .doc(birthday.id)
                            .delete().then(() =>{
                                setReloadData(true)
                            });
                    }
                }
            ],
            {cancelable: false},
          );
      };


    return (
    <View style={styles.container}>
        {showList ?(
            <ScrollView style={styles.scrollView}> 

                {birthdays.map((item,index) => ( // does an action with every item in the array
                    <Birthday
                    key={index}
                    birthday={item}
                    deleteBirthDay={deleteBirthDay}/> // The map() method creates a new array with the results of calling a function for every array element.
                ))}

                {passedBirthdays.map((item,index) => ( // does an action with every item in the array
                    <Birthday 
                     key={index}
                     birthday={item}
                     deleteBirthDay={deleteBirthDay}/> // The map() method creates a new array with the results of calling a function for every array element.
                ))}

            </ScrollView>
            ): (<AddBirthday user={user} setShowList={setShowList} setReloadData={setReloadData} />)}

        <ActionBar showList={showList} setShowList={setShowList} />
    </View>
    )
};

const styles = StyleSheet.create({
   container:{
       alignItems : "center",
       height : "100%"
   },
   scrollView: {
    marginBottom: 50,
    width: '100%',
  },
})
