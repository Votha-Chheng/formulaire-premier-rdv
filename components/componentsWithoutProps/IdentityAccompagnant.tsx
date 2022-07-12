import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import Label from '../componentsWithProps/Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import RadioComponent from '../componentsWithProps/RadioComponent'
import { getParentTwo, getParentTwoOuiNon, getResponsablesParents } from '../../store/childState/identityAccompagnant'
import { globalStyles } from '../../globalStyles'
import ParentOneId from './ParentOneId'
import ParentTwoId from './ParentTwoId'

const IdentityAccompagnant: FC = () => {
  const {responsablesParents, parentTwoOuiNon, parentTwo} = useSelector((state: RootState) => state.identityAccompagnant)
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
      
      
    </View>
  )
}

export default IdentityAccompagnant

const styles = StyleSheet.create({})