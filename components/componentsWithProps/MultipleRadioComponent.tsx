import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { globalStyles } from '../../globalStyles';
import { RadioButton } from 'react-native-paper';

export type MultipleRadioComponentProps = {
  choix : string
  valueState : string | undefined
  dispatcher : Function 
  reducerFromStore : Function
}

const MultipleRadioComponent:FC<MultipleRadioComponentProps> = ({choix, valueState, dispatcher, reducerFromStore}: MultipleRadioComponentProps) => {
  return ( 
    <View style={[globalStyles.flexRow, {marginBottom:0}]}>
      <RadioButton
        value={choix}
        status={valueState===undefined || !valueState? 'unchecked' : valueState===choix ? 'checked' : 'unchecked' }
        onPress={()=>dispatcher(reducerFromStore(choix))}
      />
      <Text 
        style={
          valueState===undefined || valueState !== choix 
          ? 
          {fontSize: 20, color:"grey"} 
          : 
          {fontSize: 20, color:"green", fontWeight:"bold"}
        }
      >
        {choix}
      </Text>
    </View>
  )
};

export default MultipleRadioComponent;