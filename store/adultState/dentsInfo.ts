import { createSlice } from "@reduxjs/toolkit"

export interface DentsInfoState {
  dentsExtraites:boolean | undefined, //
  causesExtraction : string[] | undefined,
  dentsRemplacees:boolean | undefined,
  moyenDentRemplacement : string[] ,
  raisonsNonRemplacementDentsExtraites : string | undefined,
  sensationProthesesActuelles:string | undefined,
  utilisationMetaux:boolean | undefined, //
  preferencesUtilisationMetaux:string | undefined,
  dentsSensibles:boolean | undefined, //
  listeSensibilite : string[] | undefined,
}

const initialState: DentsInfoState = {
  dentsExtraites:undefined, //
  causesExtraction : [],
  dentsRemplacees:undefined,
  moyenDentRemplacement : [],
  raisonsNonRemplacementDentsExtraites : "",
  sensationProthesesActuelles:undefined,
  utilisationMetaux:undefined, //
  preferencesUtilisationMetaux:"",
  dentsSensibles:undefined, //
  listeSensibilite : [],
}

const dentsInfosSlice = createSlice({
  name: "dentsInfo",
  initialState,
  reducers: {
    resetDentsInfo : (state) => {
      state.dentsExtraites = undefined, //
      state.causesExtraction = [],
      state.dentsRemplacees = undefined,
      state.moyenDentRemplacement = [],
      state.raisonsNonRemplacementDentsExtraites = "",
      state.sensationProthesesActuelles = undefined,
      state.utilisationMetaux = undefined, //
      state.preferencesUtilisationMetaux = "",
      state.dentsSensibles = undefined, //
      state.listeSensibilite = []
    },
    getDentsExtraites : (state, action) =>{
      state.dentsExtraites = action.payload
    },
    getCausesExtraction : (state, action) =>{
      state.causesExtraction = action.payload
    },
    getDentsRemplacees : (state, action) =>{
      state.dentsRemplacees = action.payload
    },
    getMoyenDentRemplacement : (state, action) =>{
      state.moyenDentRemplacement = action.payload
    },
    getRaisonsNonRemplacementDentsExtraites : (state, action) =>{
      state.raisonsNonRemplacementDentsExtraites = action.payload
    },
    getSensationProthesesActuelles : (state, action) =>{
      state.sensationProthesesActuelles = action.payload
    },
    getUtilisationMetaux : (state, action) =>{
      state.utilisationMetaux = action.payload
    },
    getPreferencesUtilisationMetaux : (state, action) =>{
      state.preferencesUtilisationMetaux = action.payload
    },
    getDentsSensibles : (state, action) =>{
      state.dentsSensibles = action.payload
    },
    getListeSensibilite : (state, action) =>{
      state.listeSensibilite = action.payload
    }
  }
})

export const {resetDentsInfo, getDentsExtraites, getCausesExtraction, getDentsRemplacees, getMoyenDentRemplacement, getRaisonsNonRemplacementDentsExtraites, getSensationProthesesActuelles, getUtilisationMetaux, getPreferencesUtilisationMetaux, getDentsSensibles, getListeSensibilite} = dentsInfosSlice.actions

export default dentsInfosSlice.reducer