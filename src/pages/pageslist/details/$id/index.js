/**
 * title: 配置详细信息
 */
import React, { PureComponent } from "react";
import styles from './index.less';
import { stringify } from 'qs'
import Drag from '../../components/Drag'
import { Button, Popover, PageHeader, Affix, BackTop } from 'antd';
import { connect } from 'dva'
import { pathMatchRegexp, renderContByType, router } from '@/utils';
import { boardList } from '@/utils/config'
import {
  SwiperDrawer,
  NavbarDrawer,
  GridDrawer,
  BoardList,
  TitleDrawer,
  MallDrawer,
  BrandDrawer,
  Page,
  ActivityDrawer,
} from '@/components'
const QRCode = require('qrcode.react');

@connect(({ app, pagesinfo, loading }) => ({ app, pagesinfo, loading }))
class IndexPages extends PureComponent {

  messagesEnd = null;
  state = {
    visible: false,
    swiperState: {
      visible: false,
      typeID: ''
    },
    tabbarState: {
      visible: false,
      typeID: ''
    },
    gridState: {
      visible: false,
      typeID: ''
    },
    titleState: {
      visible: false,
      typeID: ''
    },
    mallState: {
      visible: false,
      typeID: ''
    },
    brandState: {
      visible: false,
      typeID: ''
    },
    activityState: {
      visible: false,
      typeID: ''
    },
  }

