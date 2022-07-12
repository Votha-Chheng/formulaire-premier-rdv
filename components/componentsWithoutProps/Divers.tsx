import { View } from 'react-native';
import React, { FC } from 'react';
import SubTitles from '../componentsWithProps/SubTitles';
import { globalStyles } from '../../globalStyles';
import Label from '../componentsWithProps/Label';
import RadioComponent from '../componentsWithProps/RadioComponent';
import MultipleRadioComponent from '../componentsWithProps/MultipleRadioComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  getAnxieuxSoinsDentaires, 
  getAppareilDentaireUneFois, 
  getAutresRemarquesUtiles, 
  getAutresRemarquesUtilesOuiNon, 
  getCommentConnaissezVousLeCabinet, 
  getModifierDents, 
  getModifierDentsOuiNon, 
  getPreoccupationDents, 
  getPreoccupationDentsOuiNon } from '../../store/adultState/diversInfo';
import AddText from '../componentsWithProps/AddText';
import BooleanAndText from '../componentsWithProps/BooleanAndText';

const Divers: FC = () => {

  const {
    appareilDentaireUneFois,
    preoccupationDentsOuiNon,
    preoccupationDents,
    modifierDentsOuiNon,
    modifierDents,
    anxieuxSoinsDentaires,
    commentConnaissezVousLeCabinet,
    autresRemarquesUtilesOuiNon,
    autresRemarquesUtiles
  } = useSelector((state: RootState) => state.diversInfo)

  const dispatch = useDispatch()

  const choixLevelAnxiety: string[] = ["Pas du tout", "Un peu", "Moyennement", "Beaucoup"] 

  return (
    <View style={[globalStyles.container, {marginTop:10, marginLeft:5}]}>
      <SubTitles title="DIVERS"/>
      <View>
        <Label
          question="Avez-vous déjà porté un appareil ou des bagues pour redresser vos dents ?"
          statement={appareilDentaireUneFois}
        />
        <RadioComponent
          valueState={appareilDentaireUneFois}
          setValueToTrue={()=>dispatch(getAppareilDentaireUneFois(true))}
          setValueToFalse={()=>dispatch(getAppareilDentaireUneFois(false))}
        />
      </View>

      <BooleanAndText
        booleanState={preoccupationDentsOuiNon}
        childState={preoccupationDents}
        reducerFromStoreBoolean={getPreoccupationDentsOuiNon}
        reducerFromStore={getPreoccupationDents}
        question="Avez-vous des préoccuppations particulières concernant vos dents ?"
        label="Quelles sont ces préoccupations ? "
        placeHolder="Décrivez ici toutes ces préocuppations..."
      />

      <BooleanAndText
        booleanState={modifierDentsOuiNon}
        childState={modifierDents}
        reducerFromStoreBoolean={getModifierDentsOuiNon}
        reducerFromStore={getModifierDents}
        question="Idéalement, aimeriez-vous modifier quelque chose dans votre bouche ? "
        label="Quelles modifications aimeriez-vous apporter dans votre bouche ?"
        placeHolder="Décrivez ici toutes les modifications souhaitées..."
      />

      <View style={{marginBottom:20}} >
        <Label
          question="Êtes-vous anxieuse/anxieux à l’idée de réaliser des soins dentaires ?"
          statement={anxieuxSoinsDentaires}
        />
        {
          choixLevelAnxiety.map((choix, index)=>(
            <View key={index.toString()}>
              <MultipleRadioComponent
                choix={choix}
                valueState={anxieuxSoinsDentaires}
                dispatcher={dispatch}
                reducerFromStore={getAnxieuxSoinsDentaires}
              />
            </View>
          ))
        }
      </View>

      <AddText
        dispatcher={dispatch}
        reducerFromStore={getCommentConnaissezVousLeCabinet}
        statement={commentConnaissezVousLeCabinet}
        questionForLabel="Comment avez-vous connu le cabinet ?"
        placeHolder="Décrivez ici comment vous avez connu le cabinet..."
      />

      <BooleanAndText
        booleanState={autresRemarquesUtilesOuiNon}
        childState={autresRemarquesUtiles}
        reducerFromStoreBoolean={getAutresRemarquesUtilesOuiNon}
        reducerFromStore={getAutresRemarquesUtiles}
        question="Avez-vous des remarques utiles à nous faire passer ?"
        label="Quelles sont ces remarques ?"
        placeHolder="Décrivez ici vos remarques..."
      />
    </View>
  );
};

export default Divers;
