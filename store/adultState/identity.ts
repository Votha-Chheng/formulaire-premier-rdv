import { createSlice } from "@reduxjs/toolkit";

export interface IdentityState {
  dr:string | undefined,
  dateRdv : string | undefined,
  genre : string | undefined,
  nom : string | undefined, //
  prenom:string | undefined, //
  dateDeNaissance:string | undefined, //
  tel:string | undefined, //
  email:string | undefined, //
  profession:string | undefined, //
  adresse:string | undefined, //
  codePostal:number | undefined, //
  ville:string | undefined, //
}

const initialState: IdentityState = {
  dr:"Sylvie MA-Francin",
  dateRdv : new Date(Date.now()).toString(),
  genre : "Madame",
  nom : undefined, //
  prenom:undefined, //
  dateDeNaissance:undefined, //
  tel:undefined, //
  email:undefined, //
  profession:undefined, //
  adresse:undefined, //
  codePostal:undefined, //
  ville:undefined, //
}

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    resetIdentity: (state) => {
      state.dateRdv  =  new Date(Date.now()).toString(),
      state.dr = "Sylvie MA-Francin",
      state.genre  =  "Madame",
      state.nom  =  undefined, //
      state.prenom = undefined, //
      state.dateDeNaissance = undefined, //
      state.tel = undefined, //
      state.email = undefined, //
      state.profession = undefined, //
      state.adresse = undefined, //
      state.codePostal = undefined, //
      state.ville = undefined //
    },
    getDr: (state, action) => {
      state.dr = action.payload
    },
    getNom: (state, action) => {
      state.nom = action.payload
    },
    getPrenom: (state, action) => {
      state.prenom = action.payload
    },
    getGenre: (state, action) => {
      state.genre = action.payload
    },
    getDateRdv: (state, action) => {
      state.dateRdv = action.payload
    },
    getDateDeNaissance: (state, action) => {
      state.dateDeNaissance = action.payload
    },
    getTel: (state, action) => {
      state.tel = action.payload
    },
    getEmail: (state, action) => {
      state.email = action.payload
    },
    getProfession: (state, action) => {
      state.profession = action.payload
    },
    getAdresse: (state, action) => {
      state.adresse = action.payload
    },
    getCodePostal: (state, action) => {
      state.codePostal = action.payload
    },
    getVille: (state, action) => {
      state.ville = action.payload
    }
  }
})

export const {resetIdentity, getDr, getNom, getPrenom, getGenre, getDateRdv, getDateDeNaissance, getTel, getEmail, getProfession, getAdresse, getCodePostal, getVille} = identitySlice.actions

export default identitySlice.reducer