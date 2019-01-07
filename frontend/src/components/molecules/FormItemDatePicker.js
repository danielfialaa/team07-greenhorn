import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form, DatePicker } from 'antd';
import moment from 'moment';

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
      <Field
        name={name}
        id={id}
        render={({ field }) => (
          <FormItem label={label}>
            <DatePicker
              disabledDate={defaultDisabledDate}
              dropdownClassName={dropdownClassName}
              allowClear={false}
              format={dateFormat}
              onChange={onChange}
              {...filed}
            />
          </FormItem>
        )}
      />
    );
  }
}
