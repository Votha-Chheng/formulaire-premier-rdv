import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { globalStyles } from '../globalStyles'
import Label from './Label'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { onValidateLengthInput, displayDateNormal } from '../utils'
import { getChangementEtatSante, getDateDernierExamen, getMedecinTraitant } from '../store/adultState/medicalInfo'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import RadioComponent from './RadioComponent'
import DiseasesCheckboxes from './DiseasesCheckbox'
import MedicalHistoryEnd from './MedicalHistoryEnd'

const MedicalHistoryPart:FC = () => {

  const {
    medecinTraitant,
    dateDernierExamen,
    changementEtatSante

  } = useSelector((state: RootState) => state.medicalHistory)

  const dispatch = useDispatch()

  const showLastExamDatePicker = (currentMode:any) => {
    DateTimePickerAndroid.open({
      value: new Date() ,
      onChange: (event: any, date:any)=>{
        dispatch(getDateDernierExamen(date.toString()))
      },
      mode: currentMode,
      display: "spinner"
    })
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{marginVertical:15}}>
        <Label
          question='Nom du médecin traitant (si aucun, écrire "Aucun")'
          statement={medecinTraitant}
        />
        <View style={[globalStyles.flexRow, {marginLeft:15}]}>
          <Text style={{fontSize:20, fontWeight:"bold", marginRight:5}}>Dr.</Text>
          <TextInput 
            onChangeText={(name)=>onValidateLengthInput(0, dispatch, getMedecinTraitant, name)}
            style={[globalStyles.input, {borderColor:`${medecinTraitant===undefined? "grey":"green"}`, width:300}]} 
          />
        </View>
      </View>

      <View style={{marginBottom:20}}>
        <Label
          question="Date du dernier examen médical (à quelques semaines près) "
          statement={dateDernierExamen}
        />
        <View style={[globalStyles.flexRow, {marginLeft: 15}]}>
          <Button style={{marginBottom:5}} color="#2086EB" labelStyle={{fontSize:12}} onPress={()=>showLastExamDatePicker("date")} mode="contained">
            Choisir date
          </Button>
          <Text style={{marginHorizontal:10, fontSize:17.5, marginBottom:5, fontWeight:"bold", color:`${dateDernierExamen !== undefined ? "green" : "red" }`}}>
            {dateDernierExamen !== undefined && displayDateNormal(dateDernierExamen)}
          </Text>
        </View>
      </View>

      <View>
        <Label
          question="Avez-vous connu des changements dans votre état de santé depuis un an ? "
          statement={changementEtatSante}
        />
        <RadioComponent
          valueState ={changementEtatSante}
          setValueToTrue={()=>dispatch(getChangementEtatSante(true))}
          setValueToFalse={()=>dispatch(getChangementEtatSante(false))}
        />
      </View>

      <DiseasesCheckboxes/>

      <MedicalHistoryEnd/>

    </SafeAreaView>
  )
}

export default MedicalHistoryPart

const styles = StyleSheet.create({})