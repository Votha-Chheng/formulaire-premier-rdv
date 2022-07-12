import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import Label from '../componentsWithProps/Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import RadioComponent from '../componentsWithProps/RadioComponent'
import { getParentTwo, getParentTwoOuiNon, getResponsablesParents, getSituationFamiliale } from '../../store/childState/identityAccompagnant'
import { globalStyles } from '../../globalStyles'
import ParentOneId from './ParentOneId'
import ParentTwoId from './ParentTwoId'
import MultipleRadioComponent from '../componentsWithProps/MultipleRadioComponent'

const IdentityAccompagnant: FC = () => {
  const {responsablesParents, parentTwoOuiNon, situationFamiliale} = useSelector((state: RootState) => state.identityAccompagnant)
  const dispatch = useDispatch()

  return (
    <View style={globalStyles.container}>
      <View>
        <Label
          statement={responsablesParents}
          question="Les responsables légaux de l'enfant sont-ils les parents ou parents adoptifs de l'enfant ?"
        />
        <RadioComponent
          valueState={responsablesParents}
          setValueToFalse={()=>{
            dispatch(getResponsablesParents(false))
          }}
          setValueToTrue={()=>{
            dispatch(getResponsablesParents(true))
          }}
        />
      </View>
      
      <View>
        <Label
          statement={parentTwoOuiNon}
          question="L'enfant a-t-il 2 représentants légaux ?"
        />
        <RadioComponent
          valueState={parentTwoOuiNon}
          setValueToFalse={()=>{
            dispatch(getParentTwoOuiNon(false))
            dispatch(getParentTwo(null))
          }}
          setValueToTrue={()=>{
            dispatch(getParentTwoOuiNon(true))
            dispatch(getParentTwo(
              {
                nom: undefined, //
                prenom: undefined, //
                tel: undefined, //
                emailOuiNon: undefined,
                email:"" ,
                profession: undefined, //
              }
            ))
          }}
        />
      </View>

      <ParentOneId/>
      {
        parentTwoOuiNon === true &&
        <ParentTwoId/>
      }

      <View style={{marginBottom:30}}>
        <Label
          statement={situationFamiliale}
          question="Quelle est la situation familiale de l'enfant ? "
        />
        <MultipleRadioComponent choix="Vit en permanence avec ses deux parents" valueState={situationFamiliale} dispatcher={dispatch} reducerFromStore={getSituationFamiliale}/>
        <MultipleRadioComponent choix="Garde alternée" valueState={situationFamiliale} dispatcher={dispatch} reducerFromStore={getSituationFamiliale}/>
        <MultipleRadioComponent choix="Vit en permanence avec un seul de ses parents" valueState={situationFamiliale} dispatcher={dispatch} reducerFromStore={getSituationFamiliale}/>
        <MultipleRadioComponent choix="Ne vit pas au domicile du/des parent(s)" valueState={situationFamiliale} dispatcher={dispatch} reducerFromStore={getSituationFamiliale}/>
        <MultipleRadioComponent choix="Autre" valueState={situationFamiliale} dispatcher={dispatch} reducerFromStore={getSituationFamiliale}/>
      </View>
      
    </View>
  )
}

export default IdentityAccompagnant

const styles = StyleSheet.create({})