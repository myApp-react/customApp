import React, { Component, PureComponent } from "react";
import { TabBar } from 'antd-mobile';
import style from './index.less';
import { Prefix } from '@/utils/config'

const defaultTab = [
  {
    title: '标题',
    key: 1,
    icon: "https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg",
    selectIcon: "https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg"
  },
  {
    title: '标题2',
    key: 2,
    icon: "https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg",
    selectIcon: "https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg"
  },
  {
    title: '标题3',
    key: 3,
    icon: "https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg",
    selectIcon: "https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg"
  },
];

export default class TitleDrawer extends PureComponent {

  state = {
    index: 0,
  }

  onPress = (e, r) => {
    console.log(e, r)
  }

  render() {
    const { BaseColor, SelectColor, FontSize, FontColor, Images, commonUrl  } = this.props;
    const { index } = this.state;
    const prefixUrl = Prefix ? Prefix : commonUrl
    const ImgUrl = url => commonUrl ? (commonUrl + url) : (Prefix + url)

    console.warn("Images", Images)
    return (
      <TabBar
        className={style.tabbar}
        unselectedTintColor={FontColor}
        tintColor={SelectColor ? SelectColor : "#33A3F4"}
        barTintColor={BaseColor}
      >
        {
          Images.length !== 0 ?
            Images.map((_, i) => (
              <TabBar.Item
                title={_.btnName}
                key={_.Id}
                icon={<div style={{
                  width: '24px',
                  height: '24px',
                  background: `url("${ImgUrl(_.ImageUrl)}") center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: `url("${ImgUrl(_.SelectImageUrl)}") center center /  21px 21px no-repeat` }}
                  >
                  </div>
                }
                onPress={() => {
                  if(commonUrl && _.LinkUrl){
                    window.location.href = _.LinkUrl
                  }
                  this.setState({ index: i })
                }}
                onClick={e => this.onPress(_, e)}
                selected={i === index}
                data-seed={_.Id}
              />
            ))
            : defaultTab.map(_ => (
              <TabBar.Item
                title={_.title}
                key={_.key}
                icon={<div style={{
                  width: '24px',
                  height: '24px',
                  background: 'url('+ _.icon + ') center center /  21px 21px no-repeat' }}
                />}
                selectedIcon={
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'url('+ _.selectIcon + ') center center /  21px 21px no-repeat' }}
                  />
                }
                selected={_.title === "标题"}
                data-seed={_.key}
              />
            ))
        }
      </TabBar>
    )
  }
};
