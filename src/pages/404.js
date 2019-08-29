import React, { PureComponent } from 'react'
import {Exception} from 'ant-design-pro';
class Error extends PureComponent {
  render() {
    return (
      <Exception type="404" />
    )
  }
}
export default Error
