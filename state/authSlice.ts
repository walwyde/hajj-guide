
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type User = {
  id: string
  fullName: string
  email: string
  role: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        user: User;
        loading?: boolean;
        isAuthenticated: boolean;
      }>,
    ) => {
      state.user = action.payload.user,
      state.loading = action.payload.loading || false,
      state.isAuthenticated = action.payload.isAuthenticated
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    logOut: (state) => {
      state.user = null,
      state.loading = false,
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, setLoading, logOut } = authSlice.actions
export default authSlice
