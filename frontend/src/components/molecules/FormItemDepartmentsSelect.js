import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import { Field } from 'formik';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option;

const emptyDepartments = [
  {
    id: '',
    departmentName: '',
  },
];

export class FormItemDepartmentsSelect extends Component {
  static propTypes = {
    list: PropTypes.array,
    name: PropTypes.string,
  };

  render() {
    const { list, name, handleBlur, onChange, ...filed } = this.props;

    let listedItems = list || emptyDepartments;
    return (
      <Field
        name={name}
        id="departments"
        render={({ field }) => (
          <FormItem label="Department">
            <Select
              {...field}
              placeholder="Choose responsible department"
              onChange={onChange}
              onBlur={handleBlur}
            >
              {listedItems.map(function(department) {
                return (
                  <Option key={department.id} value={department.id}>
                    {department.departmentName}
                  </Option>
                );
              })}
            </Select>
          </FormItem>
        )}
      />
    );
  }
}
