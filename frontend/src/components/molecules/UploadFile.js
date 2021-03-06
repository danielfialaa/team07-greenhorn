import React, { Component } from 'react';
import { Form } from 'antd';
import { Upload, Icon, message } from 'antd';
import { Field } from 'formik';

const FormItem = Form.Item;
const Dragger = Upload.Dragger;

export class UploadFile extends Component {
  onChangeHandler = info => {
    const status = info.file.status;
    if (status === 'done') {
      this.props.triggerParentUpdate(info.file.response.filePath);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { label, name } = this.props;
    return (
      <Field
        name={name}
        render={({ field }) => (
          <FormItem label={label}>
            <Dragger onChange={this.onChangeHandler} {...this.props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Select the attachment. Uploaded file will be attached to the
                task
              </p>
            </Dragger>
          </FormItem>
        )}
      />
    );
  }
}
