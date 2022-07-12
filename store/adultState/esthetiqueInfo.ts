import { createSlice } from "@reduxjs/toolkit"

export interface EsthetiqueState {
  dentsMemeCouleurs: boolean | undefined
  souhaitDentsPlusBlanches: boolean | undefined //
  satisfactionDentsGencives: boolean | undefined //
  mainDevantBoucheSourire: boolean | undefined, //
  souhaitsChangementOuiNon:boolean | undefined //
  souhaitsChangement:string
}

const initialState: EsthetiqueState = {
  dentsMemeCouleurs : undefined,
  souhaitDentsPlusBlanches : undefined, //
  satisfactionDentsGencives: undefined, //
  mainDevantBoucheSourire : undefined, //
  souhaitsChangementOuiNon:undefined, //
  souhaitsChangement:"",

} 

const gencivesSlice = createSlice ({
  name:"esthetiqueInfo",
  initialState,
  reducers : {
    resetEsthetique: (state) => {
      state.dentsMemeCouleurs = undefined,
      state.souhaitDentsPlusBlanches = undefined, //
      state.satisfactionDentsGencives = undefined, //
      state.mainDevantBoucheSourire = undefined, //
      state.souhaitsChangementOuiNon = undefined, //
      state.souhaitsChangement = ""
    },
    getDentsMemeCouleurs : (state, action) =>{
      state.dentsMemeCouleurs = action.payload
    },
    getSouhaitDentsPlusBlanches : (state, action) =>{
      state.souhaitDentsPlusBlanches = action.payload
    },
    getSatisfactionDentsGencives : (state, action) =>{
      state.satisfactionDentsGencives = action.payload
    },
    getMainDevantBoucheSourire : (state, action) =>{
      state.mainDevantBoucheSourire = action.payload
    },
    getSouhaitsChangementOuiNon : (state, action) =>{
      state.souhaitsChangementOuiNon = action.payload
    },
    getSouhaitsChangement: (state, action) =>{
      state.souhaitsChangement= action.payload
    }
  }
})

export const { resetEsthetique, getDentsMemeCouleurs, getSouhaitDentsPlusBlanches, getSatisfactionDentsGencives, getMainDevantBoucheSourire, getSouhaitsChangementOuiNon, getSouhaitsChangement} = gencivesSlice.actions
export default gencivesSlice.reducer