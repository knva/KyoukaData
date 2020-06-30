import Vue from 'vue'
import Router from 'vue-router'
import Kyouka from '@/components/Kyouka'
import SelectData from '@/components/SelectData'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Kyouka',
      component: Kyouka
    },{
      path: '/nei',
      name: 'KyoukaData',
      component: SelectData
    }
  ]
})
