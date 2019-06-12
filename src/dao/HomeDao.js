import BaseDao from './BaseDao';

class Home extends BaseDao{
    constructor(){
        super()
    }
    getListData(){
        return this.request({
            url:'/history',
            method:'GET',
        })
    }
}

export default new Home()