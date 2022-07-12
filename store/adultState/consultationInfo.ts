import { createSlice } from "@reduxjs/toolkit";

export interface ConsultationInfo {
  dateDernierExamDentaire:string | undefined, //
  motifConsultation:string | undefined, //
  difficulteDentiste:boolean | undefined, //
  listeDifficulteDentiste:string[],
}

const initialState: ConsultationInfo = {
  dateDernierExamDentaire:undefined, //
  motifConsultation:undefined, //
  difficulteDentiste:undefined, //
  listeDifficulteDentiste:[],
}

const consultationInfoSlice = createSlice({
  name: 'consultationInfo',
  initialState,
  reducers: {
    resetConsultationInfo: (state) => {
      state.dateDernierExamDentaire = undefined,
      state.motifConsultation = undefined,
      state.difficulteDentiste = undefined,
      state.listeDifficulteDentiste = []
    },
    getDateDernierExamDentaire: (state, action) => {
      state.dateDernierExamDentaire = action.payload
    },
    getMotifConsultation: (state, action) => {
      state.motifConsultation = action.payload
    },
    getDifficulteDentiste: (state, action) => {
      state.difficulteDentiste = action.payload
    },
    getListeDifficulteDentiste: (state, action) => {
      state.listeDifficulteDentiste = action.payload
    }
  }
})

export const {resetConsultationInfo, getDateDernierExamDentaire, getDifficulteDentiste, getListeDifficulteDentiste, getMotifConsultation} = consultationInfoSlice.actions

export default consultationInfoSlice.reducer