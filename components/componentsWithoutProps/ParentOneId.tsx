import { View } from 'react-native'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import SubTitles from '../componentsWithProps/SubTitles'
import { getParentOne } from '../../store/childState/identityAccompagnant'
import InfoParent from '../componentsWithProps/InfoParent'

const ParentOneId: FC = () => {

  const {parentOne, responsablesParents} = useSelector((state: RootState) => state.identityAccompagnant)


  return (
    <View>
      <SubTitles title={`${responsablesParents !== undefined && responsablesParents === true ? "PARENT 1" : "RESPONSABLE LÉGAL 1"}`} />
      <InfoParent whichParent={parentOne} reducerFromStore={getParentOne} />
    </View>
  )
}

export default ParentOneId