  //添加点击痕迹显示
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { pathname } = location;
    const match = pathMatchRegexp('/pageslist/details/:id', pathname);
    dispatch({ type: 'pageslist/updateCurrentItemId', payload: { currentItemId: match[1] } })
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  //swiper事件
  _swiperHandle = (e) => {
    const typeID = e.target.getAttribute("data-id")
    const imageConfigId = e.target.getAttribute("data-id")
    this.setState((pre) => ({
      swiperState: {typeID, visible: !pre.swiperState.visible}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/querySwiperInfoById',
        payload: { imageConfigId }
      })
    })
  }

  swiperOnClose = () => {
    this.setState((pre) => ({
      swiperState: {visible: false}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/updateDrawerSwiper',
        payload: { Images: [], IsFloat: 0, RollingTime: 3000, }
      })
    })
  };

  //tabbar事件
  _tabbarHandle = (e) => {
    const typeID = e.target.getAttribute("data-id")
    const ConfigId = e.target.getAttribute("data-id")
    this.setState((pre) => ({
      tabbarState: {typeID, visible: !pre.tabbarState.visible}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/queryNavbarInfoById',
        payload: { ConfigId }
      })
    })
  }

  tabbarOnClose = () => {
    this.setState((pre) => ({
      tabbarState: {visible: false}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/updateDrawerNavbar',
        payload: {
          BaseColor: "#ffffff",
          FontColor: "#000000",
          FontSize: 14,
          Images: [],
        }
      })
    })
  };

  //Grid事件
  _gridHandle = (e) => {
    const typeID = e.target.getAttribute("data-id")
    const modelId = e.target.getAttribute("data-id")
    this.setState((pre) => ({
      gridState: {typeID, visible: !pre.gridState.visible}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/queryGridInfoById',
        payload: { modelId }
      })
    })
  }

  gridOnClose = () => {
    this.setState((pre) => ({
      gridState: {visible: false}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/updateDrawerGrid',
        payload: { BackgroundColor: "#fff", Buttons: [], FontSize: 14, RowShowType: 0, StyleType: 5, }
      })
    })
  }


  //title事件
  _titleHandle = (e) => {
    const typeID = e.target.getAttribute("data-id");
    const ConfigId = e.target.getAttribute("data-id");
    this.setState((pre) => ({
      titleState: {typeID, visible: !pre.titleState.visible}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/queryTitleInfoById',
        payload: { ConfigId }
      })
    })
  }

  titleOnClose = () => {
    this.setState((pre) => ({
      titleState: {visible: false}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/updateDrawerTitle',
        payload: {
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
        }
      })
    })

  }

  //mall事件
  _mallHandle = (e) => {
    const typeID = e.target.getAttribute("data-id")
    const ConfigId = e.target.getAttribute("data-id")
    this.setState((pre) => ({
      mallState: {typeID, visible: !pre.mallState.visible}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/queryMallInfoById',
        payload: { ConfigId }
      })
    })
  }

  mallListOnClose = (name) => {
    this.setState((pre) => ({
      mallState: {visible: false}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/updateDrawerMall',
        payload: {
          AccordingNum: 4,
          BtnBackColor: "#CC3629",
          BtnNameColor: "#CC3629",
          BtnNameSize: "14",
          NameColor: "#000000",
          NameSize: 14,
          PointsColor: "#CC3629",
          PointsSize: 15,
          Style: 1,
        }
      })
    })
  }

  //brandState

  _brandHandle = (e) => {
    const typeID = e.target.getAttribute("data-id")
    const BrandConfigId = e.target.getAttribute("data-id")
    this.setState((pre) => ({
      brandState: {typeID, visible: !pre.brandState.visible}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/queryBrandInfoById',
        payload: { BrandConfigId }
      })
    })
  }

  brandOnClose = (name) => {
    this.setState((pre) => ({
      brandState: {visible: false}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/updateDrawerBrand',
        payload: {
          BackColor: "#fff",
          IsIcon: 0,
          LogoColor: "#F0F2F5",
          ShopPro: [],
        }
      })
    })
  }

  _activityHandle = (e) => {
    const typeID = e.target.getAttribute("data-id")
    const ConfigId = e.target.getAttribute("data-id")
    this.setState((pre) => ({
      activityState: {typeID, visible: !pre.activityState.visible}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/queryActivityInfoById',
        payload: { ConfigId }
      })
    })
  }

  activityOnClose = (name) => {
    this.setState((pre) => ({
      activityState: {visible: false}
    }), () => {
      this.props.dispatch({
        type: 'pagesinfo/updateDrawerActivity',
        payload: {
          Image: "",
          Name: "",
          activityId: "",
        }
      })
    })
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  }


  render() {
    const { swiperState, tabbarState, gridState, titleState, mallState, brandState, activityState } = this.state;
    const { pagesinfo, app, dispatch, location, loading } = this.props;
    const { query, pathname } = location;
    const {
      initData,
      activityData,
      swiperInfo,
      drawerSwiperInfo,
      gridInfo,
      drawerGridInfo,
      brandInfo,
      drawerBrandInfo,
      titleInfo,
      drawerTitleInfo,
      mallInfo,
      drawerMallInfo,
      navbarInfo,
      drawerNavbarInfo,
      activityInfo,
      drawerActivityInfo,
      ShopBrand,
    } = pagesinfo;
    const handleRefresh = newQuery => {
      router.replace({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          // { arrayFormat: 'repeat' }
        ),
      })
    };

    const dragProps = {
      initData,
      location,
      _swiperHandle: this._swiperHandle,
      _tabbarHandle: this._tabbarHandle,
      _gridHandle: this._gridHandle,
      _titleHandle: this._titleHandle,
      _mallHandle: this._mallHandle,
      _brandHandle: this._brandHandle,
      _activityHandle: this._activityHandle,
      dispatch,
      loading,
      handleRefresh
    }

    const boardProps = {
      boardList,
      initData,
      dispatch,
      handleRefresh,
      scrollToBottom: this.scrollToBottom
    }


    const match = pathMatchRegexp('/pageslist/details/:id', pathname)

    // const showCode = (
    //   <div>
    //     <QRCode size={145} value={`${window.location.origin}/#/preview/details/${match[1]}`} />
    //   </div>
    // )

    const showCode = (
      <div>
        <QRCode size={145} value={`http://120.26.211.143:5001/build/#/preview/details/${match[1]}`} />
      </div>
    )

    const swiperProps = {
      visible:swiperState.visible,
      typeID:swiperState.typeID,
      onClose:this.swiperOnClose,
      dispatch,
      handleRefresh,
      sourceInfo:swiperInfo,
      editInfo:drawerSwiperInfo,
      loading
    }

    const gridProps = {
      visible: gridState.visible,
      typeID: gridState.typeID,
      onClose: this.gridOnClose,
      dispatch,
      handleRefresh,
      sourceInfo: gridInfo,
      editInfo: drawerGridInfo
    }

    const brandProps = {
      visible: brandState.visible,
      typeID: brandState.typeID,
      onClose: this.brandOnClose,
      dispatch,
      ShopBrand,
      handleRefresh,
      sourceInfo: brandInfo,
      editInfo: drawerBrandInfo
    }

    const titleProps = {
      visible: titleState.visible,
      typeID: titleState.typeID,
      onClose: this.titleOnClose,
      handleRefresh,
      dispatch,
      sourceInfo: titleInfo,
      editInfo: drawerTitleInfo,
    }

    const mallProps = {
      visible: mallState.visible,
      typeID: mallState.typeID,
      onClose: this.mallListOnClose,
      handleRefresh,
      dispatch,
      sourceInfo: mallInfo,
      editInfo: drawerMallInfo,
    }

    const navbarProps = {
      visible:tabbarState.visible,
      typeID:tabbarState.typeID,
      onClose:this.tabbarOnClose,
      handleRefresh,
      dispatch,
      sourceInfo: navbarInfo,
      editInfo: drawerNavbarInfo,
    }

    const activityProps = {
      visible: activityState.visible,
      typeID: activityState.typeID,
      onClose: this.activityOnClose,
      handleRefresh,
      dispatch,
      activityData,
      sourceInfo: activityInfo,
      editInfo: drawerActivityInfo,
    }

    return (
      <Page inner={true}>
        <PageHeader onBack={() => router.goBack()} title="页面详情" subTitle={`配置ID: ${match[1]}`} />
        <div className={styles.normal}>
          {/*<Popover placement="right" content={showCode} title="扫描体验" trigger="click">*/}
          {/*<Button>获取二维码</Button>*/}
          {/*</Popover>*/}
          <Affix offsetTop={30}>
            <BoardList {...boardProps} />
          </Affix>
          <Drag {...dragProps} />
          {/*<Affix offsetTop={300}>*/}
            {/*<Popover placement="right" content={showCode} title="扫描预览" trigger="click">*/}
              {/*<Button*/}
                {/*type="primary"*/}
                {/*shape="round"*/}
                {/*icon="qrcode"*/}
              {/*>预览</Button>*/}
            {/*</Popover>*/}
          {/*</Affix>*/}
          <SwiperDrawer {...swiperProps}/>
          <GridDrawer {...gridProps} />
          <BrandDrawer {...brandProps}/>
          <TitleDrawer {...titleProps} />
          <MallDrawer {...mallProps}/>
          <NavbarDrawer {...navbarProps}/>
          <ActivityDrawer {...activityProps}/>
          <BackTop />
          {/*<div style={{ float:"left", clear: "both" }}*/}
               {/*ref={(el) => { this.messagesEnd = el; }}>*/}
          {/*</div>*/}
        </div>
      </Page>
    );
  }
}
export default IndexPages;
