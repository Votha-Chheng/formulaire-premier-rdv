import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import RadioComponent from './RadioComponent'
import { globalStyles } from '../globalStyles'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getCigarettesParJour, getFumeur } from '../store/adultState/medicalInfo'

const SmokerPart: FC = () => {

  const {fumeur, cigarettesParJour} = useSelector(((state: RootState) => state.medicalHistory))

  const dispatch = useDispatch()

  const smokerToTrue = (): void => {
    dispatch(getFumeur(true))
    dispatch(getCigarettesParJour(undefined))
  }

  const smokerToFalse = (): void => {
    dispatch(getFumeur(false))
    dispatch(getCigarettesParJour(null))
  }

  const checkNumberCig = ()=>{
    if(fumeur === true){
      if(cigarettesParJour === ""){
        dispatch(getCigarettesParJour(undefined))
      }
    }
  }

  return (
    <View>
    <Label
      question="&Ecirc;tes-vous fumeur ?"
      statement={fumeur}
    />
    <RadioComponent 
      valueState={fumeur} 
      setValueToTrue = {()=>smokerToTrue()} 
      setValueToFalse = {()=>smokerToFalse()}
    />
    {
      fumeur &&
      <View style={globalStyles.flexRow}>
        <Label
          question="Combien de cigarettes fumez-vous par jour environ ? "
          statement={cigarettesParJour}
        />
        <TextInput
          style={[globalStyles.input, {width:40, textAlign:'center', marginTop:-10}]}
          keyboardType='numeric' 
          onChangeText={(text)=>dispatch(getCigarettesParJour(text))}
          onBlur = {()=> checkNumberCig()}
        />
      </View>
    }  
  </View>
  )
}

export default SmokerPart

const styles = StyleSheet.create({})