import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Intro from '../components/componentsWithProps/Intro'
import Titles from '../components/componentsWithProps/Titles'
import IdentityChild from '../components/componentsWithoutProps/IdentityChild'
import IdentityAccompagnant from '../components/componentsWithoutProps/IdentityAccompagnant'
import ConsultationEnfant from '../components/componentsWithoutProps/ConsultationEnfant'
import EtatDeSanteChild from '../components/componentsWithoutProps/EtatDeSanteChild'
import EtatSanteBoucheChild from '../components/componentsWithoutProps/EtatSanteBoucheChild'
import ValidationQuestionnaireEnfant from '../components/componentsWithoutProps/ValidationQuestionnaireEnfant'

const ChildFormScreen: FC = () => {
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
