import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import Label from '../componentsWithProps/Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { getMedicOsteoporose, getOsteoporose } from '../../store/adultState/medicalInfo'
import RadioComponent from '../componentsWithProps/RadioComponent'
import CheckBoxComponent from '../componentsWithProps/CheckboxComponent'
import { addRadioItem } from '../../utils'

const Osteoporose: FC = () => {
  const {osteoporose, medicOsteoporose} = useSelector((state: RootState) => state.medicalHistory)

  const dispatch = useDispatch()

  const osteoporoseToTrue = ()=>{
    dispatch(getOsteoporose(true))
    dispatch(getMedicOsteoporose(undefined))
  }

  const osteoporoseToFalse = ()=>{
    dispatch(getOsteoporose(false))
    dispatch(getMedicOsteoporose([]))
  }

  return (
    <View>
    <Label
      question="Prenez-vous actuellement un traitement contre l'ostéoporose ou une maladie osseuse ? "
      statement={osteoporose}
    />
    <RadioComponent
      valueState={osteoporose} 
      setValueToTrue = {()=>osteoporoseToTrue()} 
      setValueToFalse = {()=>osteoporoseToFalse()}
    />
    {
      osteoporose === true &&
      <View style={{marginBottom:50}}>
        <Label
          question="Quels types de médicaments contre l'ostéoporose prenez-vous ? "
          statement={medicOsteoporose}
        />
        <View style={{marginHorizontal:25}}>
          <CheckBoxComponent title="Hormones" maladies={medicOsteoporose} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicOsteoporose} />
          <CheckBoxComponent title="Œstrogènes" maladies={medicOsteoporose} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicOsteoporose} />
          <CheckBoxComponent title="Biphosphonate" maladies={medicOsteoporose} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicOsteoporose} />
        </View>
      </View>
    }
    </View>
  )
}

export default Osteoporose

const styles = StyleSheet.create({})