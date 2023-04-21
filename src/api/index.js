import Vue from 'vue';
const { HOST, HOST2 } = window.$config;
// const BASEURL = process.env.NODE_ENV === 'development' ? '/hbadmin' : HOST;
const BASEURL = HOST;
const BASEURL2 = HOST2;

const OPTIONS = {
    // ---登录---
    login: BASEURL + '/login',
    getModules: BASEURL + '/login/info',

    // ---每日发券---
    getDailyCouponList: BASEURL + '/couponDailySend/list',
    getDailyCouponDetail: BASEURL + '/couponDailySend/detail',
    sendDailyCoupon: BASEURL + '/couponDailySend/create',
    delDailyCoupon: BASEURL + '/couponDailySend/delete',

    // ---批量发券---
    getBatchCouponList: BASEURL + '/wechatCouponBatchSend/list',
    uploadCouponExcel: BASEURL + '/wechatCouponBatchSend/import',
    uploadCouponExcelTongue: BASEURL + '/wechatCouponBatchSend/importTongue',
    uploadCouponExcelTableReg: BASEURL + '/wechatCouponBatchSend/importTableReg',

    // ---自动批量发券---
    getAutoBatchCouponList: BASEURL + '/wxCouponAutoBatchSendPlan/list',
    createAutoBatchCoupon: BASEURL + '/wxCouponAutoBatchSendPlan/createPlan',
    editAutoBatchCoupon: BASEURL + '/wxCouponAutoBatchSendPlan/editStockIds',
    getAutoBatchCouponDetail: BASEURL + '/wxCouponAutoBatchSendPlan/detail',
    getAutoBatchCouponTasks: BASEURL + '/wxCouponAutoBatchSendPlan/getTaskList',
    getProductIdsAmount: BASEURL + '/wxCouponAutoBatchSendPlan/countByProductIds',

    // ---批量发送短信---
    getMessageList: BASEURL + '/smsBatchSend/list',
    uploadMessageDDT: BASEURL + '/smsBatchSend/txImport',
    uploadMessageWS: BASEURL + '/smsBatchSend/txTongueImport',
	getLongShortLink: BASEURL + '/intf/wx/http/genShortChain',

    // ---批量发送短信计划---
    getMessagePlanList: BASEURL + '/smsBatchSendPlan/list',
    createMessagePlan: BASEURL + '/smsBatchSendPlan/createPlan',
    getMessagePlanAmount: BASEURL + '/smsBatchSendPlan/countPlanNum',
    uploadMessagePlanDDT: BASEURL + '/smsBatchSend/importPlan',
    uploadMessagePlanWS: BASEURL + '/smsBatchSend/importPlanTongue',

    // ---黑名单列表---
    getBlackList: BASEURL + '/couponBlackList/list',
    createBlackUser: BASEURL + '/couponBlackList/create',
    deleteBlackUser: BASEURL + '/couponBlackList/delete',
    uploadBlackListExcel: BASEURL + '/couponBlackList/upload',

    // ---聚合页配置---
    // 素材类别
    getMaterialTypeList: BASEURL2 + '/mbuy/intf/aggregatePageMaterialType/list',
    createMaterialType: BASEURL2 + '/mbuy/intf/aggregatePageMaterialType/create',
    delMaterialType: BASEURL2 + '/mbuy/intf/aggregatePageMaterialType/delete',

    // 素材列表
    getMaterialList: BASEURL2 + '/mbuy/intf/aggregatePageMaterial/list',
    getMaterialDetail: BASEURL2 + '/mbuy/intf/aggregatePageMaterial/detail',
    createMaterial: BASEURL2 + '/mbuy/intf/aggregatePageMaterial/create',
    delMaterial: BASEURL2 + '/mbuy/intf/aggregatePageMaterial/delete',
    getMaterialProductInfo: BASEURL2 + '/mbuy/intf/aggregatePageMaterial/getProductInfo',

    // 活动聚合页
    getAggregatePageList: BASEURL2 + '/mbuy/intf/aggregatePage/list',
    getAggregatePageDetail: BASEURL2 + '/mbuy/intf/aggregatePage/info',
    createAggregatePage: BASEURL2 + '/mbuy/intf/aggregatePage/create',
    delAggregatePage: BASEURL2 + '/mbuy/intf/aggregatePage/delete',

    // 广告品聚合页模板
    getAdAggregatePageTemplateList: BASEURL2 + '/mbuy/intf/aggregatePageTemplate/list',
    getAdAggregatePageTemplateInfo: BASEURL2 + '/mbuy/intf/aggregatePageTemplate/info',
    createAdAggregateTemplatePage: BASEURL2 + '/mbuy/intf/aggregatePageTemplate/create',
    delAdAggregateTemplatePage: BASEURL2 + '/mbuy/intf/aggregatePageTemplate/delete',

    // 广告品聚合页
    getAdAggregatePageList: BASEURL2 + '/mbuy/intf/adAggregatePage/list',
    getAdAggregatePageInfo: BASEURL2 + '/mbuy/intf/adAggregatePage/info',
	getAdAggregatePageDetail: BASEURL2 + '/mbuy/intf/adAggregatePage/detail',
    createAdAggregatePage: BASEURL2 + '/mbuy/intf/adAggregatePage/create',
    delAdAggregatePage: BASEURL2 + '/mbuy/intf/adAggregatePage/delete',
	
	getAdAggregatePageProductCn: BASEURL2 + '/mbuy/intf/adAggregatePage/getRecommendRuleList',
	getAdAggregatePageProductDetail: BASEURL2 + '/mbuy/intf/adAggregatePage/getRecommendRuleDetail',
	
	// 渠道聚合页
	getCnPageList: BASEURL2 + '/mbuy/intf/channelAggregatePage/list',
	getCnPageDetail: BASEURL2 + '/mbuy/intf/channelAggregatePage/detail',
	createCnPage: BASEURL2 + '/mbuy/intf/channelAggregatePage/create',
	
    // ---商家券配置---
    getMerchantCouponList: BASEURL + '/wxBusifavorInfo/list',
    getMerchantCouponInfo: BASEURL + '/wxBusifavorInfo/detail',
    createMerchantCoupon: BASEURL + '/wxBusifavorInfo/create',
    uploadMerchantCouponImg: BASEURL + '/wxBusifavorInfo/uploadBusifavorImage',
    getMerchantCouponSign: BASEURL + '/wxBusifavorInfo/genBusifavorSign',

    // ---会员卡配置---
    getVipCardList: BASEURL + '/wxMemberCardUpdateInfo/list',
    createVipCard: BASEURL + '/wxMemberCardUpdateInfo/saveOrUpdate',
    delVipCard: BASEURL + '/wxMemberCardUpdateInfo/del',
	
	// ---会员卡列表---
	getVipCardList2: BASEURL + '/memberCardRecord/list',
	notifyVipCard: BASEURL + '/memberCardRecord/notify',

    // ---代金券配置---
    getVoucherList: BASEURL + '/wxCouponStockIdInfo/list',
    getVoucherInfo: BASEURL + '/wxCouponStockIdInfo/detail',
    createVoucher: BASEURL + '/wxCouponStockIdInfo/createOrUpdate',
    refreshVoucher: BASEURL + '/wxCouponStockIdInfo/refreshData',

	// ---微信卡券发送配置---
    getWxCouponSettingList: BASEURL + '/wxCouponSendConfig/list',
    createtWxCouponSetting: BASEURL + '/wxCouponSendConfig/createOrUpdate',
    deltWxCouponSetting: BASEURL + '/wxCouponSendConfig/delete',

    // ---微信视频号商品管理---
    getWxVideoGoodsList: BASEURL2 + '/mbuy/intf/wxVideoProduct/list',
    getWxVideoGoodsDetail: BASEURL2 + '/mbuy/intf/wxVideoProduct/detail',
    updateWxVideoGoodsInfo: BASEURL2 + '/mbuy/intf/wxVideoProduct/genWxVideoProduct',
    refreshWxVideoGoodsInfo: BASEURL2 + '/mbuy/intf/wxVideoProduct/refresh',
    getWxVideoGoodsWxCates: BASEURL2 + '/mbuy/intf/wxVideoProduct/getWxShopCatList',
    upWxVideoGoods: BASEURL2 + '/mbuy/intf/wxVideoProduct/listingWxVideoProduct',
    downWxVideoGoods: BASEURL2 + '/mbuy/intf/wxVideoProduct/deListingWxVideoProduct',
    deleteWxVideoGoods: BASEURL2 + '/mbuy/intf/wxVideoProduct/delete',
    getDdtGoodsDetail: BASEURL2 + '/mbuy/intf/yptm/product/detail2',

    // ---系统管理---
    // 模块列表
    getModuleList: BASEURL + '/module/list',
    deleteModule: BASEURL + '/module/del',
    editModule: BASEURL + '/module/save',
    createModule: BASEURL + '/module/save',
    getModuleDetail: BASEURL + '/module/detail',

    // 角色列表
    getRoleList: BASEURL + '/role/list',
    deleteRole: BASEURL + '/role/del',
    editRole: BASEURL + '/role/save',
    createRole: BASEURL + '/role/save',
    getRoleDetail: BASEURL + '/role/detail',
    getRolePermission: BASEURL + '/module/tree',
    setRolePermission: BASEURL + '/role/auth',

    // 用户列表
    getUserList: BASEURL + '/user/list',
    deleteUser: BASEURL + '/user/del',
    resetUserPwd: BASEURL + '/user/resetPassword',
    createUser: BASEURL + '/user/save',
    editUser: BASEURL + '/user/save',
    getUserDetail: BASEURL + '/user/detail'
};

Vue.prototype.$API = OPTIONS;
console.log(`%cNow is ${process.env.NODE_ENV} mode`, 'color:red;font-weight:700;');
