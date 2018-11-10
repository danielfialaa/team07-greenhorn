import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { LoginTemplate } from '../templates/LoginTemplate';

export class LoginPage extends Component {
  render() {
    return (
      <LoginTemplate
        title="GreenHornn"
        paragraph="Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
      />
    );
  }
}
