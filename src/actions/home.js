import HomeDao from '../dao/HomeDao';


export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_PAGELOADING = 'UPDATE_PAGELOADING';
export const CHANGE_DATA = 'CHANGE_DATA';

export const updateData = data =>{
    return {
        type: UPDATE_DATA,
        data
    }
};

export const updateLoading = bol =>{
    return {
        type: UPDATE_PAGELOADING,
        bol
    }
};

export const loadData = ()=>{
    return (dispatch,getState) => {
        HomeDao.getListData().then(data => {
            dispatch(updateData(data));
        })
            .finally(()=>{
                dispatch(updateLoading(false))
            })
    }
};
export const changeData = (num,index) =>{
    return {
        type: CHANGE_DATA,
        data: {num,index}
    }
};