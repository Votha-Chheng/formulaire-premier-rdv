import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Label from '../componentsWithProps/Label'
import RadioComponent from '../componentsWithProps/RadioComponent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { getEnceinte, getMoisDeGrossesse, getPilule } from '../../store/adultState/medicalInfo'
import { globalStyles } from '../../globalStyles'
import { TextInput } from 'react-native-paper'

const PregnantPart: FC = () => {

  const {enceinte, moisDeGrossesse, pilule, osteoporose, medicOsteoporose} = useSelector((state: RootState) => state.medicalHistory)

  const dispatch = useDispatch()

  const enceinteToTrue = (): void=>{
    dispatch(getEnceinte(true))
    dispatch(getMoisDeGrossesse(undefined))
    dispatch(getPilule(false))
  }

  const enceinteToFalse = (): void=>{
    dispatch(getEnceinte(false))
    dispatch(getMoisDeGrossesse(null))
    dispatch(getPilule(undefined))
  }

  const checkMoisDeGrossesse = (text: string): void=>{
    if(enceinte === true){
      if(text.length>0){
        dispatch(getMoisDeGrossesse(text))
      } else {
        dispatch(getMoisDeGrossesse(undefined))
      }

    } else {
      dispatch(getMoisDeGrossesse(null))

    }
  }

  return (
    <View>
      <View>
        <Label
          question="Madame, êtes-vous enceinte ? "
          statement={enceinte}
        />
        <RadioComponent
          valueState={enceinte} 
          setValueToTrue = {()=>enceinteToTrue()} 
          setValueToFalse = {()=>enceinteToFalse()}
        />
      </View>

      {
        enceinte === true &&
        <View style={globalStyles.flexRow}>
          <Label
            question="Vous êtes enceinte de combien de mois ?"
            statement={moisDeGrossesse}
          />
          <TextInput
            style={[globalStyles.input, {width:40, textAlign:'center', marginTop:-10}]}
            keyboardType='numeric' 
            onChangeText={(text)=>checkMoisDeGrossesse(text)}
          />
        </View>
      }
      {
        enceinte === false &&
        <View>
          <Label
            question="Prenez-vous actuellement la pilule ?"
            statement={pilule}
          />
          <RadioComponent 
            valueState={pilule} 
            setValueToTrue = {()=>dispatch(getPilule(true))} 
            setValueToFalse = {()=>dispatch(getPilule(false))}
          />
        </View>
      }
    </View>
  )
}

export default PregnantPart

const styles = StyleSheet.create({})