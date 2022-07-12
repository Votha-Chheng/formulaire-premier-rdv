import { View, Text } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Button } from 'react-native-paper'
import { globalStyles } from '../../globalStyles'

const ValidationQuestionnaireEnfant: FC = () => {

  const {identityAccompagnant, identityChild, etatDeSanteChild, etatBuccoDentaireChild, consultationChild} = useSelector((state: RootState) => state)

  const [questionsRestantes, setQuestionsRestantes] = useState<number>(0)

  const countUndefinedState = (objectToScan: any): number=>{
    let nbStateWithUndefined = 0

    for (let value in objectToScan){
      if(typeof(objectToScan[value])==='object'){

        for(let subValue in objectToScan[value]){
          if((objectToScan[value][subValue]) === undefined){
            nbStateWithUndefined++
          }
        }

      } else {
        if(objectToScan[value] === undefined){
          nbStateWithUndefined++
        }

      }
    }
    console.log(nbStateWithUndefined)
    return nbStateWithUndefined
  }

  useEffect(()=>{
    const totalUndefined: number = 
      countUndefinedState(identityAccompagnant)+
      countUndefinedState(identityChild)+
      countUndefinedState(etatDeSanteChild)+
      countUndefinedState(etatBuccoDentaireChild)+
      countUndefinedState(consultationChild)

    setQuestionsRestantes(totalUndefined)
    console.log((identityAccompagnant))

  }, [identityAccompagnant, identityChild, etatDeSanteChild, etatBuccoDentaireChild, consultationChild])

  return (
    <View style={[globalStyles.container, {alignItems:"center", marginVertical:30}]}>
      {
        questionsRestantes>0 ?
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
          <Text style={[globalStyles.label, {marginBottom:-10}]}>
            Il reste encore
          </Text>
          <Text style={[globalStyles.label, {color:"red", marginBottom:-10}]}>
            {questionsRestantes.toString()} questions en rouge.
          </Text>
          <Text style={[globalStyles.label, {textAlign:"center"}]}>
            Veuillez s'il vous plaît remonter à ces questions pour y répondre.
          </Text>
        </View>
        :
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", justifyContent:"center"}]}>
          <Text style={[globalStyles.label, {marginBottom:-10}]}>
            Vous pouvez maintenant valider le questionnaire.
          </Text>
        </View>
      }
      <Button onPress={()=> console.log(questionsRestantes) } mode="contained" disabled={questionsRestantes>0 ? true : false}>
        {
          questionsRestantes>0 ? "Finissez le questionnaire pour valider" : "Appuyer ici pour valider le questionnaire"
        }
      </Button>
    </View>
  )
}

export default ValidationQuestionnaireEnfant