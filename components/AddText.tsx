import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { TextInput } from 'react-native-paper'

export type AddTextProps = {
  dispatcher: Function
  reducerFromStore: Function
  statement: string | undefined
  parentState?: boolean | undefined
  questionForLabel: string
  placeHolder: string
  parentStateShouldBe?: boolean
}

const AddText: FC<AddTextProps> = ({dispatcher, reducerFromStore, statement, parentState, questionForLabel, placeHolder, parentStateShouldBe}: AddTextProps) => {

  const onChangeText = (text: string)=>{
    if(text.length<1 && parentState===parentStateShouldBe){
      dispatcher(reducerFromStore(undefined))
    } else {
      dispatcher(reducerFromStore(text.trim()))
    }
  }
  return (
    <View style={{marginBottom:20}}>
      <Label
        question={questionForLabel}
        statement={statement}
      />
      <TextInput
        mode="outlined"
        placeholder={placeHolder}
        multiline={true}
        outlineColor={`${statement === undefined ? "red" : "grey"}`}
        activeOutlineColor={`${statement === undefined ? "red" : "grey"}`}
        onChangeText={(text)=>onChangeText(text.trim())}
      />
    </View>
  )
}

export default AddText

const styles = StyleSheet.create({})