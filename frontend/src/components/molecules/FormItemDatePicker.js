import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button, notification, Select, DatePicker } from 'antd';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';

function defaultDisabledDate(current) {
  return current && current > moment().endOf('day');
}

export class FormItemDatePicker extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    dropdownClassName: PropTypes.string,
    id: PropTypes.string,
  };

  render() {
    const {
      name,
      label,
      dropdownClassName,
      allowClear,
      id,
      onChange,
      ...filed
    } = this.props;
    return (
      <FormItem label={label}>
        <DatePicker
          disabledDate={defaultDisabledDate}
          dropdownClassName={dropdownClassName}
          name={name}
          allowClear={false}
          id={id}
          format={dateFormat}
          onChange={onChange}
          {...filed}
        />
      </FormItem>
    );
  }
}
