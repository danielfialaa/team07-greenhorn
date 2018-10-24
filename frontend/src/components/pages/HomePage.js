import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { HomeTemplate } from '../templates/HomeTemplate';


export class HomePage extends Component {
  render() {
    return (
      <HomeTemplate
        title="User List"
      />


    );
  }
}
