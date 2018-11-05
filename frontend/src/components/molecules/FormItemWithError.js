import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row,Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Field } from 'formik';

import api from '../../api'

const FormItem = Form.Item;
const Option = Select.Option;

export class FormItemWithError extends Component {
  static propTypes = {
    label: PropTypes.string,
    iconType: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    };

    render() {
      const {  label, iconType, placeholder, type, name, id, value,  handleBlur, handleChange,
        ...filed} = this.props;

      return (
        <Field
          name={name}
          render={({
            field,
            form: { touched, errors },
          }) =>
            <FormItem label={label}>
              <InputWithIcon
                iconType={iconType}
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                {...field}
              />
              {touched[field.name] &&
            errors[field.name] && <div className="error" style={{ color: 'red', minHeight: 24 }}>{errors[field.name]}</div>}
            </FormItem>
        }
        />
      );
    }
}
