import { createSlice } from "@reduxjs/toolkit"

export interface HabitudeState {
  habitudes:string[],
  mauvaiseHaleine : boolean | undefined, //
}

const initialState: HabitudeState = {
  habitudes  :[],
  mauvaiseHaleine : undefined, //

} 

const habitudeSlice = createSlice ({
  name:"habitudesInfo",
  initialState,
  reducers : {
    resetHabitudesInfo: (state) => {
      state.habitudes = [],
      state.mauvaiseHaleine = undefined //
    },
    getHabitudes : (state, action) =>{
      state.habitudes = action.payload
    },
    getMauvaiseHaleine : (state, action) =>{
      state.mauvaiseHaleine = action.payload
    }
  }
})

export const { resetHabitudesInfo, getHabitudes, getMauvaiseHaleine} = habitudeSlice.actions
export default habitudeSlice.reducer