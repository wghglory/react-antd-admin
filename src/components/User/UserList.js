import './UserList.scss'
import * as api from '../../utils/api'
import moment from 'moment'
import React from 'react'
import {Table, Pagination, Popconfirm, Button} from 'antd'
import UserEditModal from './UserEditModal'
import UserCreateModal from './UserCreateModal'


export default class UserList extends React.Component {
    constructor(props) {
        super(props)

        this.fetchUsers = this.fetchUsers.bind(this)
        this.pageChangeHandler = this.pageChangeHandler.bind(this)
        this.createHandler = this.createHandler.bind(this)
        this.editHandler = this.editHandler.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)

        this.state = {
            loading: true,
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
                loading: false,
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

    pageChangeHandler(pageIndex) {
        // 发给后台的页码从0开始
        this.fetchUsers(pageIndex - 1, this.state.pageSize)
    }

    editHandler(id, values) {
        console.log(id, values)
    }

    deleteHandler(id) {
        console.log(id)
    }

    createHandler(values) {
        console.log(values)
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
            render: text => moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
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
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className="operation">
                    <UserEditModal record={record} onOk={this.editHandler.bind(null, record.id)}>
                        <a>编辑</a>
                    </UserEditModal>
                    <Popconfirm title="Confirm to delete?" onConfirm={this.deleteHandler.bind(null, record.id)}>
                        <a href="">删除</a>
                    </Popconfirm>
                </span>
            ),
            // width: 200
        }]

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`)
            }
        }

        return (
            <div>
                <div className="create">
                    <UserCreateModal record={{}} onOk={this.createHandler}>
                        <Button type="primary">创建用户</Button>
                    </UserCreateModal>
                </div>
                <Table rowSelection={rowSelection} loading={this.state.loading} columns={columns}
                       dataSource={[...this.state.users]}
                       rowKey={record => record.id} size="middle" bordered
                       pagination={false}/>
                <Pagination className="center" current={this.state.pageIndex} onChange={this.pageChangeHandler}
                            total={this.state.totalElements}
                            pageSize={this.state.pageSize}/>
            </div>
        )
    }
}