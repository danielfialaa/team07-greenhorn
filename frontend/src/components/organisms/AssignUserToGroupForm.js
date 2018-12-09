import React, {Component} from 'react';
import { TreeSelect } from 'antd';

import api from '../../api';






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

        
    }

    onChange = (value) => {
        console.log('onChange ', value);
        this.setState({ value });
        
    }

    render () {

        const treeSelectProps = {
            value: this.state.value,
            treeData: this.state.treeData,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            searchPlaceholder: 'Select groups...',
            style: {
                width: 300,
              },
        }
        return (
            <div>
                <TreeSelect {...treeSelectProps}
                 />
            </div>
        );
    }
};