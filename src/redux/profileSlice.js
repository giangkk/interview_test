import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    fullname: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    street: '',
    avatar: '',
    gender: '',
    dob: '',
    hobits:''
  },
  reducers: {
    setValueName: (state,action) => {
      state.fullname = action.payload.fullname
    },
    setValueEmail: (state,action) => {
      state.email = action.payload.email
    },
    setValuePhone: (state,action) => {
      state.phone = action.payload.phone
    },
    setValueCity: (state,action) => {
      state.city = action.payload.city
    },
    setValueDistrict: (state,action) => {
      state.district = action.payload.district
    },
    setValueWard: (state,action) => {
      state.ward = action.payload.ward
    },
    setValueStreet: (state,action) => {
      state.street = action.payload.street
    },
    setValueAvatar: (state,action) => {
      state.avatar = action.payload
    },
    setValueGender: (state,action) => {
      state.gender = action.payload
    },
    setValueDob: (state,action) => {
      state.dob = action.payload
    },
    setValueHobits: (state,action) => {
      state.hobits = action.payload
    },

  }
})