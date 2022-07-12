import { createSlice } from "@reduxjs/toolkit";

export type Boisson = {
  boisson: string
  frequence: string
}
export type DentCasse = {
  nomDentCasse: string
  comment: string
}


export interface EtatBuccoDentaireState {
  momentsBrossageDents?:string[] //
  brossageSeul?:  boolean //
  nbRepasParJour?: number //
  sucrerieOuiNon?: boolean //
  frequenceSucrerie?: string
  sodaOuiNon?: boolean //
  sodasListe?: Boisson[]
  cariesAvant?: boolean //
  dentEnleveOuiNon?: boolean //
  dentCasseOuiNon?: boolean //
  dentCasse?: DentCasse[]
  problemeApresTraitementDentaire?: boolean//
  traitementOrtho?: boolean//
  habitudesChild: string[]
  anesthesieLocale?: boolean //
  anesthesieDentaire?: boolean//
  orthophonie?: boolean //
  troubleSommeil: string[] //
  craintesGeneralesOuiNon?: boolean//
  listeCraintesGenerales?: string[]
  craintesDentiste?: boolean//
  remarquesUtilesOuiNon?: boolean//
  remarquesUtiles: string
}

const initialState: EtatBuccoDentaireState = {
  momentsBrossageDents: undefined,
  brossageSeul: undefined,
  nbRepasParJour: undefined,
  sucrerieOuiNon: undefined,
  frequenceSucrerie: "",
  sodaOuiNon: undefined,
  sodasListe: [],
  cariesAvant: undefined,
  dentEnleveOuiNon: undefined,
  dentCasseOuiNon: undefined,
  dentCasse: [],
  problemeApresTraitementDentaire: undefined,
  traitementOrtho: undefined,
  habitudesChild: [],
  anesthesieLocale: undefined,
  anesthesieDentaire: undefined, 
  orthophonie: undefined,
  troubleSommeil: [],
  craintesGeneralesOuiNon: undefined,
  listeCraintesGenerales: [],
  craintesDentiste: undefined,
  remarquesUtilesOuiNon: undefined,
  remarquesUtiles: ""
}

const etatBuccoDentaireSlice = createSlice({
  name: 'etatBuccoDentaire',
  initialState,
  reducers: {
    resetEtatBuccoDentaire: (state) => {
      state.momentsBrossageDents = undefined,
      state.brossageSeul = undefined,
      state.nbRepasParJour = undefined,
      state.sucrerieOuiNon = undefined,
      state.frequenceSucrerie = "",
      state.sodaOuiNon = undefined,
      state.sodasListe = [],
      state.cariesAvant = undefined,
      state.dentEnleveOuiNon = undefined,
      state.dentCasseOuiNon = undefined,
      state.dentCasse = [],
      state.problemeApresTraitementDentaire = undefined,
      state.traitementOrtho = undefined,
      state.habitudesChild = [],
      state.anesthesieLocale = undefined,
      state.anesthesieDentaire = undefined,
      state.orthophonie = undefined,
      state.troubleSommeil = [],
      state.craintesGeneralesOuiNon = undefined,
      state.listeCraintesGenerales = [],
      state.craintesDentiste = undefined,
      state.remarquesUtilesOuiNon = undefined,
      state.remarquesUtiles = ""
    },
    getMomentsBrossageDents: (state, action) => {
      state.momentsBrossageDents = action.payload
    },
    getBrossageSeul: (state, action) => {
      state.brossageSeul = action.payload
    },
    getNbRepasParJour: (state, action) => {
      state.nbRepasParJour = action.payload
    },
    getSucrerieOuiNon: (state, action) => {
      state.sucrerieOuiNon = action.payload
    },
    getFrequenceSucrerie: (state, action) => {
      state.frequenceSucrerie = action.payload
    },
    getSodaOuiNon: (state, action) => {
      state.sodaOuiNon = action.payload
    },
    getSodasListe: (state, action) => {
      state.sodasListe = action.payload
    },
    getCariesAvant: (state, action) => {
      state.cariesAvant = action.payload
    },
    getDentEnleveOuiNon: (state, action) => {
      state.dentEnleveOuiNon = action.payload
    },
    getDentCasseOuiNon: (state, action) => {
      state.dentCasseOuiNon = action.payload
    },
    getDentCasse: (state, action) => {
      state.dentCasse = action.payload
    },
    getProblemeApresTraitementDentaire: (state, action) => {
      state.problemeApresTraitementDentaire = action.payload
    },
    getTraitementOrtho: (state, action) => {
      state.traitementOrtho = action.payload
    },
    getHabitudesChild: (state, action) => {
      state.habitudesChild = action.payload
    },
    getAnesthesieLocale: (state, action) => {
      state.anesthesieLocale = action.payload
    },
    getAnesthesieDentaire: (state, action) => {
      state.anesthesieDentaire = action.payload
    },
    getOrthophonie: (state, action) => {
      state.orthophonie = action.payload
    },
    getTroubleSommeil: (state, action) => {
      state.troubleSommeil = action.payload
    },
    getCraintesGeneralesOuiNon: (state, action) => {
      state.craintesGeneralesOuiNon = action.payload
    },
    getListeCraintesGenerales: (state, action) => {
      state.listeCraintesGenerales = action.payload
    },
    getCraintesDentiste: (state, action) => {
      state.craintesDentiste = action.payload
    },
    getRemarquesUtilesOuiNon: (state, action) => {
      state.remarquesUtilesOuiNon = action.payload
    },
    getRemarquesUtiles: (state, action) => {
      state.remarquesUtiles = action.payload
    },
  }
})

export const {
  resetEtatBuccoDentaire,
  getAnesthesieLocale,
  getAnesthesieDentaire,
  getBrossageSeul,
  getCariesAvant,
  getCraintesDentiste,
  getCraintesGeneralesOuiNon, 
  getDentCasse,
  getDentCasseOuiNon,
  getDentEnleveOuiNon, 
  getFrequenceSucrerie, 
  getHabitudesChild,
  getListeCraintesGenerales,
  getMomentsBrossageDents,
  getNbRepasParJour,
  getOrthophonie,
  getProblemeApresTraitementDentaire, 
  getRemarquesUtiles, 
  getRemarquesUtilesOuiNon,
  getSodaOuiNon,
  getSodasListe,
  getSucrerieOuiNon,
  getTraitementOrtho,
  getTroubleSommeil,
} = etatBuccoDentaireSlice.actions

export default etatBuccoDentaireSlice.reducer