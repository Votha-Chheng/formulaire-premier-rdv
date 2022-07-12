import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { globalStyles } from '../globalStyles'
import Label from './Label'
import RadioComponent from './RadioComponent'
import { getProblemeSante } from '../store/childState/etatSanteChild'
import SurveillanceMedicale from './SurveillanceMedicale'
import MedicamentChild from './MedicamentChild'
import AllergiesMedicChild from './AllergiesMedicChild'
import MaladiesGraves from './MaladiesGraves'
import OperationChild from './OperationChild'
import AutresAntecedents from './AutresAntecedents'

const EtatDeSanteChild: FC = () => {

  const {problemeSante} = useSelector((state: RootState)=> state.etatDeSanteChild)

  const dispatch = useDispatch()

  return (
    <View style={globalStyles.container}>
      <View>
        <Label question="A-t-il des problèmes de santé ?" statement={problemeSante} />
        <RadioComponent
          valueState={problemeSante}
          setValueToTrue={()=>{
            dispatch(getProblemeSante(true))
          }}
          setValueToFalse={()=>{
            dispatch(getProblemeSante(false))
          }}
        />
      </View>
      <SurveillanceMedicale/>
      <MedicamentChild/>
      <AllergiesMedicChild/>
      <MaladiesGraves/>
      <OperationChild/>
      <AutresAntecedents/>
    </View>
  )
}

export default EtatDeSanteChild