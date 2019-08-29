import React, {PureComponent, Fragment} from 'react';
import { Helmet } from 'react-helmet'
import style from './index.less'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css';
import { connect } from 'dva'
import { notification } from 'antd/lib/index';
import { Carousel, Grid, TabBar, MallList, TitleBar, Brand } from '@/components'

@connect(({ pagesedit, loading }) => ({ pagesedit, loading }))
class PreviewPages extends PureComponent {

  render() {
    return (
      <Fragment>

        {/*<div className={style.test}>*/}
          {/*哈哈哈*/}
        {/*</div>*/}

        {/*<div className="swiper-container">*/}
          {/*<div className="swiper-wrapper">*/}
            {/*/!*{imgHtml}*!/*/}
          {/*</div>*/}
        {/*</div>*/}
        <div className={style['preview-warp']}>
          <Carousel isFloat={true}/>
          <Grid columnNum={5} isCarousel={true}/>
          <TitleBar />
          <MallList />
          <TitleBar />
          <Brand />
          <TabBar />
        </div>
      </Fragment>
    );
  }
}

export default PreviewPages
