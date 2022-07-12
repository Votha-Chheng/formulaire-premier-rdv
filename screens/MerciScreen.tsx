import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenProps } from './HomeScreen'
import { useDispatch } from 'react-redux'
import { resetIdentity } from '../store//adultState/identity'
import { resetConsultationInfo } from '../store/adultState/consultationInfo'
import { resetDentsInfo } from '../store/adultState/dentsInfo'
import { resetDiversInfo } from '../store/adultState/diversInfo'
import { resetEsthetique } from '../store/adultState/esthetiqueInfo'
import { resetGencives } from '../store//adultState/gencives'
import { resetHabitudesInfo } from '../store//adultState/habitudesInfo'
import { resetMedicalHistory } from '../store//adultState/medicalInfo'
import { resetHygieneDentaire } from '../store//adultState/hygieneDentaireInfo'
import { resetMachoire } from '../store/adultState/machoire'

const MerciScreen:FC = () => {

  const navigation = useNavigation<HomeScreenProps>()

  const dispatch = useDispatch()

  const resetValues = ()=>{
    dispatch(resetIdentity())
    dispatch(resetConsultationInfo())
    dispatch(resetDentsInfo())
    dispatch(resetDiversInfo())
    dispatch(resetEsthetique())
    dispatch(resetGencives())
    dispatch(resetHabitudesInfo())
    dispatch(resetMedicalHistory())
    dispatch(resetHygieneDentaire())
    dispatch(resetMachoire())
  }

  useEffect(()=>{
    resetValues()
    
    setTimeout(()=>{
      navigation.navigate("Home")
    }, 10000)
  }, [navigation])

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.text}>Merci d'avoir pris le temps de remplir ce questionnaire.</Text>
      <Text style={styles.text}>Veuillez remettre la tablette à notre Assistante à l'accueil.</Text>
    </View>
  )
}

export default MerciScreen

const styles = StyleSheet.create({
  text :{
    fontSize:40, 
    fontWeight:"bold", 
    textAlign:'center', 
    padding:7.5,
    color:"#363C51"
  }
})