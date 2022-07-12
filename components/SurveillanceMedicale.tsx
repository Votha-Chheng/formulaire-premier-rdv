import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import RadioComponent from './RadioComponent'
import { getPeriodeSurveillanceMedicale, getRaisonSurveillanceMedicale, getSurveillanceMedicale } from '../store/childState/etatSanteChild'
import AddText from './AddText'
import LabelInputForText from './LabelInputFortText'

const SurveillanceMedicale: FC = () => {

  const {surveillanceMedicale, raisonSurveillanceMedicale} = useSelector((state: RootState) => state.etatDeSanteChild)
  const dispatch = useDispatch()

  return (
    <View>
      <View>
        <Label question="Est-il sous surveillance médicale ?" statement={surveillanceMedicale} />
        <RadioComponent
          valueState={surveillanceMedicale}
          setValueToTrue={()=>{
            dispatch(getSurveillanceMedicale(true))
            dispatch(getRaisonSurveillanceMedicale(undefined))
            dispatch(getPeriodeSurveillanceMedicale(undefined))
          }}
          setValueToFalse={()=>{
            dispatch(getSurveillanceMedicale(false))
            dispatch(getRaisonSurveillanceMedicale(""))
            dispatch(getPeriodeSurveillanceMedicale(""))
          }}
        />
      </View>
      {
        surveillanceMedicale == true &&
        <View>
          <AddText
            dispatcher={dispatch} 
            reducerFromStore={getRaisonSurveillanceMedicale} 
            statement={raisonSurveillanceMedicale} 
            questionForLabel="Pourquoi est-il sous surveillance médicale ?" 
            placeHolder="Ecrivez ici la raison..."
          />

          <LabelInputForText
            question="Depuis combien de temps est-il sous surveillance médicale ?" 
            reducerFromStore={getPeriodeSurveillanceMedicale}
            flexRow={false} 
            minLengthForInput={1}
          />
        </View>
      }
      
    </View>
  )
}

export default SurveillanceMedicale