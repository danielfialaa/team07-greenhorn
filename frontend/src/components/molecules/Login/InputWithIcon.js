import React, { Component } from 'react';
import { Input, Icon } from 'antd';

export class InputWithIcon extends Component {
  render() {
    const { iconType, placeholder, type, input, ...rest } = this.props;
    return (
      <Input
        prefix={
          <Icon type={iconType || ''} style={{ color: 'rgba(0,0,0,.25)' }} />
        }
        placeholder={placeholder || ''}
        type={type}
        {...{ ...input, ...rest }}
      />
    );
  }
}
