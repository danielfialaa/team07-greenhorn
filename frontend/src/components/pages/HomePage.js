import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { HomeTemplate } from '../templates/HomeTemplate';
import { connect } from 'react-redux';

import api from '../../api';


export class HomePage extends Component {
	state = {
		isLoading: true,
		isError: false,
		users: "",
	}
	componentDidMount() {
		console.log("ehm");
		api.get('userList')
			.then(({ data }) => {
				console.log("hmm");
				this.setState(() => ({
					isLoading: false,
					users: data
				}))
			})
	}

  render() {
		const { isLoading, users, isLoaded, isError, error } = this.props;
    return (
      <HomeTemplate
				isLoading= {this.state.isLoading}
        isError={this.state.error}
        users={this.state.users}
        error={error}
      />


    );
  }
}
