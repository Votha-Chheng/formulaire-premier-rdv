import { View } from 'react-native';
import React, { FC } from 'react';
import SubTitles from './SubTitles';
import CheckBoxComponent from './CheckboxComponent';
import { globalStyles } from '../globalStyles';
import RadioComponent from './RadioComponent';
import Label from './Label';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addRadioItem } from '../utils';
import { getMomentsBrossageDents, getRythmeChangementBrosseAdent, getTypeBrosseADent, getUtilisationFilDentaireBrossette } from '../store/adultState/hygieneDentaireInfo';
import MultipleRadioComponent from './MultipleRadioComponent';

const HygieneDentaire: FC = () => {
  
  const { typeBrosseADent, momentsBrossageDents, rythmeChangementBrosseAdent, utilisationFilDentaireBrossette } = useSelector((state: RootState) => state.hygienDentaireInfo)

  const dispatch = useDispatch()

  const rythmeChangementBrosseArray = ["Plus d'une fois par semaine", "Une fois par semaine", "Une à deux fois par mois", "Une à deux fois tous les 3 mois", "Au-delà de 3 mois"]

  return (
    <View style={globalStyles.container}>
      <SubTitles title="HYGIÈNE DENTAIRE" />
      <View style={{marginVertical:20}}>
        <Label
          question="Quel type de brosse à dent utilisez-vous ?"
          statement={typeBrosseADent}
        />
        <CheckBoxComponent title="Dure" maladies={typeBrosseADent} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getTypeBrosseADent}/>
        <CheckBoxComponent title="Medium" maladies={typeBrosseADent} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getTypeBrosseADent}/>
        <CheckBoxComponent title="Souple" maladies={typeBrosseADent} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getTypeBrosseADent}/>
      </View>
      <View style={{marginVertical:20}}>
        <Label
          question="À quel(s) moment(s) de la journée vous brossez-vous les dents ?"
          statement={momentsBrossageDents}
        />
        <CheckBoxComponent title="Matin" maladies={momentsBrossageDents} handleChangeValues={addRadioItem}  dispatcher={dispatch} reducerFromStore={getMomentsBrossageDents}/>
        <CheckBoxComponent title="Midi" maladies={momentsBrossageDents} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMomentsBrossageDents}/>
        <CheckBoxComponent title="Soir" maladies={momentsBrossageDents} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMomentsBrossageDents}/>
      </View>
      <View style={{marginTop:25}}>
        <Label
          question="À quel rythme changez-vous de brosse à dents environ ?"
          statement={rythmeChangementBrosseAdent}
        />
        <View>
          {
            rythmeChangementBrosseArray.map((choix, index) =>(
              <View key={index.toString()}>
                <MultipleRadioComponent
                  choix = {choix} 
                  valueState = {rythmeChangementBrosseAdent}
                  dispatcher = {dispatch}
                  reducerFromStore = {getRythmeChangementBrosseAdent}
                />
              </View>  
            ))
          }
        </View>
      </View>

      <View style={{marginTop:25}}>
        <Label
          question="Utilisez-vous le fil de soie dentaire ou les brossettes inter-dentaires ?"
          statement={utilisationFilDentaireBrossette}
        />
        <RadioComponent
          valueState ={utilisationFilDentaireBrossette}
          setValueToTrue={()=>dispatch(getUtilisationFilDentaireBrossette(true)) }
          setValueToFalse={()=>dispatch(getUtilisationFilDentaireBrossette(false)) }
        />
      </View>
    </View>
  );
};

export default HygieneDentaire;