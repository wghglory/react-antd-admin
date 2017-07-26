import React from 'react'
// import PropTypes from 'prop-types'
import * as api from '../../utils/api'
import moment from 'moment'
import {Table, Pagination} from 'antd'

import './UserList.scss'

export default class UserList extends React.Component {
    constructor(props) {
        super(props)

        this.fetchUsers = this.fetchUsers.bind(this)
        this.onChange = this.onChange.bind(this)

        this.state = {
            users: [],
            last: false,   //last page
            totalPages: 0,
            totalElements: 0,
            first: true,  //first page
            numberOfElements: 0,
            sort: null,
            size: 0,   //pagesize
            pageIndex: 0  //pageindex
        }
    }

    componentDidMount() {
        this.fetchUsers()
    }

    fetchUsers(pageIndex, pageSize) {
        api.getUsers(pageIndex, pageSize).then(res => {
            console.log(res)
            this.setState({
                users: res.content,
                last: res.last,
                totalPages: res.totalPages,
                totalElements: res.totalElements,
                first: res.first,
                numberOfElements: res.numberOfElements,
                sort: res.sort,
                pageSize: res.size,
                pageIndex: res.number + 1   // 后台number从0开始，pageIndex从1，展示pagination
            })
        })
    }

    onChange(pageIndex) {
        // 发给后台的页码从0开始
        this.fetchUsers(pageIndex - 1, this.state.pageSize)
    }

    render() {

        const columns = [{
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 200
        }, {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            render: text => <a href="#">{text}</a>,
            // width: 200
        }, {
            title: '真实姓名',
            dataIndex: 'trueName',
            key: 'trueName',
            // width: 200
        }, {
            title: '注册时间',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: text => moment(new Date(text)).format('YYYY-MM-DD | HH:mm:ss'),
            // width: 200
        }, {
            title: '禁用',
            dataIndex: 'enable',
            key: 'enable',
            render: text => text ? '正常' : '禁用',
            // width: 200
        }, {
            title: '组织',
            dataIndex: 'organization',
            key: 'organization',
            // width: 200
        }, {
            title: '权限',
            dataIndex: 'permissions',
            key: 'permissions',
            // width: 200
        }, {
            title: '编辑',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="#">编辑</a>
                    <span className="ant-divider"></span>
                    <a href="#">删除</a>
                </span>
            ),
            // width: 200
        }]

        let data = []

        if (this.state.users.length > 0) {
            data = [...this.state.users.map(u => {
                u.key = u.id
                return u
            })]
        }

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`)
            }
        }

        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} size="middle" bordered
                       pagination={false}/>
                <Pagination className="center" current={this.state.pageIndex} onChange={this.onChange}
                            total={this.state.totalElements}
                            pageSize={this.state.pageSize}/>
            </div>
        )
    }
}

// UserList.propTypes = { users: PropTypes.array.isRequired };