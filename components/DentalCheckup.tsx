import { Text, View } from 'react-native';
import React, { FC } from 'react';
import RadioComponent from './RadioComponent';
import {globalStyles} from '../globalStyles';
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { displayDateNormal } from '../utils';
import { Button } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { getDateDernierExamDentaire, getDifficulteDentiste, getListeDifficulteDentiste, getMotifConsultation } from '../store/adultState/consultationInfo';
import ComponentAutres from './ComponentAutres';
import AddText from './AddText';

const DentalCheckup: FC = () => {

  const {dateDernierExamDentaire, motifConsultation, difficulteDentiste, listeDifficulteDentiste} = useSelector((state: RootState)=> state.consultationInfo)

  const dispatch = useDispatch()

  const showDatePicker = (currentMode:any) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event: any, date:any)=>{
        dispatch(getDateDernierExamDentaire(date.toString()))
      },
      mode: currentMode,
      display: "spinner"
    })
  }

  return (
    <View style={[globalStyles.container, {marginTop:10}]}>
      <View style={{marginBottom:20}}>
        <Label
          question="À quand remonte votre dernier examen dentaire ? (À quelques semaines près)"
          statement={dateDernierExamDentaire}
        />
        <View style={[globalStyles.flexRow, {height: 70, alignItems:"center"}]}>
        <Text style={{marginHorizontal:10, fontSize:15, marginBottom:5, fontWeight:"bold"}}>
          {dateDernierExamDentaire !== undefined && displayDateNormal(dateDernierExamDentaire)}
        </Text>
        <Button style={{marginBottom:5}} color="#2086EB" labelStyle={{fontSize:12}} onPress={()=>showDatePicker("date")} mode="contained">
          Choisir date
        </Button>
      </View>
      </View>

      <AddText
        dispatcher={dispatch}
        reducerFromStore={getMotifConsultation}
        statement={motifConsultation}
        questionForLabel="Quel est le motif de votre consultation aujourd'hui ?"
        placeHolder="Motif de la consultation..."
      />
      <View>
        <Label
          question="Lors de vos précédentes visites chez le dentiste avez-vous rencontré des difficultés particulières ? "
          statement={difficulteDentiste}
        />
        <RadioComponent 
          valueState={difficulteDentiste} 
          setValueToTrue = {()=>{
            dispatch(getDifficulteDentiste(true))
            dispatch(getListeDifficulteDentiste(undefined))
          }} 
          setValueToFalse = {()=>{
            dispatch(getDifficulteDentiste(false))
            dispatch(getListeDifficulteDentiste([]))
          }}
        />
      </View>

      {
        (difficulteDentiste || listeDifficulteDentiste === undefined) &&
        <ComponentAutres 
          stateArray={listeDifficulteDentiste} 
          reducerFromStore={getListeDifficulteDentiste} 
          extraItem="Quelle difficulté avez-vous rencontré ?" 
          placeHolder='Difficulté rencontrée' 
        />
      }
    </View>
  );
};

export default DentalCheckup;

