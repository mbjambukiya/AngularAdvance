import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { loginFailed, loginStart, loginSuccess } from "./auth.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { setErrorMessage, setLoadingSpinner } from "../../store/shared/shared.action";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {
    constructor(private action$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router) { }

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.userSignIn({ email: action.email, password: action.password }).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        const user = data
                        return loginSuccess({ user });
                    }),
                    catchError((err) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        // return of(err.error.message)
                        // return of(err.message)
                        // return of(loginFailed({ err: err.message }))
                        return of(setErrorMessage({ message: err.message }))
                    })
                )
            })
        )
    })

    loginRedirect$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginSuccess),
            tap((action) => {
                this.router.navigate(['/'])
            })
        )
    }, { dispatch: false })
}