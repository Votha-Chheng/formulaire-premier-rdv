import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { globalStyles } from '../../globalStyles'
import { TextInput } from 'react-native-paper'

export type LabelInputForNumberProps = {
  question: string
  statement: any
  maxLength: number

  width?: number
  onHandleChangeNumber: Function
}

const LabelInputForNumber: FC<LabelInputForNumberProps> = ({question, statement, maxLength, onHandleChangeNumber, width=300}) => {
  return (
    <View style={globalStyles.flexRow}>
      <Label
        question={question}
        statement={statement}
      />
      <TextInput
        keyboardType="numeric"  
        style={[globalStyles.input, {width, borderColor:`${statement===undefined? "grey":"green"}`}]}
        maxLength={maxLength}
        onChangeText={(text)=>onHandleChangeNumber(text)}
      />
    </View>
  )
}

export default LabelInputForNumber

const styles = StyleSheet.create({})