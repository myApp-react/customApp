import React, { PureComponent } from "react";
import { Carousel } from 'antd-mobile';
// import swiperBanner from '@/assets/swiper-banner.png';
import arcImg from '@/assets/swiper-arc-img.png';
import styles from './index.less'
import { Prefix } from '@/utils/config'

export default class CarouselPages extends PureComponent {
  state = {
    data: ['1', '2', '3'],
  }

  render() {
    const { data } = this.state
    const { IsFloat, RollingTime, Images, commonUrl } = this.props;
    // const openUrl = url => commonUrl ? commonUrl + url : 'javascript:;'
    //const openUrl = url => url ? commonUrl ? url : 'javascript:void(0)' : 'javascript:void(0)';

    const ImgUrl = url => commonUrl ? (commonUrl + url) : (Prefix + url)

    return (
      <div className={styles.carousel}>
        <Carousel
          autoplay={true}
          infinite
          autoplayInterval={RollingTime}
          dotStyle={{
            width: 6,
            height: 6,
            background: 'rgba(255,255,255,.6)',
          }}
          dotActiveStyle={{
            width: 6,
            height: 6,
            background: 'rgba(255,255,255,1)',
          }}
        >
          {
            Images.length === 0 ? data.map(_ => (
              <div
                key={_}
                style={{ display: 'inline-block', width: '100%', height: 180, }}
              >
                <img
                  src={`https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png`}
                  alt=""
                  style={{ width: '100%', height: 180, objectFit: 'cover',verticalAlign: 'top' }}
                />
              </div>
            )) : Images.map(_ => {
              if(_.LinkUrl && commonUrl){
                return (
                  <a
                    key={_.Id}
                    href={_.LinkUrl}
                    style={{ display: 'block', width: '100%', height: 180 }}
                  >
                    <img
                      src={ImgUrl(_.ImageUrl)}
                      style={{ width: '100%', height: 180, objectFit: 'cover',verticalAlign: 'top' }}
                    />
                  </a>
                )
              }else {
                return (
                  <div
                    key={_}
                    style={{ display: 'inline-block', width: '100%', height: 180, }}
                  >
                    <img
                      src={ImgUrl(_.ImageUrl)}
                      alt=""
                      style={{ width: '100%', height: 180, objectFit: 'cover',verticalAlign: 'top' }}
                    />
                  </div>
                )
              }
            })
          }
        </Carousel>
        <img src={arcImg} style={{display: `${IsFloat ? 'block' : 'none'}`}} className={styles.arcimg} alt="圆弧图片"/>
      </div>
    )
  }
};


