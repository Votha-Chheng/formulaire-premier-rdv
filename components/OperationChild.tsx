import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import RadioComponent from './RadioComponent'
import { getListeOperations, getOperationOuiNon } from '../store/childState/etatSanteChild'
import ComponentAutresForObject from './ComponentAutresForObject'

const OperationChild: FC = () => {

  const { operationOuiNon, listeOperations } = useSelector((state: RootState)=> state.etatDeSanteChild)

  const dispatch = useDispatch()

  return (
    <View>
      <View>
        <Label question="A-t-il déjà subi une opération ?" statement={operationOuiNon} />
        <RadioComponent
          valueState={operationOuiNon}
          setValueToTrue={()=>{
            dispatch(getOperationOuiNon(true))
            dispatch(getListeOperations(undefined))

          }}
          setValueToFalse={()=>{
            dispatch(getOperationOuiNon(false))
            dispatch(getListeOperations([]))
            
          }}
        />
      </View>
      {
        operationOuiNon === true &&
        <ComponentAutresForObject
          arrayListe = {listeOperations}
          reducerFromStore={getListeOperations}
          valueForFilter="cause"
          valueSide="age"
          questionForLabel="Opéré(e) de quoi et à quel âge ?"
          liaison="à l'âge de"
          unit="an(s)"
          placeHolderOne="Cause de l'opération..."
          placeHolderTwo="âge"
          keyboardForInput="numeric"
        />
      }
    </View>
  )
}

export default OperationChild