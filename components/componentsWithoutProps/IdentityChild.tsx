import { SafeAreaView, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { globalStyles } from '../../globalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { TextInput } from 'react-native-paper'
import { onValidateLengthInput } from '../../utils'
import { getAdresse, getCodePostal, getDateDeNaissance, getDateRdv, getFratrie, getHobbies, getNbreFrereSoeur, getNiveauScolaire, getNom, getPlace, getPrenom, getTelEnfant, getVille } from '../../store/childState/identityChild'
import Label from '../componentsWithProps/Label'
import RadioComponent from '../componentsWithProps/RadioComponent'
import MultipleRadioComponent from '../componentsWithProps/MultipleRadioComponent'
import ComponentAutres from '../componentsWithProps/ComponentAutres'
import BirthComponent from '../componentsWithProps/BirthComponent'
import LabelInputForText from '../componentsWithProps/LabelInputFortText'

const IdentityChild:FC = () => {

  const {
    dateRdv,
    nom,
    prenom,
    dateDeNaissance,
    //telEnfant,
    adresse,
    codePostal,
    ville,
    niveauScolaire,
    hobbies,
    fratrie,
    nbreFrereSoeur,
    place
  } = useSelector((state: RootState) => state.identityChild )

  const [inputNumber, setInputNumber] = useState<string>("")
  const [errorInputNumber, setErrorInputNumber] = useState<boolean>(false)

  const dispatch = useDispatch()

  const onValidateNumber = (text: string): void=>{
    setInputNumber(text)

    if(text.startsWith("0") && text.length === 10){
      dispatch(getTelEnfant(text.trim()))
    }
  }

  const onBlurNumberTelHandle = (text: string) =>{
    if(text.length>0 && text.length !==10){
      dispatch(getTelEnfant(null))
      setInputNumber("")
      setErrorInputNumber(true)
    } else {
      setErrorInputNumber(false)
    }
  }

  const validateNbFrereSoeurs = (text: string)=>{
    if(text.length <1 && fratrie===true){
      dispatch(getNbreFrereSoeur(undefined))
      dispatch(getPlace(undefined))

    } else {
      dispatch(getNbreFrereSoeur(+text))

    }
  }

  const PLACE_FRATRIE = ["Aîné(e)", "Cadet(te)", "Benjamin(e)"]
  const PLACE_FRATRIE_TWO = ["Aîné(e)", "Benjamin(e)"]

  
  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={[globalStyles.flexRow, {height: 70, alignItems:"center"}]}>
        <Text style={globalStyles.label}>
          &#8227; Date du rendez-vous :
        </Text>
        <BirthComponent statement={dateRdv} reducerFromStore={getDateRdv} />
      </View>
      <View style={{marginBottom:20}}>
        <Label
          statement={nom}
          question="Nom de l'enfant"
        />
        <TextInput 
          style={[globalStyles.input, {borderColor:`${nom === undefined ? "red":"green"}`, width:450}]} 
          placeholder="Nom de famille"
          onChangeText={(text)=> onValidateLengthInput(1, dispatch, getNom, text.trim())}
        />
      </View> 
      <View style={{marginBottom:20}}>
        <Label
          statement={prenom}
          question="Prénom de l'enfant"
        />
        <TextInput 
          style={[globalStyles.input, {borderColor:`${prenom === undefined ? "red":"green"}`, width:450}]} 
          placeholder="Prénom"
          onChangeText={(text)=> onValidateLengthInput(1, dispatch, getPrenom, text.trim())}
        />
      </View>
        
      <View style={[globalStyles.flexRow, {alignItems:'center'}]}>
        <Label
          question="Date de naissance "
          statement={dateDeNaissance}
        />
        <BirthComponent statement={dateDeNaissance} reducerFromStore={getDateDeNaissance} />
      </View>

 
      <View style={[globalStyles.flexRow, {marginBottom:20}]}>
        <Text style={globalStyles.label}>
          &#8227; N° de téléphone de l'enfant (s'il en a un) :
        </Text>
        <TextInput
          keyboardType="numeric"  
          style={[globalStyles.input, {width:175}]}
          maxLength={10}
          onChangeText={(text)=>onValidateNumber(text.trim())}
          onBlur = {()=> onBlurNumberTelHandle(inputNumber)}
          value={inputNumber}
        />
        {
          errorInputNumber &&
          <Text style={{alignSelf:"flex-start", marginLeft:10, color:"purple"}}>
            *
          </Text>
        }
      </View>
      {
        errorInputNumber &&
        <Text style={{color:"purple", textAlign:'right'}} >Rentrez un numéro de téléphone valide si vous en avez un.</Text>
      }

      
      <View style={{marginBottom:20}}>
        <Label
          question="Adresse "
          statement={adresse}
        />
        <TextInput 
          style={[globalStyles.input, {borderColor:`${adresse===undefined? "grey":"green"}`, width:"95%"}]}
          onChangeText={(text)=>onValidateLengthInput(3, dispatch, getAdresse, text.trim())}
        />
      </View>

      <View style={globalStyles.flexRow}>
        <Label
          question="Ville "
          statement={ville}
        />
        <TextInput 
          style={[globalStyles.input, {borderColor:`${ville===undefined? "grey":"green"}`, width:300}]}
          onChangeText={(text)=>onValidateLengthInput(0, dispatch, getVille, text.trim())}
        />
      </View>
      
      <View style={globalStyles.flexRow}>
        <Label
          question="Code postal "
          statement={codePostal}
        />
        <TextInput 
          keyboardType ="numeric"
          maxLength={5}
          style={[globalStyles.input, {borderColor:`${codePostal===undefined? "grey":"green"}`, width:100}]}
          onChangeText={(text)=>onValidateLengthInput(4, dispatch, getCodePostal, text.trim())}
        />
      </View>

      <View style={[globalStyles.flexRow, {alignItems:'flex-start', marginBottom:0}]}>
        <Label
          question="Votre enfant a-t-il des frères et soeurs ?"
          statement={fratrie}
        />
        <RadioComponent
          valueState={fratrie}
          setValueToFalse={()=>{
            dispatch(getFratrie(false))
            dispatch(getNbreFrereSoeur(0))
            dispatch(getPlace(""))
          }}
          setValueToTrue={()=>{
            dispatch(getFratrie(true))
            dispatch(getNbreFrereSoeur(undefined))
            dispatch(getPlace(undefined))
          }}
        />
      </View>

      {
        fratrie === true &&
        <View>
          <View style={[globalStyles.flexRow, {alignItems:'flex-start', marginBottom:20}]}>
            <Label
              question="Nombre de frères et soeurs"
              statement={nbreFrereSoeur}
            />
            <TextInput 
              keyboardType ="numeric"
              style={[globalStyles.input, {borderColor:`${getNbreFrereSoeur===undefined? "grey":"green"}`, width:50}]}
              onChangeText={(text)=>validateNbFrereSoeurs(text)}
            />
          </View>

          <View style={{marginBottom:20}}>
            <Label
              question="Place dans la fratrie "
              statement={place}
            />
            {
              nbreFrereSoeur !== undefined && nbreFrereSoeur < 2 
              ?
              PLACE_FRATRIE_TWO.map((placeFrat, index)=>(
                <View key={index.toString()}>
                  <MultipleRadioComponent
                    choix={placeFrat}
                    valueState={place}
                    dispatcher={dispatch}
                    reducerFromStore={getPlace}
                  />
                </View>
              ))
              :
              PLACE_FRATRIE.map((placeFrat, index)=>(
                <View key={index.toString()}>
                  <MultipleRadioComponent
                    choix={placeFrat}
                    valueState={place}
                    dispatcher={dispatch}
                    reducerFromStore={getPlace}
                  />
                </View>
              ))
            }
          </View>
        </View>
      }

      <LabelInputForText
        statement={niveauScolaire}
        question='Niveau scolaire'
        reducerFromStore={getNiveauScolaire}
        flexRow={true}
        minLengthForInput={0}
        width={150}
      />
      
      <View style={{width: "98%", marginLeft:-7.5}}>
        <ComponentAutres
          stateArray={hobbies}
          reducerFromStore={getHobbies}
          extraItem="Loisirs, hobbies"
          placeHolder='Entrez un loisir...'
        />
      </View>
    </SafeAreaView>  
  )
}

export default IdentityChild
