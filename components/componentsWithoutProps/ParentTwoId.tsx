import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import SubTitles from '../componentsWithProps/SubTitles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Checkbox } from 'react-native-paper'
import { getParentTwo } from '../../store/childState/identityAccompagnant'
import InfoParent from '../componentsWithProps/InfoParent'
import { globalStyles } from '../../globalStyles'

const ParentTwoId: FC = () => {

  const {responsablesParents, parentTwoOuiNon, parentTwo} = useSelector((state: RootState) => state.identityAccompagnant)

  const [checked, setChecked] = useState<boolean>(false)

  const dispatch = useDispatch()

  return (
    <View>
      <SubTitles title={`${responsablesParents !== undefined && responsablesParents === true ? "PARENT 2 ": "RESPONSABLE LÉGAL 2"}`} />
      <View style={[globalStyles.flexRow, {alignItems: 'flex-start'}]}>
        <Text style={[globalStyles.label, {width:'95%'} ]} >Cochez cette case si vous n'êtes pas en mesure de fournir les informations du second parent</Text>
        <View style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginTop:5 }}>
          <Checkbox
          
            status={checked ? 'checked' : 'unchecked'}
            color="orange"
            onPress={() => {
              setChecked(!checked)
              if(!checked){
                dispatch(getParentTwo("Je ne suis pas en mesure de donner les informations relatives au parent 2 de l'enfant."))

              } else {
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
              }
            }}
          />
        </View>
        
      </View>
        {
          parentTwoOuiNon == true && typeof(parentTwo) !== 'string' && parentTwo !== null && parentTwo !== undefined &&
          <InfoParent whichParent={parentTwo} reducerFromStore={getParentTwo} />
        }
    </View>
  )
}

export default ParentTwoId

const styles = StyleSheet.create({})