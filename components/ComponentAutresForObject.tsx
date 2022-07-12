import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native'
import React, { FC, useState } from 'react'
import { globalStyles } from '../globalStyles'
import { useDispatch } from 'react-redux'
import { Button } from 'react-native-paper'

export type ComponentAutresForObjectProps = {
  arrayListe?: any[]
  reducerFromStore: Function
  valueForFilter: string
  valueSide: string
  questionForLabel: string
  liaison: string
  unit?: string
  widthFirstInput?: number
  widthSecondInput?: number
  placeHolderOne: string
  placeHolderTwo: string
  keyboardForInput: "default"| 'numeric'| 'email-address'| "ascii-capable"| 'numbers-and-punctuation'| 'url'| 'number-pad'| 'phone-pad'| 'name-phone-pad'| 'decimal-pad'| 'twitter'| 'web-search'| 'visible-password'
}

const ComponentAutresForObject:FC<ComponentAutresForObjectProps> = ({
  arrayListe, reducerFromStore, valueForFilter, valueSide, questionForLabel, widthFirstInput=350, widthSecondInput=250, liaison, unit, placeHolderOne, placeHolderTwo, keyboardForInput="default"
}) => {

  const dispatch = useDispatch()

  const [enterNewValue, setEnterNewValue] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [inputNomMedicament, setInputNomMedicament] = useState<string>("")
  const [inputFrequence, setInputFrequence] = useState<string>("")

  const handleNomMedicFrequenceValidation = ()=>{
    if(arrayListe === undefined){
      dispatch(reducerFromStore([{[valueForFilter]: inputNomMedicament, [valueSide]: inputFrequence }]))
    } else {
      let temp = [...arrayListe, {[valueForFilter]: inputNomMedicament, [valueSide]: inputFrequence }]
      dispatch(reducerFromStore(temp))
    }

    setInputFrequence("")
    setInputNomMedicament("")
    setEnterNewValue(false)
    
  }

  const deleteNomMedicFrequence = (event: any, stateArray:Object[], reducerFromStore: Function)=>{

    const stringToClick = event._dispatchInstances.memoizedProps.children[0].props.children
    let tempState = stateArray.filter((disease: any) => !stringToClick.includes(disease[valueForFilter]))

    if(tempState.length<1){
      dispatch(reducerFromStore(undefined))
      setDeleteMode(false)
      
    } else {
      dispatch(reducerFromStore(tempState))

    }  
  }

  return (
      <View>
        <Text style={[globalStyles.label, {color: `${arrayListe !== undefined ? "black" : "red"}`, marginBottom:20}]}>
          &#8227; {questionForLabel} (entrez un élément à la fois, puis cliquez sur 'AJOUTER')
        </Text>
        {
        deleteMode && 
        <Text style={{marginHorizontal:5, marginTop:0, marginBottom:10}}>
          (Appuyer sur un élément en rouge pour le supprimer de la liste.)
        </Text>
        }
        <View style={[globalStyles.flexRow, {flexWrap:"wrap", marginBottom:20}]}> 
          {
            arrayListe!==undefined && arrayListe.length>0 && 
            arrayListe.map((obj: any, index: number)=> (
              <TouchableOpacity
                key={index}
                style={deleteMode ? [styles.deletable, { height:50, padding:5, marginLeft:10, marginBottom:10, borderRadius:5}] : [styles.noDelete, { height:50, padding:5, marginLeft:10, marginBottom:10, borderRadius:5}]}
                onPress={(event)=> deleteMode && deleteNomMedicFrequence(event, arrayListe, reducerFromStore)}
              >
                <Text style={{fontSize:20, color: `${deleteMode ? "white" : "purple"}`, textAlign:"center", justifyContent:"center"}}>
                  {obj[valueForFilter]} {liaison} {obj[valueSide]} {unit}
                </Text>
              </TouchableOpacity>
            ))
          }
        </View>
        
        {
          enterNewValue === true ?
          <View>
            <View style={[globalStyles.flexRow, {alignItems:"center"}]}>
              <TextInput
                style={[globalStyles.input, {width:widthFirstInput, marginRight:10, borderColor:`${inputNomMedicament.length>0 ? "gray": "red"}`}]}  
                onChangeText={(text)=>{
                  if(text.length>1){
                    setInputNomMedicament(text.trim())

                  } else {
                    setInputNomMedicament("")
                  }
                }}
                placeholder={placeHolderOne}
              />
              <Text style={{fontWeight:"bold"}}>{liaison} </Text>
              <TextInput
                autoCapitalize='none'
                style={[globalStyles.input, {width:widthSecondInput, marginRight:10, borderColor:`${inputFrequence.length>0 ? "gray": "red"}`}]}  
                keyboardType={keyboardForInput}
                onChangeText={(text)=>{
                  if(text.length>0){
                    setInputFrequence(text.trim())

                  } else {
                    setInputFrequence("")
                  }
                }}
                placeholder={placeHolderTwo}
              />
              {
                unit !== undefined && <Text style={{fontWeight:"bold"}} >{unit}</Text>
              }
            </View>
            
            <View style={globalStyles.flexRow}>
              <Button
                mode="contained"
                color="orange"
                onPress={()=>setEnterNewValue(false)}
                style={{marginHorizontal:5}}
              >
                Annuler
              </Button>
              <Button
                mode="contained"
                color={inputFrequence.length<1 || inputNomMedicament.length<1? "#e5e2de" :"green"}
                labelStyle={{color:  "whitesmoke"}}
                onPress={()=>handleNomMedicFrequenceValidation()}
                style={{marginHorizontal:5}}
                disabled={inputFrequence.length<1 || inputNomMedicament.length<1 ? true : false}
              >
                Valider
              </Button>
            </View>
          </View>
          :
          <View style={globalStyles.flexRow}>
            {
              deleteMode === false 
              ?
              <Button mode='contained' color='#1D9BF0' style={{width:150, marginHorizontal:5}} onPress={()=>setEnterNewValue(true)} >
                AJOUTER
              </Button>
              :
              <Button mode='contained' color='orange' style={{width:250, marginHorizontal:5}} onPress={()=>setDeleteMode(false)} >
                Fin suppression
              </Button>
            }
            <Button mode='contained' color='red' style={{width:150, marginHorizontal:5}} onPress={()=>setDeleteMode(true)} disabled={arrayListe !== undefined && deleteMode === false ? false : true}>
              Supprimer
            </Button>
          </View>
    }
    </View>
  )
}

const styles = StyleSheet.create({
  extraDiseases :{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  deletable : {
    backgroundColor:"red",
  },
  noDelete: {
    backgroundColor:"#fff",
    borderWidth: 2,
    borderColor: "purple"
  }
});

export default ComponentAutresForObject