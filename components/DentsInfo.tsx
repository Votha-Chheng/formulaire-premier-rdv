import { View } from 'react-native'
import React, { FC } from 'react'
import { globalStyles } from '../globalStyles'
import Label from './Label'
import RadioComponent from './RadioComponent'
import SubTitles from './SubTitles'
import CheckBoxComponent from './CheckboxComponent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { addRadioItem } from '../utils'
import { 
  getCausesExtraction, 
  getDentsExtraites, 
  getDentsRemplacees, 
  getDentsSensibles, 
  getListeSensibilite, 
  getMoyenDentRemplacement, 
  getPreferencesUtilisationMetaux, 
  getRaisonsNonRemplacementDentsExtraites, 
  getSensationProthesesActuelles, 
  getUtilisationMetaux 
} from '../store//adultState/dentsInfo'
import ComponentAutres from './ComponentAutres'
import SensationsProtheses from './SensationsProtheses'
import AddText from './AddText'

const DentsInfo: FC = () => {

  const {
    dentsExtraites, 
    causesExtraction, 
    dentsRemplacees, 
    moyenDentRemplacement,
    raisonsNonRemplacementDentsExtraites,
    utilisationMetaux, 
    preferencesUtilisationMetaux, 
    dentsSensibles, 
    listeSensibilite
  } = useSelector((state: RootState) => state.dentsInfo)


  const dispatch = useDispatch()


  return (
    <View style={globalStyles.container}>
      <SubTitles title="DENTS" />
      <View>
        <Label
          question="Avez-vous des dents extraites ?"
          statement={dentsExtraites}
        />
        <RadioComponent
          valueState={dentsExtraites} 
          setValueToTrue = {()=>{
            dispatch(getDentsExtraites(true))
            dispatch(getCausesExtraction(undefined))
            dispatch(getDentsRemplacees(undefined))
            dispatch(getSensationProthesesActuelles(undefined))
          }} 
          setValueToFalse = {()=>{
            dispatch(getDentsExtraites(false))
            dispatch(getCausesExtraction([]))
            dispatch(getDentsRemplacees(false))
            dispatch(getSensationProthesesActuelles(""))
          }}
        />
      </View>
      {
        dentsExtraites &&
        <View style={{marginBottom:30}}>
          <Label
            question="Pour quelles raisons ont-elles été extraites ?"
            statement={causesExtraction}
          />
          <View style={globalStyles.flexRow}>
            <View style={{marginRight:30}}>
              <CheckBoxComponent title="Caries" maladies={causesExtraction} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getCausesExtraction} />
              <CheckBoxComponent title="Infection ou abcès" maladies={causesExtraction} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getCausesExtraction} />
            </View>
            <View>
              <CheckBoxComponent title="Déchaussement" maladies={causesExtraction} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getCausesExtraction} />
              <CheckBoxComponent title="Dent incluse" maladies={causesExtraction} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getCausesExtraction} />
            </View>
          </View>
          <ComponentAutres stateArray={causesExtraction} reducerFromStore={getCausesExtraction} extraItem="Autre raison" placeHolder="Raison de l'extraction" />
          
          <View style={{marginBottom:0}}>
            <Label
              question="Les dents extraites ont-elles été remplacées ?"
              statement={dentsRemplacees}
            />
            <RadioComponent
              valueState={dentsRemplacees} 
              setValueToTrue = {()=>{
                dispatch(getDentsRemplacees(true))
                dispatch(getMoyenDentRemplacement(undefined))
                dispatch(getRaisonsNonRemplacementDentsExtraites(""))
                dispatch(getSensationProthesesActuelles(undefined))
              }} 
              setValueToFalse = {()=>{
                dispatch(getDentsRemplacees(false))
                dispatch(getMoyenDentRemplacement([]))
                dispatch(getRaisonsNonRemplacementDentsExtraites(undefined))
                dispatch(getSensationProthesesActuelles(""))
              }}
            />
          </View>

          {
            dentsRemplacees === true
            ?
            <View>
              <View style={{marginBottom:20}}>
                <Label
                  question="Par quoi ont-elles été remplacées ?"
                  statement={moyenDentRemplacement}
                />
                <CheckBoxComponent title="Un bridge fixe" maladies={moyenDentRemplacement} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMoyenDentRemplacement}/>
                <CheckBoxComponent title="Un appareil mobile" maladies={moyenDentRemplacement} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMoyenDentRemplacement}/>
                <CheckBoxComponent title="Un implant" maladies={moyenDentRemplacement} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getMoyenDentRemplacement}/>
              </View>
              <SensationsProtheses/>
            </View>
            :
            dentsRemplacees === false 
            ?
            <AddText
              dispatcher={dispatch}
              reducerFromStore={getRaisonsNonRemplacementDentsExtraites}
              statement={raisonsNonRemplacementDentsExtraites}
              parentState={dentsRemplacees}
              questionForLabel="Pour quelle(s) raison(s) n'ont-elles pas été remplacées ?"
              placeHolder='Raison(s) du non-remplacement'
              parentStateShouldBe={false}
            />
            :
            null
          }
        </View>
      }

      <View>
        <Label
          question="Concernant l’utilisation des métaux dans votre bouche, avez-vous des préférences particulières ?"
          statement={utilisationMetaux}
        />
        <RadioComponent
          valueState ={utilisationMetaux}
          setValueToTrue={()=>{
            dispatch(getUtilisationMetaux(true))
            dispatch(getPreferencesUtilisationMetaux(undefined))
          }}
          setValueToFalse={()=>{
            dispatch(getUtilisationMetaux(false))
            dispatch(getPreferencesUtilisationMetaux([]))
          }}
        />
      </View>
      {
        utilisationMetaux === true &&
        <AddText 
          dispatcher={dispatch} 
          reducerFromStore={getPreferencesUtilisationMetaux} 
          statement={preferencesUtilisationMetaux} 
          parentState={utilisationMetaux} 
          questionForLabel="Quelles sont ces préférences ?" 
          placeHolder="Ecrivez toutes vos préférences..." 
          parentStateShouldBe={true}
        />
      }
      
      <View>
        <Label
          question="Avez-vous des dents sensibles en général ?"
          statement={dentsSensibles}
        />
        <RadioComponent
          valueState ={dentsSensibles}
          setValueToTrue={()=>{
            dispatch(getDentsSensibles(true))
            dispatch(getListeSensibilite(undefined))
          }}
          setValueToFalse={()=>{
            dispatch(getDentsSensibles(false))
            dispatch(getListeSensibilite([]))
          }}
        />
      </View>
      {
        dentsSensibles === true &&
        <View>
          <Label
            question="À quoi sont-elles sensibles ?"
            statement={listeSensibilite}
          />
          <View style={[globalStyles.flexRow, {alignItems: "flex-start"}]}>
            <View>
              <CheckBoxComponent title="Au chaud" maladies={listeSensibilite} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getListeSensibilite} />
              <CheckBoxComponent title="Au froid" maladies={listeSensibilite} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getListeSensibilite} />
              <CheckBoxComponent title="Au sucre" maladies={listeSensibilite} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getListeSensibilite} />
            </View>
            <View style={{marginLeft:40}}>
              <CheckBoxComponent title="Au goût acide" maladies={listeSensibilite} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getListeSensibilite} />
              <CheckBoxComponent title="À la mastication" maladies={listeSensibilite} handleChangeValues={addRadioItem} dispatcher={dispatch} reducerFromStore={getListeSensibilite} />
            </View>
          </View>  
        </View>
      }
    </View>
  )
}


export default DentsInfo