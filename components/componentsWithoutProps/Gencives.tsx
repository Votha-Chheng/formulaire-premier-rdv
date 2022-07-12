import { View } from 'react-native';
import React, { FC } from 'react';
import SubTitles from '../componentsWithProps/SubTitles';
import RadioComponent from '../componentsWithProps/RadioComponent';
import CheckBoxComponent from '../componentsWithProps/CheckboxComponent';
import Label from '../componentsWithProps/Label';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getDentsEcartes, getSaignementGencive, getTraitementGencive, getTraitementGencivesPar } from '../../store/adultState/gencives';
import { addRadioItem } from '../../utils';

const Gencives:FC = () => {

  const { dentsEcartes, saignementGencive, traitementGencive, traitementGencivesPar } = useSelector((state:RootState)=> state.gencivesInfo)

  const dispatch = useDispatch()

  return (
    <View style={{marginLeft:5}}>
      <SubTitles title="GENCIVES" />
      <View>
        <Label
          question="Avez-vous remarqué que vos dents se sont écartées depuis quelque temps ?"
          statement={dentsEcartes}
        />
        <RadioComponent
          valueState={dentsEcartes} 
          setValueToTrue = {()=>dispatch(getDentsEcartes(true))} 
          setValueToFalse = {()=>dispatch(getDentsEcartes(false))}
        />
      </View>
      <View>
        <Label
          question="Vos gencives saignent-elles après le brossage, voire spontanément ?"
          statement={saignementGencive}
        />
        <RadioComponent
          valueState={saignementGencive} 
          setValueToTrue = {()=>dispatch(getSaignementGencive(true))} 
          setValueToFalse = {()=>dispatch(getSaignementGencive(false))} 
        />
      </View>
      <View style={{marginBottom:5}}>
        <Label
          question="Avez-vous déjà été traité(e) pour les gencives ?"
          statement={traitementGencive}
        />
        <RadioComponent
          valueState={traitementGencive} 
          setValueToTrue = {()=>{
            dispatch(getTraitementGencive(true)) 
            dispatch(getTraitementGencivesPar(undefined))
          }} 
          setValueToFalse = {()=>{
            dispatch(getTraitementGencive(false)) 
            dispatch(getTraitementGencivesPar([]))
          }} 
        />
        {
          traitementGencive &&
          <View style={{marginTop:-25, marginBottom:30}}>
            <Label
              question="Le(s) traitement(s) a/ont été effectué(s) par "
              statement={traitementGencivesPar}
            />
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Chirurgie" maladies={traitementGencivesPar} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getTraitementGencivesPar} />
              <CheckBoxComponent title="Médicaments" maladies={traitementGencivesPar} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getTraitementGencivesPar}/>
              <CheckBoxComponent title="Détartrage" maladies={traitementGencivesPar} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getTraitementGencivesPar}/>
            </View>
          </View>
        }
      </View>
    </View>
  );
};

export default Gencives;

