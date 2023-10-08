import { createReducer, on } from "@ngrx/store";
import { initialState } from "./deposits.state";
import { loadDepositsSuccess } from "./deposits.action";

const _depositsReducer = createReducer(initialState,on(loadDepositsSuccess, (state: any , action: any) => {
    const deposits = action.deposits.map((deposit:any) => ({       
        depositID: deposit.depositID,
        userID: deposit.userID,
        amount: deposit.amount,
        date: deposit.date,
        description:deposit.description
      }));  
    return{
        ...state,
        deposits: deposits,
        lastRow:action.lastRow      
    }
}));

export function depositsReducer(state : any, action : any){
    return _depositsReducer(state,action)
}