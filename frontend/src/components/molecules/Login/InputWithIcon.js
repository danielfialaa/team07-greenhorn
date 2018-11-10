import React, { Component } from 'react';
import { Input, Icon } from 'antd';

export class InputWithIcon extends Component {
  render() {
    const { iconType, placeholder, defaultValue, type, input, ...rest } = this.props;
    console.log("input with icon");
      console.log(defaultValue);
    return (
      <Input
        prefix={
          <Icon type={iconType || ''} style={{ color: 'rgba(0,0,0,.25)' }} />
        }
        placeholder={placeholder || ''}
        defaultValue={defaultValue}
        type={type}
        {...{ ...input, ...rest }}
      />
    );
  }
}
