import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Intro from '../components/Intro'
import Titles from '../components/Titles'
import IdentityChild from '../components/IdentityChild'
import IdentityAccompagnant from '../components/IdentityAccompagnant'
import ConsultationEnfant from '../components/ConsultationEnfant'
import EtatDeSanteChild from '../components/EtatDeSanteChild'

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
    </ScrollView>
  )
}

export default ChildFormScreen

const styles = StyleSheet.create({})