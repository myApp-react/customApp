import React, { PureComponent, memo } from 'react'
import { Prefix } from '@/utils/config'
import style from './index.less';
import activityImg from '@/assets/swiper-banner.png'
export default memo((props) => {
  const { Image, Name, commonUrl, activityId, activityUrl } = props;
  const url = commonUrl && activityUrl ? `${activityUrl}?activityId=${activityId}` : "javascript:void(0)"
  const ImgUrl = url => commonUrl ? (commonUrl + url) : (Prefix + url)
  return (
    <a href={url} className={style.url}>
      <div className={style['item-list-warp']}>
        <div className={style['item-img']}>
          <img src={Image ? ImgUrl(Image) : activityImg} alt=""/>
        </div>
        <p className={style['item-label']}>
          <span className={style['item-label-text']}>{Name ? Name : '推荐活动描述'}</span>
        </p>
      </div>
    </a>
  )
})
