import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { useDispatch } from 'react-redux'
import RadioComponent from './RadioComponent'
import AddText from './AddText'

export type BooleanAndTextProps = {
  booleanState: boolean|undefined
  childState: string | undefined
  reducerFromStoreBoolean: Function
  reducerFromStore: Function
  question: string
  label: string
  placeHolder: string
}

const BooleanAndText: FC<BooleanAndTextProps> = ({booleanState, childState, reducerFromStoreBoolean, reducerFromStore, question, label, placeHolder}: BooleanAndTextProps) => {

  const dispatch = useDispatch()

  return (
    <View>
      <View>
        <Label
          question={question}
          statement={booleanState}
        />
        <RadioComponent
          valueState={booleanState}
          setValueToTrue={()=>{
            dispatch(reducerFromStoreBoolean(true))
            dispatch(reducerFromStore(undefined))
          }}
          setValueToFalse={()=>{
            dispatch(reducerFromStoreBoolean(false))
            dispatch(reducerFromStore(""))
          }}
        />
      </View>
      {
        booleanState === true &&
        <AddText
          dispatcher={dispatch}
          reducerFromStore={reducerFromStore}
          statement={childState}
          parentState={booleanState}
          parentStateShouldBe={true}
          questionForLabel={label}
          placeHolder={placeHolder}
        />
      }
    </View>
  )
}

export default BooleanAndText

const styles = StyleSheet.create({})