import { Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { globalStyles } from '../../globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenProps } from '../../screens/HomeScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ValidationQuestionnaire: FC = () => {

  const {identity, consultationInfo, dentsInfo, diversInfo, esthetiqueInfo, gencivesInfo, habitudesInfo, hygienDentaireInfo, machoireInfo, medicalHistory} = useSelector((state: RootState) => state)

  const [questionsRestantes, setQuestionsRestantes] = useState(0)

  const navigation = useNavigation<HomeScreenProps>()

  const countUndefinedState = (objectToScan: any): number=>{
    let arrayStatesWithUndefined = 0

    for (let value in objectToScan){
      if(objectToScan[value] === undefined){
        arrayStatesWithUndefined++
      }
    }

    return arrayStatesWithUndefined
  }

  useEffect(()=>{
    const totalUndefined = countUndefinedState(identity) + countUndefinedState(medicalHistory) + countUndefinedState(dentsInfo) + countUndefinedState(consultationInfo) + countUndefinedState(gencivesInfo) +countUndefinedState(machoireInfo) + countUndefinedState(hygienDentaireInfo) + countUndefinedState(habitudesInfo) + countUndefinedState(esthetiqueInfo) + countUndefinedState(diversInfo) 

    setQuestionsRestantes(totalUndefined)
    console.log(totalUndefined)
    
  }, [identity, medicalHistory, dentsInfo, consultationInfo, gencivesInfo, machoireInfo, hygienDentaireInfo, habitudesInfo, esthetiqueInfo, diversInfo])

  const searchPatienteleInAsyncStorage = async(): Promise<string|null|undefined>=>{
    try{
      const arrayPatienteleJSON = await AsyncStorage.getItem('Patientèle')

      if(arrayPatienteleJSON!==null){
        return arrayPatienteleJSON

      } else {
        return null

      }
      
    } catch (error){
      console.log(error)

    }
  }

  const saveAsyncStorageInJSON = async ()=>{
    try {
      const values = {isAdult: true, ...identity, ...medicalHistory, ...dentsInfo, ...consultationInfo, ...gencivesInfo, ...machoireInfo, ...hygienDentaireInfo, ...habitudesInfo, ...esthetiqueInfo, ...diversInfo}

      const resultPatientele = await searchPatienteleInAsyncStorage()

      if(resultPatientele!==null && resultPatientele!==undefined){
        const arrayPatientele = JSON.parse(resultPatientele)
      
        const newArray = [...arrayPatientele, values]

        const newArrayToJSON = JSON.stringify(newArray)

        await AsyncStorage.setItem("Patientèle", newArrayToJSON)

        navigation.navigate("Merci")
        
        return

      } else {

        const newArrayPatientele = [values]

        const newArrayToJSON = JSON.stringify(newArrayPatientele)

        await AsyncStorage.setItem("Patientèle", newArrayToJSON)

        navigation.navigate("Merci")

        console.log(values)

        return
      }
    } catch(error){
      console.log(error)
      
      return

    }
  }

  return (
    <View style={[globalStyles.container, {alignItems:"center", marginVertical:30}]}>
      {
        questionsRestantes>0 ?
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
          <Text style={[globalStyles.label, {marginBottom:-10}]}>
            Il reste encore
          </Text>
          <Text style={[globalStyles.label, {color:"red", marginBottom:-10}]}>
            {questionsRestantes.toString()} questions en rouge.
          </Text>
          <Text style={[globalStyles.label, {textAlign:"center"}]}>
            Veuillez s'il vous plaît remonter à ces questions pour y répondre.
          </Text>
        </View>
        :
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
          <Text style={[globalStyles.label, {marginBottom:-10}]}>
            Vous pouvez maintenant valider le questionnaire.
          </Text>
        </View>
      }
      <Button
        mode='contained'
        dark={true}
        onPress={()=> saveAsyncStorageInJSON()}
        style={{backgroundColor:`${questionsRestantes>0 ?"grey" : "green"}`, width:600, height:50}}
        labelStyle={{fontSize:17, flex:1, justifyContent:"center", paddingHorizontal:0, color:"#fff"}}
        disabled={questionsRestantes>0 ? true : false}
      >
        {
          questionsRestantes>0 ? "Finissez le questionnaire pour valider" : "Appuyer ici pour valider le questionnaire"
        }
      </Button>
    </View>
  );
};

export default ValidationQuestionnaire;

