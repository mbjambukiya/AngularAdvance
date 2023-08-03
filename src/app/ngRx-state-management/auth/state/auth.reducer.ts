import { createReducer, on } from "@ngrx/store"
import { initialState } from "./auth.state"
import { loginFailed, loginSuccess } from "./auth.action";

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(loginFailed, (state, action) => {
        // console.log(action)
        return {
            ...state,
            error: action.err
        }
    })
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action)
}