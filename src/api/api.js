import Http from '@/api/Http';

// 默认页面查询
export const defsel = (params) => new Http().require({api:'/default',methods:"GET",param:params});
// 名称查询
export const allsel = (apipath,params) => new Http().require({api:'/'+apipath,param:params});
// 挡位查询
export const linesel = (params) => new Http().require({api:'/line',param:params});