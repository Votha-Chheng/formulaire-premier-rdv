import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import RadioComponent from './RadioComponent'
import { getListeMedicamentsChild, getPriseMedicamentsChild, MedicamentsChild } from '../store/childState/etatSanteChild'
import { Button, TextInput } from 'react-native-paper'
import { globalStyles } from '../globalStyles'
import ComponentAutresForObject from './ComponentAutresForObject'

const MedicamentChild: FC = () => {
  const {priseMedicamentsChild, listeMedicamentsChild} = useSelector((state: RootState) => state.etatDeSanteChild)

  const [enterNewValue, setEnterNewValue] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [inputNomMedicament, setInputNomMedicament] = useState<string>("")
  const [inputFrequence, setInputFrequence] = useState<string>("")

  const dispatch = useDispatch()

  const handleNomMedicFrequenceValidation = ()=>{
    if(listeMedicamentsChild === undefined){
      dispatch(getListeMedicamentsChild([{nomMedicament: inputNomMedicament, frequence: inputFrequence }]))
    } else {
      let temp = [...listeMedicamentsChild, {nomMedicament: inputNomMedicament, frequence: inputFrequence }]
      dispatch(getListeMedicamentsChild(temp))
    }

    setInputFrequence("")
    setInputNomMedicament("")
    setEnterNewValue(false)
    
  }

  const deleteNomMedicFrequence = (event: any, stateArray:MedicamentsChild[], reducerFromStore: Function)=>{
    // Ecrire la fonction pour supprimer de la liste les nom et fréquence
    const stringToClick = event._dispatchInstances.memoizedProps.children[0].props.children
    let tempState = stateArray.filter((disease: MedicamentsChild) => !stringToClick.includes(disease.nomMedicament))

    if(tempState.length<1){
      dispatch(reducerFromStore(undefined))
      setDeleteMode(false)
      
    } else {
      dispatch(reducerFromStore(tempState))

    }  
  }

    return (
    <View>
      <View>
        <Label question="Prend-il des médicaments en ce moment ?" statement={priseMedicamentsChild} />
        <RadioComponent
          valueState={priseMedicamentsChild}
          setValueToTrue={()=>{
            dispatch(getPriseMedicamentsChild(true))
            dispatch(getListeMedicamentsChild(undefined))

          }}
          setValueToFalse={()=>{
            dispatch(getPriseMedicamentsChild(false))
            dispatch(getListeMedicamentsChild([]))
            
          }}
        />
      </View>
      {
        priseMedicamentsChild === true &&
        <ComponentAutresForObject
          arrayListe = {listeMedicamentsChild}
          reducerFromStore={getListeMedicamentsChild}
          valueForFilter="nomMedicament"
          valueSide="frequence"
          questionForLabel="Quel(s) médicament(s) et à quelle fréquence ?"
          liaison="tous/toutes les"
          unit=""
          placeHolderOne="Nom/type de médicament..."
          placeHolderTwo="Fréquence"
          keyboardForInput="default"
        />
      }
    </View>
  )
}

export default MedicamentChild