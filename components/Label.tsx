import { Text } from 'react-native';
import React, { FC } from 'react';
import { globalStyles } from '../globalStyles';

export type LabelProps = {
  question: string | null | undefined
  statement: any
  isArray?: boolean
  conditional?: boolean
}

const Label: FC<LabelProps> = ({question, statement, isArray, conditional}: LabelProps) => {
  return (
    <Text style={ 
      isArray && conditional
      ? 
      [globalStyles.label, {color:`${statement === undefined ? "red":"black"}`}]
      :
      isArray && !conditional 
      ?
      [globalStyles.label, {color:`${statement !== undefined && statement.length<1 ? "red":"black"}`}]
      : 
      [globalStyles.label, {color:`${statement===undefined ? "red":"black"}`}]
    }>
      &#8227; {question} :
    </Text>
  );
};

export default Label;