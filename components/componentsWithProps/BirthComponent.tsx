import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { globalStyles } from '../../globalStyles'
import { displayDateNormal } from '../../utils'
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
      onChange : (event: any, statement:any)=>{
        dispatch(reducerFromStore(statement.toString()))
      },
      mode: currentMode,
      display: "spinner"
    })
  }
  return (
    <View style={[globalStyles.flexRow, {marginTop:10, alignSelf:'flex-end'}]}>
      <Text style={{marginHorizontal:10, fontSize:15, marginBottom:5, fontWeight:"bold", color :`${statement === undefined ? "red": "green"}`}}>
        {statement !== undefined && displayDateNormal(statement)}
      </Text>
      <Button style={{marginTop:0}} color="#2086EB" labelStyle={{fontSize:12.5}} onPress={()=>showDatePickerBirth("date")} mode="contained">
        Choisir date
      </Button>
    </View>
  )
}

export default BirthComponent

const styles = StyleSheet.create({})