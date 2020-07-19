export default function masterData(state=[],action){
    
    if(action.type === 'Update_MasterData'){
        return [
            ...state,
            action.payload
        ]
    }
    if(action.type === 'Edit_MasterData'){
        debugger;
        return [
            ...state.slice(0, action.index),
            {...action.payload},
            ...state.slice(action.index + 1)
          ];
    }
    else{
        return state;
    }
}