import { createSlice } from "@reduxjs/toolkit"

export interface GenciveState {
  dentsEcartes:boolean | undefined, //
  saignementGencive:boolean | undefined, //
  traitementGencive:boolean | undefined, //
  traitementGencivesPar:string[] | undefined,
}

const initialState: GenciveState = {
  dentsEcartes:undefined, //
  saignementGencive:undefined, //
  traitementGencive:undefined, //
  traitementGencivesPar:[],

} 

const gencivesSlice = createSlice ({
  name:"gencives",
  initialState,
  reducers : {
    resetGencives: (state:any) => {
      state.dentsEcartes  =  undefined, //
      state.saignementGencive = undefined, //
      state.traitementGencive = undefined, //
      state.traitementGencivesPar = undefined //
    },
    getDentsEcartes : (state, action) =>{
      state.dentsEcartes = action.payload
    },
    getSaignementGencive : (state, action) =>{
      state.saignementGencive = action.payload
    },
    getTraitementGencive : (state, action) =>{
      state.traitementGencive = action.payload
    },
    getTraitementGencivesPar : (state, action) =>{
      state.traitementGencivesPar = action.payload
    }
  }
})

export const { resetGencives, getDentsEcartes, getSaignementGencive, getTraitementGencive, getTraitementGencivesPar} = gencivesSlice.actions
export default gencivesSlice.reducer