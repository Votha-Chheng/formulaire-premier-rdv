import { View } from 'react-native'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Label from '../componentsWithProps/Label'
import RadioComponent from '../componentsWithProps/RadioComponent'
import { getAllergiesMedicamentsOuiNon, getListeAllergiesMedicaments } from '../../store/childState/etatSanteChild'
import ComponentAutres from '../componentsWithProps/ComponentAutres'

const AllergiesMedicChild: FC = () => {

  const {allergiesMedicamentsOuiNon, listeAllergiesMedicaments} = useSelector((state: RootState) => state.etatDeSanteChild)

  const dispatch = useDispatch()

  return (
    <View>
      <View>
        <Label question="A-t-il des allergies médicamenteuses (pénicilline, antibiotiques, autres médicaments) " statement={allergiesMedicamentsOuiNon} />
        <RadioComponent
          valueState={allergiesMedicamentsOuiNon}
          setValueToTrue={()=>{
            dispatch(getAllergiesMedicamentsOuiNon(true))
            dispatch(getListeAllergiesMedicaments(undefined))

          }}
          setValueToFalse={()=>{
            dispatch(getAllergiesMedicamentsOuiNon(false))
            dispatch(getListeAllergiesMedicaments([]))
            
          }}
        />
      </View>
      {
        allergiesMedicamentsOuiNon === true &&
        <ComponentAutres
          stateArray={listeAllergiesMedicaments} 
          reducerFromStore={getListeAllergiesMedicaments} 
          extraItem="À quel(s) médicament est-il allergique ?" 
          placeHolder="Écrivez ici le médicament..."
          width={450}
        />
      }
    </View>
  )
}

export default AllergiesMedicChild