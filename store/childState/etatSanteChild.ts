import { createSlice } from "@reduxjs/toolkit";

export type MedicamentsChild = {
  nomMedicament: string
  frequence: string
}

export type MaladieGraveChild = {
  nomMaladie: string
  age: number
}
export type OperationChild = {
  cause: string
  age: number
}

export interface EtatDeSanteChildState {
  problemeSante?: boolean
  surveillanceMedicale?: boolean
  periodeSurveillanceMedicale?: string
  raisonSurveillanceMedicale?: string
  priseMedicamentsChild?: boolean
  listeMedicamentsChild?: MedicamentsChild[]
  allergiesMedicamentsOuiNon?: boolean
  listeAllergiesMedicaments?: string[]
  maladieGraveOuiNon?: boolean
  listeMaladiesGraves?: MaladieGraveChild[]
  operationOuiNon?: boolean
  listeOperations? : OperationChild[]
  autresAntecedentsMedicauxOuiNon?: boolean
  autresAntecedentsMedicaux : string
}

const initialState: EtatDeSanteChildState = {
  problemeSante: undefined,
  surveillanceMedicale: undefined,
  periodeSurveillanceMedicale: "",
  raisonSurveillanceMedicale: "",
  priseMedicamentsChild: undefined,
  listeMedicamentsChild: [],
  allergiesMedicamentsOuiNon: undefined,
  listeAllergiesMedicaments: [],
  maladieGraveOuiNon: undefined,
  listeMaladiesGraves: [],
  operationOuiNon: undefined,
  listeOperations: [],
  autresAntecedentsMedicauxOuiNon: undefined,
  autresAntecedentsMedicaux : ""
}

const etatDeSanteChildSlice = createSlice({
  name: 'etatDeSanteChild',
  initialState,
  reducers: {
    resetEtatDeSanteChild: (state) => {
      state.problemeSante = undefined,
      state.surveillanceMedicale = undefined,
      state.periodeSurveillanceMedicale = "",
      state.raisonSurveillanceMedicale = "",
      state.priseMedicamentsChild = undefined,
      state.listeMedicamentsChild = [],
      state.allergiesMedicamentsOuiNon = undefined,
      state.listeAllergiesMedicaments = [],
      state.maladieGraveOuiNon = undefined,
      state.listeMaladiesGraves = [],
      state.operationOuiNon = undefined,
      state.listeOperations = [],
      state.autresAntecedentsMedicauxOuiNon= undefined,
      state.autresAntecedentsMedicaux = ""
    },
    getProblemeSante: (state, action) => {
      state.problemeSante = action.payload
    },
    getSurveillanceMedicale: (state, action) => {
      state.surveillanceMedicale = action.payload
    },
    getPeriodeSurveillanceMedicale: (state, action) => {
      state.periodeSurveillanceMedicale = action.payload
    },
    getRaisonSurveillanceMedicale: (state, action) => {
      state.raisonSurveillanceMedicale = action.payload
    },
    getPriseMedicamentsChild: (state, action) => {
      state.priseMedicamentsChild = action.payload
    },
    getListeMedicamentsChild: (state, action) => {
      state.listeMedicamentsChild = action.payload
    },
    getAllergiesMedicamentsOuiNon: (state, action) => {
      state.allergiesMedicamentsOuiNon = action.payload
    },
    getListeAllergiesMedicaments: (state, action) => {
      state.listeAllergiesMedicaments = action.payload
    },
    getMaladieGraveOuiNon: (state, action) => {
      state.maladieGraveOuiNon = action.payload
    },
    getListeMaladiesGraves: (state, action) => {
      state.listeMaladiesGraves = action.payload
    },
    getOperationOuiNon: (state, action) => {
      state.operationOuiNon = action.payload
    },
    getListeOperations: (state, action) => {
      state.listeOperations = action.payload
    },
    getAutresAntecedentsMedicauxOuiNon: (state, action) => {
      state.autresAntecedentsMedicauxOuiNon = action.payload
    },
    getAutresAntecedentsMedicaux: (state, action) => {
      state.autresAntecedentsMedicaux = action.payload
    }
  }
})

export const {
  resetEtatDeSanteChild, 
  getPeriodeSurveillanceMedicale,
  getAllergiesMedicamentsOuiNon, 
  getAutresAntecedentsMedicaux, 
  getAutresAntecedentsMedicauxOuiNon, 
  getListeAllergiesMedicaments, 
  getListeMaladiesGraves, 
  getListeMedicamentsChild, 
  getListeOperations, 
  getMaladieGraveOuiNon, 
  getOperationOuiNon, 
  getPriseMedicamentsChild, 
  getProblemeSante, 
  getRaisonSurveillanceMedicale, 
  getSurveillanceMedicale
} = etatDeSanteChildSlice.actions

export default etatDeSanteChildSlice.reducer