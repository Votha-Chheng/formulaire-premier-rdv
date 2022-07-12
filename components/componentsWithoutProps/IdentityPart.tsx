import { StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { globalStyles } from '../../globalStyles';
import { Picker } from '@react-native-picker/picker';
import { RadioButton, TextInput } from 'react-native-paper';
import { getAdresse, getCodePostal, getDateDeNaissance, getDateRdv, getDr, getEmail, getGenre, getNom, getPrenom, getProfession, getTel, getVille } from '../../store/adultState/identity';
import { onValidateLengthInput } from '../../utils';
import Label from '../componentsWithProps/Label';
import { getEnceinte, getPilule } from '../../store/adultState/medicalInfo';
import BirthComponent from '../componentsWithProps/BirthComponent';
import LabelInputForText from '../componentsWithProps/LabelInputFortText';
import LabelInputForNumber from '../componentsWithProps/LabelInputForNumber';


const IdentityPart: FC = () => {

  const {dr, dateRdv, genre, nom, prenom, dateDeNaissance, tel, email, profession, adresse, codePostal, ville} = useSelector((state: RootState)=> state.identity)

  const dispatch = useDispatch()

  const translation = useRef(new Animated.Value(0)).current

  const switchToBottom = ()=>{
    Animated.timing(translation, {
      toValue: -33,
      duration: 250,
      useNativeDriver: true
    }).start()
  }
  const switchToTop = ()=>{
    Animated.timing(translation, {
      toValue: 3,
      duration: 250,
      useNativeDriver: true
    }).start()
  }
    
  useEffect(() => {
    genre === "Monsieur" ? switchToBottom() : switchToTop()
  }, [genre])

  const onValidateNumber = (text: string): void=>{
    if(text.startsWith("0") && text.length === 10){
      dispatch(getTel(text.trim()))
    } else {
      dispatch(getTel(undefined))
    }
  }

  const onValidateEmail = (text: string): void=>{
    if(text.includes("@") && text.includes(".")){
      dispatch(getEmail(text.trim()))
    } else {
      dispatch(getEmail(undefined))
    }
  }

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={globalStyles.flexRow}>
        <Text style={globalStyles.label}>
          &#8227; Vous avez rendez-vous avec :
         </Text>
         <View style={[styles.picker]}>
          <Picker
            selectedValue = {dr}
            onValueChange = {(itemValue, itemIndex)=> dispatch(getDr(itemValue)) }
            mode="dropdown"
            style={{transform:[{scaleX: 1.05}, {scaleY:1.1}, {translateX:5}]}}
          >
            <Picker.Item label="Dr. Sylvie MA-FRANCIN" value="Sylvie MA-FRANCIN"/>
          </Picker>
        </View>
      </View>

      <View style={[globalStyles.flexRow, {height: 70, alignItems:"center"}]}>
        <Text style={globalStyles.label}>
          &#8227; Date du rendez-vous :
        </Text>
        <BirthComponent statement={dateRdv} reducerFromStore={getDateRdv} />
      </View>

      <View style={{flexDirection:"row", marginTop : 15}}>
        <Text style={{fontSize:20, marginTop:7}} >&#8227;</Text>
        <Animated.View style={{marginVertical : 5, marginRight:10, width:125, transform : [{translateY : translation}]}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <RadioButton
              value="Madame"
              status={ genre === 'Madame' ? 'checked' : 'unchecked' }
              onPress={() => {
                dispatch(getGenre("Madame"))
                dispatch(getEnceinte(undefined))
                dispatch(getPilule(undefined))
              }}
              />
            <Text 
              style={genre === 'Monsieur' ? 
              {fontSize: 15, color:"grey"} 
              : 
              {fontSize: 20, color:"black", fontWeight:"bold"}}
            >
              Madame
            </Text>
          </View>
          <View style={globalStyles.flexRow}>
            <RadioButton
              value="Monsieur"
              status={ genre === 'Monsieur' ? 'checked' : 'unchecked' }
              onPress={() =>{ 
                dispatch(getGenre("Monsieur"))
                dispatch(getEnceinte(false))
                dispatch(getPilule(false))
              }}
              />
            <Text 
              style={genre === 'Madame' ? 
              {fontSize: 15, color:"grey" } 
              : 
              {fontSize: 20, color:"black", fontWeight:"bold"}}
            >
              Monsieur
            </Text>
          </View>
        </Animated.View>
        <TextInput 
          style={[globalStyles.input, styles.nameInput, {borderColor:`${nom === undefined ? "red":"green"}`}]} 
          placeholder="Nom de famille"
          onChangeText={(text)=> onValidateLengthInput(1, dispatch, getNom, text.trim())}
        />
        <TextInput 
          style={[globalStyles.input, styles.nameInput, {borderColor:`${prenom === undefined ? "red":"green"}`}]} 
          placeholder="Prénom"
          onChangeText={(text)=> onValidateLengthInput(1, dispatch, getPrenom, text.trim())}
        />
      </View> 


      <View style={globalStyles.flexRow}>
        <Label
          question="Date de naissance "
          statement={dateDeNaissance}
        />
        <BirthComponent statement={dateDeNaissance} reducerFromStore={getDateDeNaissance} />
      </View>


      <View style={globalStyles.flexRow}>
        <LabelInputForNumber
          question="Téléphone "
          statement={tel}
          maxLength={10}
          onHandleChangeNumber={(text: string)=>onValidateNumber(text.trim())}
        />
      </View>


      <View style={globalStyles.flexRow}>
        <Label
          question="E-mail "
          statement={email}
        />
        <TextInput 
          keyboardType="email-address" 
          autoCapitalize='none'
          style={[globalStyles.input, {borderColor:`${email===undefined? "grey":"green"}`, width:300}]}
          onChangeText={(text)=>onValidateEmail(text.trim())}
        />
      </View>

      <View style={{marginBottom:20}}>
        <LabelInputForText
          question='Profession'
          statement={profession}
          reducerFromStore={getProfession}
          flexRow={true}
          minLengthForInput={0}
        />
      </View>

      <View style={{marginBottom:20}}>
        <LabelInputForText
          question='Adresse'
          statement={adresse}
          reducerFromStore={getAdresse}
          flexRow={true}
          minLengthForInput={3}
          width={500}
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
    </SafeAreaView>  

  );
}


const styles = StyleSheet.create({
  nameInput: {
    borderWidth:2, 
    width:250, 
    marginLeft:25, 
    maxHeight:45
  },
  picker : {
    width:300,
    marginRight:20,
    alignSelf:"flex-end",
    borderColor : "#000",
    borderWidth : 1.5,
    fontSize:17.5,
  }
})

export default IdentityPart
