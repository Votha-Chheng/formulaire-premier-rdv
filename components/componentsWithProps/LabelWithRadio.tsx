import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import RadioComponent from './RadioComponent'
import { useDispatch } from 'react-redux'

export type LabelWithRadioProps = {
  statementForLabel: any
  questionForLabel: string
  reducerFromStore: Function
}

const LabelWithRadio: FC<LabelWithRadioProps> = ({statementForLabel, questionForLabel, reducerFromStore}) => {

  const dispatch = useDispatch()

  return (
    <View>
      <Label
          statement={statementForLabel}
          question={questionForLabel}
        />
      <RadioComponent
        valueState={statementForLabel}
        setValueToTrue = {()=>{dispatch(reducerFromStore(true))}}
        setValueToFalse = {()=>{dispatch(reducerFromStore(false))}}
      />
    </View>
  )
}

export default LabelWithRadio