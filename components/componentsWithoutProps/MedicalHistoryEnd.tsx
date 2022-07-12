import { Text, View } from 'react-native';
import React, { FC } from 'react';
import RadioComponent from '../componentsWithProps/RadioComponent';
import CheckBoxComponent from '../componentsWithProps/CheckboxComponent';
import { globalStyles } from '../../globalStyles';
import Label from '../componentsWithProps/Label';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getMedicamentsActuels, getPriseMedicamentActuelle, getSaignementInterventionAccident, getTraitementRadiations } from '../../store//adultState/medicalInfo';
import ComponentAutres from '../componentsWithProps/ComponentAutres';
import AllergiesPart from '../componentsWithoutProps/AllergiesPart';
import SmokerPart from './SmokerPart';
import PregnantPart from './PregnantPart';
import { addRadioItem } from '../../utils';
import Osteoporose from './Osteoporose';

const MedicalHistoryEnd: FC = () => {
  
  const { saignementInterventionAccident, traitementRadiations, priseMedicamentActuelle, medicamentsActuels } = useSelector((state: RootState) => state.medicalHistory)

  const {genre} = useSelector((state: RootState) => state.identity)

  const dispatch = useDispatch()


  return (
    <View style={[globalStyles.container, {marginTop:20}]}>
      <Label
        question="Avez-vous déjà eu un saignement anormal au cours d’une intervention ou d’un accident ? "
        statement={saignementInterventionAccident}
      />
      <RadioComponent 
        valueState={saignementInterventionAccident} 
        setValueToTrue = {()=>dispatch(getSaignementInterventionAccident(true))} 
        setValueToFalse = {()=>dispatch(getSaignementInterventionAccident(false))}
      />
      <Label
        question="Avez-vous subi un traitement par radiations ? "
        statement={traitementRadiations}
      />
      <RadioComponent 
        valueState={traitementRadiations} 
        setValueToTrue = {()=>dispatch(getTraitementRadiations(true))} 
        setValueToFalse = {()=>dispatch(getTraitementRadiations(false))}
      />
      <View style={{marginBottom:30}}>
        <Label
          question="Prenez-vous des médicaments en ce moment ? "
          statement={priseMedicamentActuelle}
        />
        <RadioComponent 
          valueState={priseMedicamentActuelle} 
          setValueToTrue = {()=> {
            dispatch(getPriseMedicamentActuelle(true))
            dispatch(getMedicamentsActuels(undefined))
          }} 
          setValueToFalse = {()=> {
            dispatch(getPriseMedicamentActuelle(false))
            dispatch(getMedicamentsActuels([]))
          }}
        />
      </View>
      
      {
        priseMedicamentActuelle &&
        <View>
          <Text style={[globalStyles.label, {marginTop:-25, color:`${medicamentsActuels === undefined? "red":"black"}`}]}>
            &#8227; Quel(s) médicament(s) prenez-vous ? :
          </Text>
          <View style={[globalStyles.flexRow, {alignItems:"flex-start"}]}>
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Antibiotiques" maladies={medicamentsActuels} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicamentsActuels} />
              <CheckBoxComponent title="Antihistaminiques" maladies={medicamentsActuels} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicamentsActuels}/>
              <CheckBoxComponent title="Tranquillisants" maladies={medicamentsActuels} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicamentsActuels}/>
              <CheckBoxComponent title="Aspirine" maladies={medicamentsActuels} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicamentsActuels}/>    
            </View>
            <View style={{marginHorizontal:25}}>
              <CheckBoxComponent title="Traitement pour tension artérielle" maladies={medicamentsActuels} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicamentsActuels}/>
              <CheckBoxComponent title="Cortisone" maladies={medicamentsActuels} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicamentsActuels}/>
              <CheckBoxComponent title="Insuline" maladies={medicamentsActuels} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMedicamentsActuels}/>
            </View>
          </View>
          
          <ComponentAutres stateArray={medicamentsActuels} reducerFromStore={getMedicamentsActuels} extraItem="Autre médicament" placeHolder='Médicament' />
          <Text>
            {medicamentsActuels !== undefined && medicamentsActuels.toString()}
          </Text>
        </View>  
      }
      <AllergiesPart/>
      <SmokerPart/>
      {
        genre === "Madame"
        ?
        <PregnantPart/>
        :
        null
      }
      <Osteoporose/>
    </View>
  );
};

export default MedicalHistoryEnd;
