import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SubTitles from '../componentsWithProps/SubTitles';
import { globalStyles } from '../../globalStyles';
import Label from '../componentsWithProps/Label';
import RadioComponent from '../componentsWithProps/RadioComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CheckBoxComponent from '../componentsWithProps/CheckboxComponent';
import { addRadioItem } from '../../utils';
import { getHabitudes, getMauvaiseHaleine } from '../../store/adultState/habitudesInfo';

const Habitudes = () => {

  const {habitudes, mauvaiseHaleine} = useSelector((state: RootState)=> state.habitudesInfo)

  const dispatch = useDispatch()

  return (
    <View style={globalStyles.container}>
      <SubTitles title="HABITUDES" />
      <View>
        <Label 
          question="Avez-vous eu par le passé ou avez-vous maintenant l’une des habitudes suivantes ?"
          statement={habitudes}
        />
        <CheckBoxComponent title="Sucer son pouce" maladies={habitudes} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getHabitudes} shouldBeUndefinedIfNull={false} />
        <CheckBoxComponent title="Se mordre la langue, la lèvre ou la joue" maladies={habitudes} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getHabitudes} shouldBeUndefinedIfNull={false}/>
        <CheckBoxComponent title="Jouer d’un instrument musical à vent" maladies={habitudes} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getHabitudes} shouldBeUndefinedIfNull={false} />
        <CheckBoxComponent title="Se ronger les ongles" maladies={habitudes} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getHabitudes} shouldBeUndefinedIfNull={false} />
        <CheckBoxComponent title="Mâcher un crayon, vos lunettes ou un stylo" maladies={habitudes} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getHabitudes} shouldBeUndefinedIfNull={false} />
      </View> 
      <View style={{marginTop:20}}>
        <Label 
          question="Avez-vous l’impression d’avoir une mauvaise haleine ou un mauvais goût dans la bouche ?"
          statement={mauvaiseHaleine}
        />
        <RadioComponent
          valueState ={mauvaiseHaleine}
          setValueToTrue={()=>dispatch(getMauvaiseHaleine(true))}
          setValueToFalse={()=>dispatch(getMauvaiseHaleine(false))}
        />
      </View>
    </View>
  );
};

export default Habitudes;

const styles = StyleSheet.create({
  radioComponent: {
    marginTop:-30, 
    marginLeft:20
  }
});

