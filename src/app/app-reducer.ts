import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice =createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state,  action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state,  action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setInitializedAC(state,  action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
});
export const appReducer=slice.reducer;
export const {setAppStatusAC, setAppErrorAC, setInitializedAC}= slice.actions;

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}));
        } else {
        }

    }).finally(()=> {
        dispatch(setInitializedAC({isInitialized:true}))
    })
}


// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-INITIALIZED':
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return {...state}
//     }
// }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

// export const setInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)
// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)




