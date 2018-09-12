const routers = [{
  path: '/',
  name: "presidentMain",
  component: (resolve) => require(['@/views/layouts/presidentMain.vue'], resolve),
  children: [
    //workLoad
    {
      path: '/work_load_view',
      name: 'workLoadView',
      component: (resolve) => require(['@/views/presidentMain/workLoad/workLoadView.vue'], resolve)
    }, {
      path: '/work_load_depart',
      name: 'workLoadDepart',
      component: (resolve) => require(['@/views/presidentMain/workLoad/workLoadDepart.vue'], resolve)
    }, {
      path: '/work_load_hosp',
      name: 'workLoadHosp',
      component: (resolve) => require(['@/views/presidentMain/workLoad/workLoadHosp.vue'], resolve)
    }, {
      path: '/work_load_operation',
      name: 'workLoadOperation',
      component: (resolve) => require(['@/views/presidentMain/workLoad/workLoadOperation.vue'], resolve)
    }, 
    //feeManage
    {
      path: '/fee_manage_view',
      name: 'feeManageView',
      component: (resolve) => require(['@/views/presidentMain/feeManage/feeManageView.vue'], resolve)
    }, {
      path: '/fee_manage_total',
      name: 'feeManageTotal',
      component: (resolve) => require(['@/views/presidentMain/feeManage/feeManageTotal.vue'], resolve)
    }, {
      path: '/fee_manage_medic',
      name: 'feeManageMedic',
      component: (resolve) => require(['@/views/presidentMain/feeManage/feeManageMedic.vue'], resolve)
    }, {
      path: '/fee_manage_other',
      name: 'feeManageOther',
      component: (resolve) => require(['@/views/presidentMain/feeManage/feeManageOther.vue'], resolve)
    }, {
      path: '/fee_manage_out',
      name: 'feeManageOut',
      component: (resolve) => require(['@/views/presidentMain/feeManage/feeManageOut.vue'], resolve)
    }, 
    //potential
    {
      path: '/potential_tech',
      name: 'potentialTech',
      component: (resolve) => require(['@/views/presidentMain/potential/potentialTech.vue'], resolve)
    }, {
      path: '/potential_material',
      name: 'potentialMaterial',
      component: (resolve) => require(['@/views/presidentMain/potential/potentialMaterial.vue'], resolve)
    }
  ]
  // path: '/',
  // name: "demoIndex",
  // component: (resolve) => require(['@/views/demoIndex.vue'], resolve)
}];
export default routers;
