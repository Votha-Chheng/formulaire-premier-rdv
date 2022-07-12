import { FC } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export type CheckBoxComponentProps = {
  title: string
  maladies : string[] | undefined
  handleChangeValues : Function
  dispatcher: Function
  reducerFromStore: Function
  shouldBeUndefinedIfNull?: boolean
}

const CheckBoxComponent: FC<CheckBoxComponentProps> = ({title, maladies, handleChangeValues, dispatcher, reducerFromStore, shouldBeUndefinedIfNull = true}: CheckBoxComponentProps) => {

  return (
    <BouncyCheckbox
      text={title}
      textStyle={{
          textDecorationLine: "none",
          fontWeight:`${maladies && maladies.includes(title)  ? "bold" : "normal" }`,
          color:`${maladies && maladies.includes(title) ? "green" : "black" }`,
          fontSize:20,
          marginTop:0,
      }}
      style={{marginVertical:5}} 
      fillColor="green" 
      iconStyle={{ borderColor: "black" }}
      onPress={(isChecked)=> handleChangeValues(isChecked, title, maladies, dispatcher, reducerFromStore, shouldBeUndefinedIfNull)}
    />
  );
};

export default CheckBoxComponent;