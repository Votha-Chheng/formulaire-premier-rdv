import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import RadioComponent from './RadioComponent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getListeMaladiesGraves, getMaladieGraveOuiNon } from '../store/childState/etatSanteChild'
import ComponentAutresForObject from './ComponentAutresForObject'

const MaladiesGraves:FC = () => {

  const {maladieGraveOuiNon, listeMaladiesGraves} = useSelector((state: RootState) => state.etatDeSanteChild)

  const dispatch = useDispatch()

  return (
    <View>
      <View>
        <Label question="A-t-il déjà eu une maladie grave ?" statement={maladieGraveOuiNon} />
        <RadioComponent
          valueState={maladieGraveOuiNon}
          setValueToTrue={()=>{
            dispatch(getMaladieGraveOuiNon(true))
            dispatch(getListeMaladiesGraves(undefined))

          }}
          setValueToFalse={()=>{
            dispatch(getMaladieGraveOuiNon(false))
            dispatch(getListeMaladiesGraves([]))
            
          }}
        />
      </View>
      {
        maladieGraveOuiNon === true &&
        <ComponentAutresForObject
          questionForLabel='Quelles(s) maladie(s) grave(s) a-t-il eu à subir ?'
          arrayListe={listeMaladiesGraves} 
          reducerFromStore={getListeMaladiesGraves}
          valueForFilter="nomMaladie"
          valueSide="age"
          liaison="à l'âge de "
          placeHolderOne="Nom ou type de maladie grave..." 
          placeHolderTwo="âge"
          unit='an(s)'
          widthFirstInput={450}
          widthSecondInput={50}
          keyboardForInput='numeric'
        />
      }
    </View>
  )
}

export default MaladiesGraves