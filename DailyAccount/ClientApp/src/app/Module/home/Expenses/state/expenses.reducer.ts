import { createReducer, on } from "@ngrx/store";
import { initialState } from "./expenses.state";
import { loadExpensesSuccess } from "./expenses.action";


const _expensesReducer = createReducer(initialState,on(loadExpensesSuccess, (state: any , action: any) => {
    const expenses = action.expenses.map((expense:any) => ({       
        expenseID: expense.expenseID,
        userID: expense.userID,
        amount: expense.amount,
        date: expense.date,
        description:expense.description
      })); 
    return{
        ...state,
        expenses: expenses,
        lastRow:action.lastRow      
    }
}));

export function expensesReducer(state : any, action : any){
    return _expensesReducer(state,action)
}