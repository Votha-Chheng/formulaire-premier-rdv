import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { globalStyles } from '../globalStyles'
import { displayDateNormal } from '../utils'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

export type BirthComponentProps = {
  statement: any
  reducerFromStore: Function
}

const BirthComponent:FC<BirthComponentProps> = ({statement, reducerFromStore}: BirthComponentProps) => {
  const dispatch = useDispatch()

  const showDatePickerBirth = (currentMode:any) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange : (event: any, date:any)=>{
        dispatch(reducerFromStore(date.toString()))
      },
      mode: currentMode,
      display: "spinner"
    })
  }
  return (
    <View style={globalStyles.flexRow}>
      <Text style={{marginHorizontal:10, fontSize:15, marginBottom:5, fontWeight:"bold", color :`${statement === undefined ? "red": "green"}`}}>
        {statement !== undefined && displayDateNormal(statement)}
      </Text>
      <Button style={{marginBottom:5}} color="#2086EB" labelStyle={{fontSize:12.5}} onPress={()=>showDatePickerBirth("date")} mode="contained">
        Choisir date
      </Button>
    </View>
  )
}

export default BirthComponent

const styles = StyleSheet.create({})