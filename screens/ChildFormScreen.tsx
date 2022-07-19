import { Alert } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Intro from '../components/componentsWithProps/Intro'
import Titles from '../components/componentsWithProps/Titles'
import IdentityChild from '../components/componentsWithoutProps/IdentityChild'
import IdentityAccompagnant from '../components/componentsWithoutProps/IdentityAccompagnant'
import ConsultationEnfant from '../components/componentsWithoutProps/ConsultationEnfant'
import EtatDeSanteChild from '../components/componentsWithoutProps/EtatDeSanteChild'
import EtatSanteBoucheChild from '../components/componentsWithoutProps/EtatSanteBoucheChild'
import ValidationQuestionnaireEnfant from '../components/componentsWithoutProps/ValidationQuestionnaireEnfant'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/componentsWithoutProps/Loader'
import { HomeScreenProps } from './HomeScreen'

const ChildFormScreen: FC = () => {

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
      <Intro adultForm={false} />
      <Titles title="Identité de l'enfant" />
      <IdentityChild/>
      <Titles title="Identité des responsables légaux de l'enfant" />
      <IdentityAccompagnant/>
      <Titles title="Renseignements sur la consultation" />
      <ConsultationEnfant/>
      <Titles title="État de santé général de l'enfant" />
      <EtatDeSanteChild/>
      <Titles title="État de santé bucco-dentaire de l'enfant" />
      <EtatSanteBoucheChild/>
      <Titles title="Valider les réponses du questionnaire"/>
      <ValidationQuestionnaireEnfant/>
    </ScrollView>
  )
}

export default ChildFormScreen
