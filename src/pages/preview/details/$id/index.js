/**
 * title: 预览页面
 */
import React, { PureComponent } from "react";
import style from './index.less';
import { stringify } from 'qs'
import { connect } from 'dva'
import { renderContByType, router } from '@/utils';
import { Carousel, Grid, TabBar, MallList, TitleBar, Brand } from '@/components'
import activityImg from '@/assets/swiper-banner.png'

@connect(({ app, preview, loading }) => ({ app, preview, loading }))
class IndexPages extends PureComponent {


  render() {
    const { preview } = this.props;
    const { initData } = preview;

    return (
      <div className={style['preview-warp']}>
        {
          initData.map((_, index) => {
            const mainType = _.type;
            let htmlStr = [];
            if(mainType === 1){
              htmlStr.push(<Carousel key={_.Id} IsFloat={_.IsFloat} RollingTime={_.RollingTime || 3000} Images={_.Images}/>)
            }
            if(mainType === 2){
              htmlStr.push(
                <Grid
                  key={_.Id}
                  BackgroundColor={_.BackgroundColor}
                  StyleType={_.StyleType}
                  RowShowType={_.RowShowType}
                  FontSize={_.FontSize}
                  Buttons={_.Buttons}
                />
              )
            }
            if(mainType === 3){
              htmlStr.push(
                <Brand
                  key={_.Id}
                  IsIcon={_.IsIcon}
                  LogoColor={_.LogoColor}
                  BackColor={_.BackColor}
                  ShopPro={_.ShopPro}
                />
              )
            }
            if(mainType === 4){
              htmlStr.push(
                <TitleBar
                  key={_.Id}
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
                />
              )
            }
            if(mainType === 5){
              htmlStr.push(
                <TitleBar
                  key={_.Id}
                  Fromabove={15}
                  Istemplate={1}
                  BackColor={"#fff"}
                  BackImage={null}
                  LeftImage={null}
                  HeadLine={"热门品牌"}
                  HeadLineSize={15}
                  HeadLineColor={'#111111'}
                  RightWord={'更多品牌'}
                  RightWordSize={12}
                  RightWordColor={'#999999'}
                  RightImage={_.RightImage}
                  OpenUrl={_.OpenUrl}
                  CustomLink={_.CustomLink}
                />,
                <div key={2} className={style['item-warp']}>
                  <ul>
                    <li>
                      <div className={style['item-img']}>
                        <img src={activityImg} alt=""/>
                      </div>
                      <p className={style['item-label']}>
                        <span className={style['item-label-text']}>加入尊享会员特别折扣礼遇</span>
                      </p>
                    </li>
                    <li>
                      <div className={style['item-img']}>
                        <img src={activityImg} alt=""/>
                      </div>
                      <p className={style['item-label']}>
                        <span className={style['item-label-text']}>加入尊享会员特别折扣礼遇</span>
                      </p>
                    </li>
                  </ul>
                </div>
              )
            }
            if(mainType === 6){
              htmlStr.push(
                <MallList
                  key={_.Id}
                  AccordingNum={_.AccordingNum}
                  NameSize={_.NameSize}
                  NameColor={_.NameColor}
                  BtnNameSize={_.BtnNameSize}
                  BtnNameColor={_.BtnNameColor}
                  BtnBackColor={_.BtnBackColor}
                  PointsSize={_.PointsSize}
                  PointsColor={_.PointsColor}
                  Style={_.Style}
                />
              )
            }
            if(mainType === 7 ){
              htmlStr.push(
                <TabBar
                  key={_.Id}
                  BaseColor={_.BaseColor}
                  FontSize={_.FontSize}
                  FontColor={_.FontColor}
                  Images={_.Images}
                />
              )
            }
            return htmlStr
          })
        }
      </div>
    );
  }
}
export default IndexPages;
