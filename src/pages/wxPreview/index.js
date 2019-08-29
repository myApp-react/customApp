/**
 * title: 微网站首页
 */
import React, { PureComponent } from "react";
import style from './index.less';
import { stringify } from 'qs'
import { connect } from 'dva'
import { renderContByType, } from '@/utils/index';
import { Carousel, Grid, TabBar, MallList, TitleBar, Brand, Activity } from '@/components/index'
import { Page } from '@/components';

@connect(({ app, wxpreview, loading }) => ({ app, wxpreview, loading }))
class IndexPages extends PureComponent {

  render() {
    const { wxpreview, loading } = this.props;
    const { initData, commonUrl } = wxpreview;
    console.log("初始刷剧",initData)
    return (
      <Page loading={loading.global}>
        <div className={style['preview-warp']}>
          {
            initData.map((_, index) => {
              const mainType = _.type;
              let htmlStr = [];
              if(mainType === 1){
                htmlStr.push(<Carousel commonUrl={commonUrl} key={_.Id} IsFloat={_.IsFloat} RollingTime={_.RollingTime || 3000} Images={_.Images}/>)
              }
              if(mainType === 2){
                htmlStr.push(
                  <Grid
                    key={_.Id}
                    commonUrl={commonUrl}
                    BackgroundColor={_.BackgroundColor}
                    StyleType={_.StyleType}
                    RowShowType={_.RowShowType}
                    FontSize={_.FontSize}
                    Buttons={_.Buttons}
                    FontColor={_.FontColor}
                  />
                )
              }
              if(mainType === 3){
                htmlStr.push(
                  <Brand
                    key={_.Id}
                    commonUrl={commonUrl}
                    IsIcon={_.IsIcon}
                    LogoColor={_.LogoColor}
                    BackColor={_.BackColor}
                    ShopPro={_.ShopPro}
                    BranddetailUrl={_.BranddetailUrl}
                  />
                )
              }
              if(mainType === 4){
                htmlStr.push(
                  <TitleBar
                    key={_.Id}
                    commonUrl={commonUrl}
                    Fromabove={_.Fromabove}
                    Istemplate={_.Istemplate}
                    BackColor={_.BackColor}
                    BackImage={_.BackImage}
                    LeftImage={_.LeftImage}
                    HeadLine={_.HeadLine}
                    HeadLineSize={_.HeadLineSize}
                    HeadLineColor={_.HeadLineColor}
                    RightWord={_.RightWord}
                    RightWordSize={_.RightWordSize}
                    RightWordColor={_.RightWordColor}
                    RightImage={_.RightImage}
                    OpenUrl={_.OpenUrl}
                    CustomLink={_.CustomLink}
                    FuncLink={_.FuncLink}
                  />
                )
              }
              if(mainType === 5){
                htmlStr.push(
                  <Activity key={_.Id} commonUrl={commonUrl} activityId={_.activityId} Image={_.Image} Name={_.Name} activityUrl={_.activityUrl}/>
                )
              }
              if(mainType === 6){
                htmlStr.push(
                  <MallList
                    key={_.Id}
                    commonUrl={commonUrl}
                    AccordingNum={_.AccordingNum}
                    NameSize={_.NameSize}
                    NameColor={_.NameColor}
                    BtnNameSize={_.BtnNameSize}
                    BtnNameColor={_.BtnNameColor}
                    BtnBackColor={_.BtnBackColor}
                    PointsSize={_.PointsSize}
                    PointsColor={_.PointsColor}
                    Style={_.Style}
                    GiftDetialUrl={_.GiftDetialUrl}
                    Gifts={_.Gifts}
                  />
                )
              }
              if(mainType === 7 ){
                htmlStr.push(
                  <TabBar
                    key={_.Id}
                    commonUrl={commonUrl}
                    BaseColor={_.BaseColor}
                    FontSize={_.FontSize}
                    FontColor={_.FontColor}
                    Images={_.Images}
                    SelectColor={_.SelectColor}
                  />
                )
              }
              return htmlStr
            })
          }
        </div>
      </Page>
    );
  }
}
export default IndexPages;
