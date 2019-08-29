import React, { PureComponent, Fragment } from 'react'
import { Loader } from '@/components'
import './BaseLayout.less'

class BaseLayout extends PureComponent{

  render() {
    const { loading, children } = this.props;

    return (
      <Fragment>
        <Loader fullScreen spinning={false} />
        { children }
      </Fragment>
    )
  }
}

export default BaseLayout
