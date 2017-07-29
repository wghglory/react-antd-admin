import React, {Component} from 'react'
import {Table, Pagination, Popconfirm, Button} from 'antd'
import {createOrganization, updateOrganization, deleteOrganization, getOrganizations} from '../../services/organization'
import OrganizationEditModal from './OrganizationEditModal'
import OrganizationCreateModal from './OrganizationCreateModal'
import './OrganizationList.scss'

export default class OrganizationList extends Component {
    constructor(props) {
        super(props)

        this.fetchOrganizations = this.fetchOrganizations.bind(this)
        this.pageChangeHandler = this.pageChangeHandler.bind(this)
        this.createHandler = this.createHandler.bind(this)
        this.editHandler = this.editHandler.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)

        this.state = {
            loading: true,
            Organizations: [],
            last: false, //last page
            totalPages: 0,
            totalElements: 0,
            first: true, //first page
            numberOfElements: 0,
            sort: null,
            size: 0, //pagesize
            pageIndex: 0 //pageindex
        }
    }

    componentDidMount() {
        this.fetchOrganizations()
    }

    fetchOrganizations(pageIndex, pageSize) {
        getOrganizations(pageIndex, pageSize).then(res => {
            // console.log(res)
            this.setState({
                loading: false,
                Organizations: res.content,
                last: res.last,
                totalPages: res.totalPages,
                totalElements: res.totalElements,
                first: res.first,
                numberOfElements: res.numberOfElements,
                sort: res.sort,
                pageSize: res.size,
                pageIndex: res.number + 1 // 后台number从0开始，pageIndex从1，展示pagination
            })
        })
    }

    pageChangeHandler(pageIndex) {
        // 发给后台的页码从0开始
        this.fetchOrganizations(pageIndex - 1, this.state.pageSize)
    }

    editHandler(id, values) {
        console.log(id, values)
        updateOrganization(id, values)
    }

    deleteHandler(id) {
        console.log(id)
        deleteOrganization(id)
    }

    createHandler(values) {
        console.log(values)
        createOrganization(values)
    }

    render() {

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            }, {
                title: '名字',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>
            }, {
                title: '已激活系统',
                dataIndex: 'enableSystem',
                key: 'enableSystem'
            }, {
                title: '操作',
                key: 'operation',
                render: (text, record) => (
                    <span className="operation">
                        <OrganizationEditModal record={record} onOk={this.editHandler.bind(null, record.id)}>
                            <a>编辑</a>
                        </OrganizationEditModal>
                        <Popconfirm title="Confirm to delete?" onConfirm={this.deleteHandler.bind(null, record.id)}>
                            <a href="">删除</a>
                        </Popconfirm>
                    </span>
                )
            }
        ]

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`)
            }
        }

        const dataSet = this.state.Organizations != null ? this.state.Organizations : []

        return (
            <div>
                <div className="create">
                    <OrganizationCreateModal record={{}} onOk={this.createHandler}>
                        <Button type="primary">创建组织</Button>
                    </OrganizationCreateModal>
                </div>
                <Table
                    rowSelection={rowSelection}
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={dataSet}
                    rowKey={record => record.id}
                    size="middle"
                    bordered
                    pagination={false}/>
                <Pagination
                    className="center"
                    showTotal={(total, range) => `${range[0]}-${range[1]} / ${total} 条`}
                    showQuickJumper
                    current={this.state.pageIndex}
                    onChange={this.pageChangeHandler}
                    total={this.state.totalElements}
                    pageSize={this.state.pageSize}/>
            </div>
        )
    }
}