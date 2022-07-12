import { Alert, StyleSheet} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import IdentityPart from '../components/componentsWithoutProps/IdentityPart'
import { ScrollView } from 'react-native-gesture-handler'
import Intro from '../components/componentsWithProps/Intro'
import Titles from '../components/componentsWithProps/Titles'
import MedicalHistoryPart from '../components/componentsWithoutProps/MedicalHistoryPart'
import Gencives from '../components/componentsWithoutProps/Gencives'
import DentsInfo from '../components/componentsWithoutProps/DentsInfo'
import Machoire from '../components/componentsWithoutProps/Machoire'
import DentalCheckup from '../components/componentsWithoutProps/DentalCheckup'
import HygieneDentaire from '../components/componentsWithoutProps/HygieneDentaire'
import Habitudes from '../components/componentsWithoutProps/Habitudes'
import Esthetique from '../components/componentsWithoutProps/Esthetique'
import Divers from '../components/componentsWithoutProps/Divers'
import { HomeScreenProps } from './HomeScreen'
import ValidationQuestionnaire from '../components/componentsWithoutProps/ValidationQuestionnaire'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/componentsWithoutProps/Loader'

const AdultFormScreen: FC = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const navigation = useNavigation<HomeScreenProps>()

  useEffect(()=>{
    if(navigation.isFocused()){
      setLoading(false)
    }
  }, [navigation.isFocused()])


  useEffect(()=>{
    navigation.addListener("beforeRemove", (event)=>{

      if(event.data.action.type==="GO_BACK"){
        event.preventDefault()
        createTwoButtonAlert()
      }
    })
  }, [navigation])

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Êtes-vous sûr de vouloir revenir à l'accueil ?",
      "Toutes les données rentrées seront perdues, il faudra recommencer le questionnaire.",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Revenir à l'accueil", 
          onPress: ()=>navigation.navigate("Home")
        }
      ]
    );
  }

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <ScrollView>
      <Intro adultForm={true}/>
      <Titles title="Votre identité" />
      <IdentityPart/>
      <Titles title="Historique médical" />
      <MedicalHistoryPart/>
      <Titles title="Historique dentaire" />
      <DentalCheckup/>
      <Gencives/>
      <DentsInfo/>
      <Machoire/>
      <HygieneDentaire/>
      <Habitudes/>
      <Esthetique/>
      <Divers/>
      <Titles title="Valider les réponses du questionnaire"/>
      <ValidationQuestionnaire/>
    </ScrollView>
  )
}

export default AdultFormScreen

const styles = StyleSheet.create({})