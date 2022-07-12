import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { globalStyles } from '../globalStyles'
import Logo from './Logo'
import Titles from './Titles'

export type IntroProps = {
  adultForm : boolean
} 

const Intro: FC<IntroProps> = ({adultForm} : IntroProps) => {
  return (
    <View>
      <Logo/>
      <Titles title="Questionnaire médical" />
      {
        adultForm 
        ?
        <Text style={globalStyles.texte}>
          {'\t'}Afin de vous soigner en toute sécurité, un historique détaillé de votre état de santé générale et dentaire est de la plus grande importance. C’est pourquoi nous vous remercions de répondre avec soin aux questions suivantes. Ces informations resteront strictement confidentielles. Par ailleurs, nous discuterons ensemble de cet historique en détails. 
        </Text>
        :
        <Text style={globalStyles.texte}>
          {'\t'}Afin de soigner votre enfant en toute sécurité, un historique détaillé de son état de santé générale et dentaire est de la plus grande importance. C’est pourquoi nous vous remercions de répondre pour lui (ou qu'il le fasse lui-même s'il est en âge) avec soin aux questions suivantes. Ces informations resteront strictement confidentielles. Par ailleurs, nous pourrons discuter ensemble de cet historique en détails. 
        </Text>
      }
      
      <Text style={globalStyles.texteMiddle}>
        {'\t'}N’hésitez pas à vous adresser à mon assistante ou à moi-même pour vous aider à le remplir.
      </Text>
      <Text style={[globalStyles.texteMiddle, {color:"red", fontWeight:"bold", textDecorationLine:"underline", marginBottom:-10}]}>
        Attention : 
      </Text>
      <Text style={[globalStyles.texteMiddle, {color:"red", fontWeight:"bold"}]}>
        {'\t'}Toutes les questions surlignés en rouge demandent une réponse obligatoire.
      </Text>
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({})