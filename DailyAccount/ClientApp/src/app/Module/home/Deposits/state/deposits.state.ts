import { Deposit } from "src/app/interfaces/IDeposit";

export interface DepositsState {
    deposits: Deposit[];
    lastRow: number | undefined;
}
export const initialState : DepositsState = {
    deposits: [],
    lastRow:undefined
}