import {
  queryInfoById,
  saveCarousel,
  querySwiperInfoById,
  addPageList,
  sortByHandle,
  removeCarousel,
  queryGridInfoById,
  saveGrid,
  removeGrid,
  queryBrandInfoById,
  queryShopBrand,
  saveBrand,
  removeBrand,
  queryTitleInfoById,
  saveTitle,
  removeTitle,
  removeActivity,
  queryMallInfoById,
  removeMall,
  saveMall,
  queryNavbarInfoById,
  removeNavbar,
  saveNavbar,
  queryActivityInfoById,
  saveActivity,
  getActivity,
} from 'api'
import { pathMatchRegexp } from '@/utils';
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant';
import { message } from 'antd';

export default {
  namespace: 'pagesinfo', //namespace 是该 model 的命名空间
  state: {
    initData: [],
    activityData: [],
    ShopBrand: [],
    swiperInfo: {
      ConfiId: '',
      Id: '',
      Images: [],
      IsFloat: 0,
      OrderNo: 1,
      RollingTime: 3000,
      type: 1,
    },
    drawerSwiperInfo: {
      Images: [],
      IsFloat: 0,
      RollingTime: 3000,
    },
    gridInfo: {
      BackgroundColor: "#fff",
      Buttons: [],
      ConfigId: "",
      FontSize: 14,
      Id: "",
      OrderNo: 0,
      RowShowType: 0,
      StyleType: 5,
      type: 2
    },
    drawerGridInfo: {
      BackgroundColor: "#fff",
      Buttons: [],
      FontSize: 14,
      RowShowType: 0,
      StyleType: 5,
    },
    brandInfo: {
      BackColor: "#fff",
      BranddetailUrl: "",
      ConfigId: "",
      Id: "",
      IsIcon: 0,
      LogoColor: "#F0F2F5",
      OrderNo: 1,
      ShopPro: [],
      type: 3,
    },
    drawerBrandInfo: {
      BackColor: "#fff",
      IsIcon: 0,
      LogoColor: "#F0F2F5",
      ShopPro: [],
    },
    titleInfo: {
      BackColor: "#fff",
      BackImage: null,
      ConfigId: "0302b5f8-b48b-4372-94ff-def60d1c060a",
      CustomLink: null,
      Fromabove: 0,
      FuncLink: null,
      FuncName: null,
      FuncType: null,
      HeadLine: "标题",
      HeadLineColor: "#333",
      HeadLineSize: 14,
      Id: "a8a8c950-a364-4d69-b63e-fa9829bed868",
      Istemplate: 1,
      LeftImage: null,
      OpenUrl: 0,
      OrderNo: 4,
      RightImage: null,
      RightWord: "更多",
      RightWordColor: "#999",
      RightWordSize: 14,
      ShowFunctionName: "",
      ShowFunctionType: "",
      type: 0
    },
    drawerTitleInfo: {
      BackColor: "#fff",
      BackImage: null,
      CustomLink: null,
      Fromabove: 0,
      FuncLink: null,
      FuncName: null,
      FuncType: null,
      HeadLine: "标题",
      HeadLineColor: "#333",
      HeadLineSize: 14,
      Istemplate: 1,
      LeftImage: null,
      OpenUrl: 0,
      OrderNo: 4,
      RightImage: null,
      RightWord: "更多",
      RightWordColor: "#999",
      RightWordSize: 14,
      ShowFunctionName: "",
      ShowFunctionType: "",
    },
    mallInfo: {
      AccordingNum: 4,
      BtnBackColor: "#CC3629",
      BtnNameColor: "#CC3629",
      BtnNameSize: "14",
      ConfigId: "098e8fbc-6396-42bd-80c2-0c8cefb7c3be",
      GiftDetialUrl: '',
      Gifts: [],
      Id: "5dff038e-5edd-4d2e-86b5-a16fb72f2b35",
      NameColor: "#000000",
      NameSize: "1",
      OrderNo: 0,
      PointsColor: "#CC3629",
      PointsSize: 15,
      Style: null,
      type: 6,
    },
    drawerMallInfo: {
      AccordingNum: 4,
      BtnBackColor: "#CC3629",
      BtnNameColor: "#CC3629",
      BtnNameSize: "14",
      NameColor: "#000000",
      NameSize: "1",
      PointsColor: "#CC3629",
      PointsSize: 15,
      Style: null,
    },
    navbarInfo: {
      BaseColor: "#ffffff",
      ConfiId: "0302b5f8-b48b-4372-94ff-def60d1c060a",
      FontColor: "#000000",
      FontSize: 14,
      Id: "cdad0be8-0ae2-458e-86b4-6f519a44d9df",
      Images: [],
      OrderNo: 0,
      SelectColor: null,
      type: 0
    },
    drawerNavbarInfo: {
      BaseColor: "#ffffff",
      FontColor: "#000000",
      Images: [],
      SelectColor: "#1890FF",
    },
    activityInfo: {
      ConfigId: "3cfa1319-25d8-47a6-8526-84ad03a55f5d",
      Id: "8b6eb4dd-edba-4035-81fa-6be8d6c94f6b",
      Image: "",
      Name: "",
      OrderNo: 1,
      activityId: "",
      activityUrl: null,
      type: 5,
    },
    drawerActivityInfo: {
      Image: "",
      Name: "",
      activityId: "",
    },



  },
  /**
   * 用于订阅某些数据源，并根据情况 dispatch 某些 action，
   * */
  subscriptions: {
    setup({ dispatch, history }) {//一进入页面请求
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/pageslist/details/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { ConfigId: match[1] }})
        }
      })
    },
  },
  /**
   * 用于处理异步操作，不能直接修改 state，由 action 触发，也可触发 action。
   * 它只能是 generator 函数，并且有 action 和 effects 两个参数。
   * 第二个参数 effects 包含 put、call 和 select 三个字段，
   *    put 用于触发 action，
   *    call 用于调用异步处理逻辑，
   *    select 用于从 state 中获取数据
   * */
  effects: {
    *query({ payload }, { call, put, select }){
      //dispatch({ type: 'pageslist/updateCurrentItemId', payload: { currentItemId: match[1] }})

      const response = yield call(queryInfoById, payload);
      const { Status, data, msg } = response;
      if(Status === 1 && data.length !== 0){
        yield put({
          type: 'updateInit',
          payload: {
            initData: data
          }
        })
      }else {
        throw {
          message: msg
        }
      }
    },
    *addPageList({ payload }, { call, put }) {
      const response = yield call(addPageList, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        message.success("添加成功")
        return true
      }
    },
    *sortByHandle({ payload }, { call, put }) {
      const response = yield call(sortByHandle, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
        // message.success("添加成功")
      }
    },
    *saveCarousel({ payload }, { call, put }) {//保存轮播图信息
      const response = yield call(saveCarousel, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *removeCarousel({ payload }, { call, put }) {//保存轮播图信息
      const response = yield call(removeCarousel, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *querySwiperInfoById({ payload }, { call, put }) {
      const response = yield call(querySwiperInfoById, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        const { Images, IsFloat, RollingTime } = data;
        yield put({
          type: 'updateSwiperInfo',
          payload: {
            swiperInfo: data,
            drawerSwiperInfo: { Images, IsFloat, RollingTime: RollingTime || 3000, }
          }
        })
      }
    },
    *queryGridInfoById({ payload }, { call, put }) {
      const response = yield call(queryGridInfoById, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        const { BackgroundColor, Buttons, FontSize, RowShowType, StyleType, FontColor } = data;
        yield put({
          type: 'updateGridInfo',
          payload: {
            gridInfo: data,
            drawerGridInfo: {
              BackgroundColor,
              Buttons,
              FontSize,
              RowShowType,
              StyleType,
              FontColor
            }
          }
        })
      }
    },
    *saveGrid({ payload }, { call, put }) {//保存轮播图信息
      const response = yield call(saveGrid, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *removeGrid({ payload }, { call, put }) {//保存轮播图信息
      const response = yield call(removeGrid, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *queryBrandInfoById({ payload }, { all, call, put }) {
      // const response = yield call(queryBrandInfoById, payload);
      const [result1, result2]  = yield all([
        call(queryBrandInfoById, payload),
        call(queryShopBrand)
      ]);

      // const { Status, data, msg } = response;
      if(result1.Status === 1){
        const { data } = result1;
        const { BackColor, IsIcon, LogoColor, ShopPro } = data;
        yield put({
          type: 'updateBrandInfo',
          payload: {
            brandInfo: data,
            drawerBrandInfo: {
              BackColor,
              IsIcon,
              LogoColor,
              ShopPro,
            }
          }
        })
      }
      if(result2.Status === 1){
        const { Status, data } = result2;
        // console.log(data)
        yield put({
          type: 'querySucc',
          payload: { ShopBrand: data }
        })
      }
    },
    *saveBrand({ payload }, { call, put }) {//保存品牌导航
      const response = yield call(saveBrand, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *removeBrand({ payload }, { call, put }) {//删除品牌导航
      const response = yield call(removeBrand, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *queryTitleInfoById({ payload }, { call, put }) {
      const response = yield call(queryTitleInfoById, payload);
      const { Status, data, msg } = response;
      // console.log("=================",data)
      if(Status === 1){
        const {
          BackColor,
          BackImage,
          CustomLink,
          Fromabove,
          FuncLink,
          FuncName,
          FuncType,
          HeadLine,
          HeadLineColor,
          HeadLineSize,
          Istemplate,
          LeftImage,
          OpenUrl,
          OrderNo,
          RightImage,
          RightWord,
          RightWordColor,
          RightWordSize,
          ShowFunctionName,
          ShowFunctionType, } = data;
        yield put({
          type: 'updateTitleInfo',
          payload: {
            titleInfo: data,
            drawerTitleInfo: {
              BackColor,
              BackImage,
              CustomLink,
              Fromabove,
              FuncLink,
              FuncName,
              FuncType,
              HeadLine,
              HeadLineColor,
              HeadLineSize,
              Istemplate,
              LeftImage,
              OpenUrl,
              OrderNo,
              RightImage,
              RightWord,
              RightWordColor,
              RightWordSize,
              ShowFunctionName,
              ShowFunctionType,
            }
          }
        })
      }
    },
    *saveTitle({ payload }, { call, put }){
      const response = yield call(saveTitle, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *removeTitle({ payload }, { call, put }){
      const response = yield call(removeTitle, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }else {
        throw {
          message: msg
        }
      }
    },

    *queryMallInfoById({ payload }, { call, put }) {
      const response = yield call(queryMallInfoById, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        const { AccordingNum, BtnBackColor, BtnNameColor, BtnNameSize, NameColor, NameSize, PointsColor, PointsSize, Style } = data;
        yield put({
          type: 'updateMallInfo',
          payload: {
            mallInfo: data,
            drawerMallInfo: {
              AccordingNum,
              BtnBackColor,
              BtnNameColor,
              BtnNameSize,
              NameColor,
              NameSize,
              PointsColor,
              PointsSize,
              Style,
            }
          }
        })
      }
    },
    *saveMall({ payload }, { call, put }) {//保存积分商城
      const response = yield call(saveMall, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *removeMall({ payload }, { call, put }) {//删除积分商城
      const response = yield call(removeMall, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *queryNavbarInfoById({ payload }, { call, put }) {
      const response = yield call(queryNavbarInfoById, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        const { BaseColor, FontColor, SelectColor, Images } = data;
        yield put({
          type: 'updateNavbarInfo',
          payload: {
            navbarInfo: data,
            drawerNavbarInfo: {
              BaseColor,
              FontColor,
              Images,
              SelectColor,
            }
          }
        })
      }
    },
    *saveNavbar({ payload }, { call, put }) {//保存底部菜单
      const response = yield call(saveNavbar, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *removeNavbar({ payload }, { call, put }) {//删除底部菜单
      const response = yield call(removeNavbar, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }
    },
    *queryActivityInfoById({ payload }, { all, call, put }) {
      // const response = yield call(queryActivityInfoById, payload);
      const [result1, result2]  = yield all([
        call(queryActivityInfoById, payload),
        call(getActivity)
      ]);
      if(result1.Status === 1){
        const { Image, Name, activityId } = result1.data;
        yield put({
          type: 'updateActivityInfo',
          payload: {
            activityInfo: result1.data,
            drawerActivityInfo: { Image, Name, activityId }
          }
        })
      }

      if(result2.Status === 1 && result2.data.length !== 0){
        yield put({
          type: 'queryActivitySucc',
          payload: { activityData: result2.data }
        })
      }

    },
    *removeActivity({ payload }, { call, put }){
      const response = yield call(removeActivity, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }else {
        throw {
          message: msg
        }
      }
    },
    *saveActivity({ payload }, { call, put }){
      const response = yield call(saveActivity, payload);
      const { Status, data, msg } = response;
      if(Status === 1){
        return true
      }else {
        throw {
          message: msg
        }
      }
    },

  },
  /**
   * 类似于 redux 中的 reducer，它是一个纯函数，用于处理同步操作，
   * 是唯一可以修改 state 的地方，由 action 触发，它有 state 和 action 两个参数
   * */
  reducers: {
    queryActivitySucc(state, { payload: { activityData } }){
      return { ...state, activityData }
    },
    querySucc(state, { payload: { ShopBrand } }){
      return { ...state, ShopBrand }
    },
    updateInit(state, { payload:{ initData } }){
      return {
        ...state,
        initData
      }
    },
    reorderItem(state, { payload:{ initData } }){//重新排序
      return {
        ...state,
        initData,
      }
    },
    updateSwiperInfo(state, { payload:{ swiperInfo, drawerSwiperInfo } }){
      return {
        ...state,
        swiperInfo,
        drawerSwiperInfo
      }
    },
    updateDrawerSwiper(state, { payload }){
      return {
        ...state,
        drawerSwiperInfo: payload
      }
    },
    updateGridInfo(state, { payload:{ gridInfo, drawerGridInfo } }){
      return {
        ...state,
        gridInfo,
        drawerGridInfo
      }
    },
    updateDrawerGrid(state, { payload }){
      return {
        ...state,
        drawerGridInfo: payload
      }
    },
    updateBrandInfo(state, { payload:{ brandInfo, drawerBrandInfo } }){
      return {
        ...state,
        brandInfo,
        drawerBrandInfo
      }
    },
    updateDrawerBrand(state, { payload }){
      return {
        ...state,
        drawerBrandInfo: payload
      }
    },
    updateTitleInfo(state, { payload:{ titleInfo, drawerTitleInfo } }){
      return {
        ...state,
        titleInfo,
        drawerTitleInfo
      }
    },
    updateDrawerTitle(state, { payload }){
      return {
        ...state,
        drawerTitleInfo: payload
      }
    },
    updateMallInfo(state, { payload:{ mallInfo, drawerMallInfo } }){
      return {
        ...state,
        mallInfo,
        drawerMallInfo
      }
    },
    updateDrawerMall(state, { payload }){
      return {
        ...state,
        drawerMallInfo: payload
      }
    },
    updateNavbarInfo(state, { payload:{ navbarInfo, drawerNavbarInfo } }){
      return {
        ...state,
        navbarInfo,
        drawerNavbarInfo
      }
    },
    updateDrawerNavbar(state, { payload }){
      return {
        ...state,
        drawerNavbarInfo: payload
      }
    },
    updateActivityInfo(state, { payload:{ activityInfo, drawerActivityInfo } }){
      return {
        ...state,
        activityInfo,
        drawerActivityInfo
      }
    },
    updateDrawerActivity(state, { payload }){
      return {
        ...state,
        drawerActivityInfo: payload
      }
    },

  },

};
