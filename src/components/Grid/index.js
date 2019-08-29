import React, { memo } from 'react'
import { Grid } from 'antd-mobile';
import { Prefix } from '@/utils/config'
import styles from './index.less'

export default memo((props) => {
  // console.warn(props)

  const data = Array.from(new Array(10)).map((_val, i) => ({
    ImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    Name: `选项${i}`,
  }));
  const { BackgroundColor, Buttons, FontSize, StyleType, RowShowType, columnNum, bgColor, FontColor, commonUrl } = props
  const isCarousel = RowShowType !== 0;

  const openUrl = (el, index) => {
    if(commonUrl && el.LinkUrl){
      window.location.href = el.LinkUrl;
    }
  }
  const ImgUrl = url => commonUrl ? (commonUrl + url) : (Prefix + url);
  console.log("功能模块-字体颜色", FontColor)
  return (
    <div
      className={styles.container}
      style={{
        background: BackgroundColor,
      }}
    >
      <Grid
        data={Buttons.length === 0 ? data : Buttons}
        hasLine={false}
        columnNum={StyleType || 5}
        isCarousel={isCarousel}
        carouselMaxRow={2}
        swipeSpeed={20}
        onClick={openUrl}
        square={false}
        dotStyle={{
          width: 15,
          height: 2,
          margin: 0,
          borderRadius: 0,
        }}
        dotActiveStyle={{
          width: 15,
          height: 2,
          margin: 0,
          borderRadius: 0,
        }}
        renderItem={dataItem => (
          <div style={{ padding: '0' }}>
            <img src={Buttons.length === 0 ? dataItem.ImageUrl : ImgUrl(dataItem.ImageUrl)} style={{ width: '40px', height: '40px' }} alt="" />
            <div className={styles['grid-text-wrap']} style={{ color: FontColor || '#000000', fontSize: FontSize || 14,}}>
              <span className={styles['grid-text']} style={{WebkitBoxOrient: 'vertical'}}>{dataItem.Name}</span>
            </div>
          </div>
        )}
        itemStyle={{
          height: 73,
          background: BackgroundColor,
          color: "#fff"
        }}
      />
    </div>
  )
});
