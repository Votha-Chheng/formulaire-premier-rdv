import { View } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import RadioComponent from './RadioComponent'
import { getAllergies, getAllergiesListe } from '../store//adultState/medicalInfo'
import CheckBoxComponent from './CheckboxComponent'
import { globalStyles } from '../globalStyles'
import ComponentAutres from './ComponentAutres'
import { addRadioItem } from '../utils'

const AllergiesPart: FC = () => {

  const {allergies, allergiesListe} = useSelector((state: RootState) => state.medicalHistory)

  const dispatch = useDispatch()

  const allergiesToTrue = (): void=>{
    dispatch(getAllergies(true))
    dispatch(getAllergiesListe(undefined))
  }
  const allergiesToFalse = (): void=>{
    dispatch(getAllergies(false))
    dispatch(getAllergiesListe([]))
  }

  return (
    <View>
      <Label
        question="Êtes-vous allergique à certains produits ou médicaments ? "
        statement={allergies}
        />
      <RadioComponent
        valueState={allergies} 
        setValueToTrue = {()=>allergiesToTrue()} 
        setValueToFalse = {()=>allergiesToFalse()}
      />

      {
        allergies &&
          <View>
            <Label
              question="À quoi êtes-vous allergique ? "
              statement={allergiesListe}
            />
            <View style={[globalStyles.flexRow, {alignItems:"flex-start"}]}>
              <View style={{marginHorizontal:5}}>
                <CheckBoxComponent title="Anesthésique local du dentiste" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
                <CheckBoxComponent title="Iode et produits dérivés" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
                <CheckBoxComponent title="Métal" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
                <CheckBoxComponent title="Antibiotique" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>    
                <CheckBoxComponent title="Latex" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
              </View>
              <View style={{marginHorizontal:10}}>
                <CheckBoxComponent title="Barbituriques" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
                <CheckBoxComponent title="Anti-inflammatoire/aspirine" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
                <CheckBoxComponent title="Neuroleptique/somnifère" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
                <CheckBoxComponent title="Codéine" maladies={allergiesListe} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getAllergiesListe}/>
              </View>
            </View>
            <ComponentAutres stateArray={allergiesListe} reducerFromStore={getAllergiesListe} extraItem="Autre allergie" placeHolder="Allergie" />
          </View>

      }
    </View>
  )
}

export default AllergiesPart

