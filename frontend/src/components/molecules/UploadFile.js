import React, { Component } from 'react';
import { Field } from 'formik';
import { Row,Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { Upload, Icon, message } from 'antd';


import api from '../../api'

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

const attachments = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

export class UploadFile extends Component {
  // static propTypes = {
  //   label: PropTypes.string,
  // };

  render(){
    const { label, attachments } = this.props;

    return(
      <Field
        render={({
          field,
        }) =>
      <FormItem label={label}>
      <Dragger {...attachments}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Select the attachment. Uploaded file will be attached to the task</p>
        </Dragger>
      </FormItem>
      }
      />
    );
  }
}
