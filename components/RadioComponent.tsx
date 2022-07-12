import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { RadioButton } from 'react-native-paper';
import { globalStyles } from '../globalStyles';

export type RadioComponentProps = {
  valueState: boolean | undefined
  setValueToTrue: Function,
  setValueToFalse: Function
}

const RadioComponent: FC<RadioComponentProps> = ({valueState, setValueToTrue, setValueToFalse}: RadioComponentProps) => {

  return (
    <View style={globalStyles.flexRow}>
      <View style={globalStyles.flexRow}>
        <RadioButton
          value="OUI"
          status={valueState===undefined? 'unchecked' : valueState ? 'checked' : 'unchecked' }
          onPress={()=>setValueToTrue()}
        />
        <Text 
          style={valueState===undefined || !valueState ? {fontSize: 20, color:"grey"} : {fontSize: 20, color:"green", fontWeight:"bold"}}
        >
          OUI
        </Text>
      </View>
      <View style={[globalStyles.flexRow, {marginLeft:15}]}>
        <RadioButton
          value="NON"
          status={valueState===undefined? 'unchecked' : !valueState ? 'checked' : 'unchecked' }
          onPress={()=> setValueToFalse()}
        />
        <Text 
          style={valueState===undefined || valueState ? {fontSize: 20, color:"grey"} : {fontSize: 20, color:"green", fontWeight:"bold"}}
        >
          NON
        </Text>
      </View>
    </View>
  );
};

export default RadioComponent;