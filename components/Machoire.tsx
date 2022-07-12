import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { globalStyles } from '../globalStyles'
import SubTitles from './SubTitles'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import RadioComponent from './RadioComponent'
import { getCraquementClaquementDouleurOuvertureMachoire, getDifficulteAvalerMacherCoteUnique, getSerrementGrincementDents } from '../store/adultState/machoire'

const Machoire: FC = () => {

  const {serrementGrincementDents, craquementClaquementDouleurOuvertureMachoire, difficulteAvalerMacherCoteUnique} = useSelector((state: RootState) => state.machoireInfo)

  const dispatch = useDispatch()

  return (
    <View style={globalStyles.container} >
      <SubTitles title="MÂCHOIRE" />
      <View>
        <Label
          question="Serrez-vous ou grincez-vous des dents ?"
          statement={serrementGrincementDents}
        />
        <RadioComponent
          valueState ={serrementGrincementDents}
          setValueToTrue={()=>dispatch(getSerrementGrincementDents(true))}
          setValueToFalse={()=>dispatch(getSerrementGrincementDents(false))}
        />
      </View>

      <View>
        <Label
          question="Avez-vous remarqué des craquements, des claquements ou une douleur à l’ouverture de la mâchoire ?"
          statement={craquementClaquementDouleurOuvertureMachoire}
        />
        <RadioComponent
          valueState ={craquementClaquementDouleurOuvertureMachoire}
          setValueToTrue={()=>dispatch(getCraquementClaquementDouleurOuvertureMachoire(true))}
          setValueToFalse={()=>dispatch(getCraquementClaquementDouleurOuvertureMachoire(false))}
        />
      </View>
      
      <View>
        <Label
          question="Avez-vous des difficultés à avaler, à mâcher ou ne mâchez-vous fréquemment que d’un seul côté ?"
          statement={difficulteAvalerMacherCoteUnique}
        />
        <RadioComponent
          valueState ={difficulteAvalerMacherCoteUnique}
          setValueToTrue={()=>dispatch(getDifficulteAvalerMacherCoteUnique(true))}
          setValueToFalse={()=>dispatch(getDifficulteAvalerMacherCoteUnique(false))}
        />
      </View>
    </View>
  )
}

export default Machoire

const styles = StyleSheet.create({})