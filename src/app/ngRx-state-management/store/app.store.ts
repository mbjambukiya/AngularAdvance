import { sharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer
}