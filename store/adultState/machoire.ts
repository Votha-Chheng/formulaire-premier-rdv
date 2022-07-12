import { createSlice } from "@reduxjs/toolkit"

export interface MachoireState {
  serrementGrincementDents:boolean | undefined, //
  craquementClaquementDouleurOuvertureMachoire:boolean | undefined, //
  difficulteAvalerMacherCoteUnique:boolean | undefined, //
}

const initialState: MachoireState = {
  serrementGrincementDents:undefined, //
  craquementClaquementDouleurOuvertureMachoire:undefined, //
  difficulteAvalerMacherCoteUnique:undefined, //

} 

const machoireSlice = createSlice ({
  name:"machoire",
  initialState,
  reducers : {
    resetMachoire: (state) => {
      state.serrementGrincementDents  =  undefined, //
      state.craquementClaquementDouleurOuvertureMachoire = undefined, //
      state.difficulteAvalerMacherCoteUnique = undefined //
    },
    getSerrementGrincementDents : (state, action) =>{
      state.serrementGrincementDents = action.payload
    },
    getCraquementClaquementDouleurOuvertureMachoire : (state, action) =>{
      state.craquementClaquementDouleurOuvertureMachoire = action.payload
    },
    getDifficulteAvalerMacherCoteUnique : (state, action) =>{
      state.difficulteAvalerMacherCoteUnique = action.payload
    }
  }
})

export const { resetMachoire, getSerrementGrincementDents, getCraquementClaquementDouleurOuvertureMachoire, getDifficulteAvalerMacherCoteUnique} = machoireSlice.actions
export default machoireSlice.reducer