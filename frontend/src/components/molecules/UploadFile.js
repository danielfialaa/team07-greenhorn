import React, { Component } from 'react';
import { Row, Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { Upload, Icon, message } from 'antd';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

export class UploadFile extends Component {
  onChangeHandler = info => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // triggerParentUpdate(info);
      this.props.triggerParentUpdate(info.file.response.filePath);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { triggerParentUpdate } = this.props.triggerParentUpdate;
    const { label } = this.props;
    return (
      <FormItem label={label}>
        <Dragger onChange={this.onChangeHandler} {...this.props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Select the attachment. Uploaded file will be attached to the task
          </p>
        </Dragger>
      </FormItem>
    );
  }
}
