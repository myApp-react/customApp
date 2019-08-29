import React, { Component } from 'react';
import withRouter from 'umi/withRouter'
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import BaseLayout from './BaseLayout';

@withRouter
class Layout extends Component {

  render() {
    const { children } = this.props;

    return (
      <ConfigProvider locale={zh_CN}>
        <BaseLayout>{children}</BaseLayout>
      </ConfigProvider>
    )
  }
}

export default Layout;
