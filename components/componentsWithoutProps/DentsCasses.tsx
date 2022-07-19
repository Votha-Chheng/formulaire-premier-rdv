import { View } from 'react-native'
import React, { FC } from 'react'
import Label from '../componentsWithProps/Label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import RadioComponent from '../componentsWithProps/RadioComponent'
import { getDentCasse, getDentCasseOuiNon } from '../../store/childState/etatBuccoDentaire'
import ComponentAutresForObject from '../componentsWithProps/ComponentAutresForObject'

const DentsCasses: FC = () => {

  const {dentCasseOuiNon, dentCasse} = useSelector((state: RootState) => state.etatBuccoDentaireChild)

  const dispatch = useDispatch()

  return (
    <View style={{marginBottom:20}}>
      <View>
        <Label
          statement={dentCasseOuiNon}
          question="S’est-il déjà cassé une ou plusieurs dents ?"
        />
        <RadioComponent
          valueState={dentCasseOuiNon}
          setValueToFalse={()=> {
            dispatch(getDentCasseOuiNon(false))
            dispatch(getDentCasse([]))
          }}
          setValueToTrue={()=> {
            dispatch(getDentCasseOuiNon(true))
            dispatch(getDentCasse(undefined))
          }}
        />
      </View>
      {
        dentCasseOuiNon === true &&
        <ComponentAutresForObject
          reducerFromStore={getDentCasse}
          valueForFilter = "nomDentCasse"
          valueSide = "comment"
          questionForLabel="Quel(s) dent(s) s'est-il cassé et comment ?"
          arrayListe={dentCasse}
          widthFirstInput={280}
          widthSecondInput={425}
          liaison="en"
          unit=""
          placeHolderOne = "Type de dent"
          placeHolderTwo = "Comment l'a-t-il cassé ?"
        />
      }
    </View>
  )
}

export default DentsCasses