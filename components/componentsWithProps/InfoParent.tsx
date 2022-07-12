import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LabelInputForObject from './LabelInputForObject'
import { Parent } from '../../store/childState/identityAccompagnant'
import LabelInputForNumber from './LabelInputForNumber'
import Label from './Label'
import RadioComponent from './RadioComponent'
import { globalStyles } from '../../globalStyles'
import { TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'

export type InfoParentProps = {
  whichParent : Parent
  reducerFromStore : Function
}

const InfoParent:FC<InfoParentProps> = ({whichParent, reducerFromStore}) => {

  const dispatch = useDispatch()

  const onValidateNumber = (text: string): void=>{
    if(text.startsWith("0") && text.length === 10){
      dispatch(reducerFromStore({...whichParent, tel:text.trim()}))
    } else {
      dispatch(reducerFromStore({...whichParent, tel:undefined}))
    }
  }

  const onValidateEmail = (text: string): void=>{
    if(text.includes("@") && text.includes(".")){
      dispatch(reducerFromStore({...whichParent, email: text.trim()}))
    } else {
      dispatch(reducerFromStore({...whichParent, email: undefined}))
    }
  }

  return (
    <View>
      <LabelInputForObject
        statement = {whichParent.nom}
        question = "Nom"
        reducerFromStore = {reducerFromStore}
        obj={whichParent}
        keyValue="nom"
        flexRow={true}
      />
      <LabelInputForObject
        statement = {whichParent.prenom}
        question = "Prénom"
        reducerFromStore = {reducerFromStore}
        obj={whichParent}
        keyValue="prenom"
        flexRow={true}
      />

      <LabelInputForNumber
        statement={whichParent.tel}
        question="Numéro de téléphone" 
        onHandleChangeNumber={(text: string)=>onValidateNumber(text.trim())}
        maxLength={10}
      />

      <View>
        <Label
          question="Avez-vous une adresse e-mail ?"
          statement={whichParent.emailOuiNon}
        />
        <RadioComponent
          valueState={whichParent.emailOuiNon}
          setValueToTrue={()=>{
            dispatch(reducerFromStore({...whichParent, emailOuiNon: true, email: undefined}))
          }}
          setValueToFalse={()=>{
            dispatch(reducerFromStore({...whichParent, emailOuiNon: false, email: null}))
          }}
        />
      </View>

      {
        whichParent.emailOuiNon === true &&
        <View style={globalStyles.flexRow}>
          <Label
            question="E-mail "
            statement={whichParent.email}
          />
          <TextInput 
            keyboardType="email-address" 
            autoCapitalize='none'
            style={[globalStyles.input, {borderColor:`${whichParent.email===undefined? "grey":"green"}`, width:300}]}
            onChangeText={(text)=>onValidateEmail(text.trim())}
          />
      </View>
      }

    <View style={{marginBottom:20}}>
      <LabelInputForObject
        question="Profession (écrire 'Aucune' si sans profession)"
        statement={whichParent.profession}
        reducerFromStore={reducerFromStore}
        flexRow={false}
        obj={whichParent}
        keyValue="profession"
        width={500}
      />
    </View>
    </View>
  )
}

export default InfoParent

const styles = StyleSheet.create({})