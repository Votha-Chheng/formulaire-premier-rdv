import { Alert, StyleSheet} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import IdentityPart from '../components/IdentityPart'
import { ScrollView } from 'react-native-gesture-handler'
import Intro from '../components/Intro'
import Titles from '../components/Titles'
import MedicalHistoryPart from '../components/MedicalHistoryPart'
import Gencives from '../components/Gencives'
import DentsInfo from '../components/DentsInfo'
import Machoire from '../components/Machoire'
import DentalCheckup from '../components/DentalCheckup'
import HygieneDentaire from '../components/HygieneDentaire'
import Habitudes from '../components/Habitudes'
import Esthetique from '../components/Esthetique'
import Divers from '../components/Divers'
import { HomeScreenProps } from './HomeScreen'
import ValidationQuestionnaire from '../components/ValidationQuestionnaire'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/Loader'

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