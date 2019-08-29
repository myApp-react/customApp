import React, { memo } from 'react'
import styles from './index.less';
import { Prefix } from '@/utils/config'

export default memo((props) => {

  const {
    Fromabove,
    Istemplate,
    BackColor,
    BackImage,
    LeftImage,
    HeadLine,
    HeadLineSize,
    HeadLineColor,
    RightWord,
    RightWordSize,
    RightWordColor,
    RightImage,
    OpenUrl,
    CustomLink,
    commonUrl,
    FuncLink
  } = props;

  const bgType = Istemplate || 1;
  const prefixUrl = Prefix ? Prefix : commonUrl;
  const url = commonUrl && FuncLink ? FuncLink : "javascript:void(0)";
  const propsImg = url => JSON.stringify(url);
  const ImgRender = url => url.replace(/\s/g, encodeURIComponent(' '))
  const ImgUrl = url => commonUrl ? (commonUrl + url) : (Prefix + url)

  // console.warn("bgType",bgType)
  // console.warn("BackColor",BackColor)

  return (
    <div
      className={styles.titlebar}
      style={{
        marginTop: Fromabove || 0,
        fontSize: 20,
        background: `${bgType === 1 ? (BackColor || '#fff') : (BackImage && 'url("'+ ImgUrl(BackImage) +'") 0px 0px / 100% 100% no-repeat')}`,
      }}
    >
      <div className={styles['titlebar-inner']}>
        <a href={url} style={{display: 'block'}}>
          <div className={styles['titlebar-flex']}>
            <div className={styles['left-title']}>
              {
                LeftImage ? <i
                  className={styles['left-icon']}
                  style={{
                    backgroundImage: `url("${ImgUrl(LeftImage)}")`,
                  }}/> : null
              }
              <div className={styles['left-title-text']}
                   style={{
                    fontSize: HeadLineSize,
                    color: HeadLineColor,
                  }}
              >{HeadLine}</div>
            </div>
            <div
              className={styles['right-text']}
            >
              <div
                className={styles['right-text-text']}
                style={{
                  color: RightWordColor,
                  fontSize: RightWordSize,
                }}
              >
                {RightWord}
              </div>
              {
                RightImage ? <i
                  className={styles['right-icon']}
                  style={{
                    backgroundImage: `url("${ImgUrl(RightImage)}")`,
                  }}/> : null
              }
            </div>
          </div>
        </a>
      </div>
    </div>

  )
});


//<NavBar
//       mode="light"
//       className={styles.navbar}
//       style={{
//         marginTop: Fromabove || 0,
//         background: `${bgType === 1 ? (BackColor || '#fff') : (BackImage && 'url('+ prefixUrl + BackImage +')')}`
//       }}
//       icon={LeftImage ? <img key="5" className={styles.leftImg} src={`${prefixUrl + LeftImage}`} alt=""/> : <Icon type="fire" />}
//       rightContent={[
//         <a key="3" href={url} className={styles['right-cont']}>
//           <span
//             key="3"
//             style={{
//               display: 'inline-block',
//               verticalAlign: 'middle',
//               marginRight: '6px',
//               color: RightWordColor,
//               fontSize: RightWordSize,
//               lineHeight: 1.5
//             }}
//           >{RightWord}</span>
//           {
//             RightImage ?
//               <img key="5" className={styles.rightImg} src={`${prefixUrl + RightImage}`} alt=""/> :
//               <Icon key="4" type="right"  style={{ color: '#999', fontSize: 12 }}/>
//           }
//         </a>
//
//       ]}
//     ><span
//       style={{
//         fontSize: HeadLineSize,
//         color: HeadLineColor,
//         display: 'inline-block',
//         verticalAlign: 'middle'
//       }}>{HeadLine}</span></NavBar>
