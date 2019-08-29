const Prefix = process.env.NODE_ENV === 'development' ? '/ydh' : '';
const wxPrefix = process.env.NODE_ENV === 'development' ? '/wx' : '';


export default {
  addPage: `${Prefix}/MallHomePageConfig/SaveMallHomePageConfig`,//新增
  editName: `${Prefix}/MallHomePageConfig/UpdMallHomePageConfigName`,//新增
  CopyPage: `POST ${Prefix}/MallHomePageConfig/CopyMallConfig`,//新增
  removePage: `${Prefix}/MallHomePageConfig/RemoveMallHomePageConfig`,//删除
  releasePage: `${Prefix}/MallHomePageConfig/PublishMallHomePageConfig`,//发布
  addPageList: `POST ${Prefix}/MallHomePageConfig/SaveMallConfig`,//点击侧边栏按钮添加
  sortByHandle: `POST ${Prefix}/MallHomePageConfig/SaveChangeMallConfig`, //排序操作
  queryPageList: `${Prefix}/MallHomePageConfig/QueryMallHomePageConfigs`,//获取初始化配置列表信息
  querySliderList: `${Prefix}/MallHomePageConfig/QueryMallHomePageConfigs`,//获取侧边栏初始化数据
  queryInfoById: `${Prefix}/MallHomePageConfig/GetMallHomePageConfig`,//获取信息

  querySwiperInfoById: `${Prefix}/MallHomePageConfig/GetMallRollingScreenImageConfig`,//获取信息
  saveCarousel: `POST ${Prefix}/MallHomePageConfig/SaveMallRollingScreenImageConfig`,//保存轮播信息
  removeCarousel: `POST ${Prefix}/MallHomePageConfig/RemoveMallRollingScreenImageConfig`,//删除轮播信息

  queryGridInfoById: `POST ${Prefix}/MallHomePageConfig/GetMallHomeFunctionModel`,//获取功能模块信息
  removeGrid: `POST ${Prefix}/MallHomePageConfig/RemoveMallHomeFunctionModel`,//删除功能模块
  saveGrid: `POST ${Prefix}/MallHomePageConfig/SaveMallHomeFunctionModel`,//删除功能模块

  queryBrandInfoById: `POST ${Prefix}/MallHomePageConfig/GetMallBrandConfig`,//获取品牌导航
  removeBrand: `POST ${Prefix}/MallHomePageConfig/RemoveBrandNaviGationModel`,//删除品牌导航
  saveBrand: `POST ${Prefix}/MallHomePageConfig/SaveBrandNaviGation`,//保存品牌导航

  queryTitleInfoById: `POST ${Prefix}/MallHomePageConfig/GetMalltitlebar`,//获取标题栏
  removeTitle: `POST ${Prefix}/MallHomePageConfig/RemoveMalltitlebar`,//删除标题栏
  saveTitle: `POST ${Prefix}/MallHomePageConfig/SaveMalltitlebar`,//保存标题栏


  getActivity: `POST ${Prefix}/MallHomePageConfig/GetActivity`,//获取有效活动推荐

  queryActivityInfoById: `POST ${Prefix}/MallHomePageConfig/GetMallactivity`,//获取活动推荐
  saveActivity: `POST ${Prefix}/MallHomePageConfig/SaveMallactivity`,//保存活动推荐
  removeActivity: `POST ${Prefix}/MallHomePageConfig/RemoveMallactivity`,//保存活动推荐

  queryShopBrand: `POST ${Prefix}/MallHomePageConfig/GetShopPromotion`,//获取店铺品牌

  queryMallInfoById: `POST ${Prefix}/MallHomePageConfig/GetMallintegral`,//获取商城
  removeMall: `POST ${Prefix}/MallHomePageConfig/RemoveMallintegral`,//删除商城
  saveMall: `POST ${Prefix}/MallHomePageConfig/SaveMallintegral`,//保存商城

  queryNavbarInfoById: `POST ${Prefix}/MallHomePageConfig/GetMallbottommenu`,//获取底部菜单
  removeNavbar: `POST ${Prefix}/MallHomePageConfig/RemoveMallbottommenu`,//删除底部菜单
  saveNavbar: `POST ${Prefix}/MallHomePageConfig/SaveMallbottommenu`,//保存底部菜单

  getInfoForWx: `${wxPrefix}/MallHomePageConfig/GetMallHomePageConfigInfo`,//微信预览调用
}
