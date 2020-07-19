export default function updateMasterData(index,newData){
    return { type: 'Edit_MasterData', index ,payload:newData }
}