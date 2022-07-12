import { createSlice } from "@reduxjs/toolkit"

export interface HygieneDentaireState {
  typeBrosseADent:string[] |undefined, //
  momentsBrossageDents:string[] | undefined, //
  rythmeChangementBrosseAdent:string | undefined, //
  utilisationFilDentaireBrossette: boolean | undefined, //
}

const initialState: HygieneDentaireState = {
  typeBrosseADent:undefined, //
  momentsBrossageDents:undefined, //
  rythmeChangementBrosseAdent:undefined, //
  utilisationFilDentaireBrossette:undefined, //

} 

const hygieneDentaireSlice = createSlice ({
  name:"hygieneDentaire",
  initialState,
  reducers : {
    resetHygieneDentaire: (state) => {
      state.typeBrosseADent = undefined, //
      state.momentsBrossageDents = undefined, //
      state.rythmeChangementBrosseAdent = undefined, //
      state.utilisationFilDentaireBrossette = undefined //
    },
    getTypeBrosseADent : (state, action) =>{
      state.typeBrosseADent = action.payload
    },
    getMomentsBrossageDents : (state, action) =>{
      state.momentsBrossageDents = action.payload
    },
    getRythmeChangementBrosseAdent : (state, action) =>{
      state.rythmeChangementBrosseAdent = action.payload
    },
    getUtilisationFilDentaireBrossette : (state, action) =>{
      state.utilisationFilDentaireBrossette = action.payload
    }
  }
})

export const { resetHygieneDentaire, getTypeBrosseADent, getMomentsBrossageDents, getRythmeChangementBrosseAdent, getUtilisationFilDentaireBrossette} = hygieneDentaireSlice.actions
export default hygieneDentaireSlice.reducer