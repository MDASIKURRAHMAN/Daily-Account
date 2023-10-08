import { Expenses } from "src/app/interfaces/IExpenses";

export interface ExpensesState {
    expenses: Expenses[];
    lastRow: number | undefined;
}
export const initialState : ExpensesState = {
    expenses: [ ],
    lastRow:  undefined
}