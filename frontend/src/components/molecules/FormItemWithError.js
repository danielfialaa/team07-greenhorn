import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Field } from 'formik';


const FormItem = Form.Item;

export class FormItemWithError extends Component {
  static propTypes = {
    label: PropTypes.string,
    iconType: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
  };

  render() {
    const {
      label,
      iconType,
      placeholder,
      type,
      name,
      id,
      defaultValue,
      value,
      handleBlur,
      handleChange,
    } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form: { touched, errors } }) => (
          <FormItem label={label}>
            <InputWithIcon
              iconType={iconType}
              type={type}
              id={id}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              {...field}
            />
            {touched[field.name] &&
              errors[field.name] && (
                <div className="error" style={{ color: 'red', minHeight: 24 }}>
                  {errors[field.name]}
                </div>
              )}
          </FormItem>
        )}
      />
    );
  }
}
