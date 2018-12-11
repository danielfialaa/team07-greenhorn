import React, {Component} from 'react';
import { TreeSelect, Transfer, Form } from 'antd';

import api from '../../api';
const FormItem = Form.item;


export class GroupForm extends Component {
    state = {
        value: [],
        treeData: []
    }

    componentDidMount() {
        api.get('groupList').then(({ data }) => {
            const treeDataArray = [];

            data.response.map(group => {
                const treeData = {
                    key: group.id,
                    title: group.groupName,
                    value: group.id
                }
                treeDataArray.push(treeData);
            })

            this.setState(() => ({
                treeData: treeDataArray
            }));
        });

        api.get('userGroups/'+this.props.userId).then(({ data }) => {
            const valueArray = []

            data.response.map((group) => {
                valueArray.push(group.groupId)
            });

            this.setState(() => ({
                value: valueArray
            }));
        });
        
    }

    onChange = (value) => {
        this.setState({ value });

        value.forEach((current) => {
            const reqData = {
                userId: this.props.userId,
                groupId: current
            }
            
            api.post('userGroups/' + this.props.userId + '/update', reqData);
            console.log(reqData);
        })
        
    }

    render () {

        return (
            <div>
                <Transfer
                    //ty vlevo
                    dataSource={this.state.treeData}
                    showSearch
                    filterOption={this.filterOption}
                    //ty vpravo
                    targetKeys={this.state.value}
                    onChange={this.onChange}
                    render={item => item.title}
                />
            </div>
        );
    }
};