import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import SubTitles from './SubTitles'
import { getParentOne } from '../store/childState/identityAccompagnant'
import LabelInputForObject from './LabelInputForObject'
import { globalStyles } from '../globalStyles'
import { TextInput } from 'react-native-paper'
import LabelInputForNumber from './LabelInputForNumber'
import RadioComponent from './RadioComponent'
import InfoParent from './InfoParent'

const ParentOneId: FC = () => {

  const {parentOne, responsablesParents} = useSelector((state: RootState) => state.identityAccompagnant)

  const dispatch = useDispatch()

  // const onValidateNumber = (text: string): void=>{
  //   if(text.startsWith("0") && text.length === 10){
  //     dispatch(getParentOne({...parentOne, tel:text.trim()}))
  //   } else {
  //     dispatch(getParentOne({...parentOne, tel:undefined}))
  //   }
  // }

  // const onValidateEmail = (text: string): void=>{
  //   if(text.includes("@") && text.includes(".")){
  //     dispatch(getParentOne({...parentOne, email: text.trim()}))
  //   } else {
  //     dispatch(getParentOne({...parentOne, email: undefined}))
  //   }
  // }

  return (
    <View>
      <SubTitles title={`${responsablesParents !== undefined && responsablesParents === true ? "PARENT 1" : "RESPONSABLE LÉGAL 1"}`} />
      <InfoParent whichParent={parentOne} reducerFromStore={getParentOne} />
      {/* <LabelInputForObject
        statement = {parentOne.nom}
        question = "Nom"
        reducerFromStore = {getParentOne}
        obj={parentOne}
        keyValue="nom"
        flexRow={true}
      />
      <LabelInputForObject
        statement = {parentOne.prenom}
        question = "Prénom"
        reducerFromStore = {getParentOne}
        obj={parentOne}
        keyValue="prenom"
        flexRow={true}
      />

      <LabelInputForNumber
        statement={parentOne.tel}
        question="Numéro de téléphone" 
        onHandleChangeNumber={(text: string)=>onValidateNumber(text.trim())}
        maxLength={10}
        minLengthInput={9}
      />

      <View>
        <Label
          question="Avez-vous une adresse e-mail ?"
          statement={parentOne.emailOuiNon}
        />
        <RadioComponent
          valueState={parentOne.emailOuiNon}
          setValueToTrue={()=>{
            dispatch(getParentOne({...parentOne, emailOuiNon: true, email: undefined}))
          }}
          setValueToFalse={()=>{
            dispatch(getParentOne({...parentOne, emailOuiNon: false, email: null}))
          }}
        />
      </View>

      {
        parentOne.emailOuiNon === true &&
        <View style={globalStyles.flexRow}>
          <Label
            question="E-mail "
            statement={parentOne.email}
          />
          <TextInput 
            keyboardType="email-address" 
            autoCapitalize='none'
            style={[globalStyles.input, {borderColor:`${parentOne.email===undefined? "grey":"green"}`, width:300}]}
            onChangeText={(text)=>onValidateEmail(text.trim())}
          />
      </View>
      }

      <View style={{marginBottom:20}}>
        <LabelInputForObject
          question="Profession (écrire 'Aucune' si vous n'en avez pas) "
          statement={parentOne.profession}
          reducerFromStore={getParentOne}
          flexRow={false}
          obj={parentOne}
          keyValue="profession"
          width={500}
        />
      </View> */}
    </View>
  )
}

export default ParentOneId