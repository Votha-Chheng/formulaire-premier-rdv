import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { RadioButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { globalStyles } from '../globalStyles'
import { getSensationProthesesActuelles } from '../store/adultState/dentsInfo'

const SensationsProtheses: FC = () => {

  const {sensationProthesesActuelles} = useSelector((state: RootState) => state.dentsInfo)

  const dispatch = useDispatch()

  return (
    <View style={{marginTop:20}}>
    <Label
      question="Comment vous sentez-vous avec vos prothèses actuelles ?"
      statement={sensationProthesesActuelles}
    />
    <View style={[globalStyles.flexRow, {marginBottom:0}]}>
      <RadioButton
        value="Confortable"
        status={ 
          sensationProthesesActuelles===undefined || sensationProthesesActuelles !== "Confortable"
          ? 
          'unchecked' 
          :  
          'checked' 
        }
        onPress={()=>dispatch(getSensationProthesesActuelles("Confortable"))}
      />
      <Text 
        style={
          sensationProthesesActuelles===undefined ||  sensationProthesesActuelles !=="Confortable"
          ? 
          {fontSize: 20, color:"grey"} 
          : 
          {fontSize: 20, color:"green", fontWeight:"bold"}
        }
      >
        Je ne ressens aucune gêne avec mes prothèses.
      </Text>
    </View>
    <View style={[globalStyles.flexRow, {marginBottom:0}]}>
      <RadioButton
        value="Un peu inconfortable"
        status={
          sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Un peu inconfortable" 
          ? 
          'unchecked' 
          : 
          'checked' 
        }
        onPress={()=>dispatch(getSensationProthesesActuelles("Un peu inconfortable" ))}
      />
      <Text 
        style={
          sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Un peu inconfortable" 
          ? 
          {fontSize: 20, color:"grey"} 
          : 
          {fontSize: 20, color:"green", fontWeight:"bold"}
        }
      >
        Je ressens un peu d'inconfort.
      </Text>
    </View>
    <View style={globalStyles.flexRow}>
      <RadioButton
        value="Très inconfortable"
        status={
          sensationProthesesActuelles===undefined || sensationProthesesActuelles !== "Très inconfortable" 
          ? 
          'unchecked' 
          : 
          'checked'
        }
        onPress={()=>dispatch(getSensationProthesesActuelles("Très inconfortable"))}
      />
      <Text 
        style={
          sensationProthesesActuelles===undefined || sensationProthesesActuelles!=="Très inconfortable" 
          ? 
          {fontSize: 20, color:"grey"} 
          : 
          {fontSize: 20, color:"green", fontWeight:"bold"}
        }
      >
        Elles sont très gênantes.
      </Text>
    </View>
  </View>
  )
}

export default SensationsProtheses

const styles = StyleSheet.create({})