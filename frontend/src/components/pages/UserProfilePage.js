import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { UserProfileTemplate } from '../templates/UserProfileTemplate';
import api from '../../api';


  const data = {
    firstName: "libor",
    lastName: "sionko",
  }

export class UserProfilePage extends Component {
	state = {
		userId: "",
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    department: "",
	}

	componentDidMount() {
		api.get('departmentList')
			.then(({ data }) => {
				console.log(data);
				this.setState(() => ({
					departmentList: data,
				}))
		})
	}
  render() {
    return (
      <UserProfileTemplate
        title={data.firstName + data.lastName} departmentList={this.state.departmentList}
      />


    );
  }
}
