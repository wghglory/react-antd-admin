/**
 * 创建用户 modal，未来可能把 UserEditModal UserCreateModal 合并，根据 record props 进行判断
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, Form, Input, Select} from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class UserCreateModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }

        this.showModelHandler = this.showModelHandler.bind(this)
        this.hideModelHandler = this.hideModelHandler.bind(this)
        this.okHandler = this.okHandler.bind(this)
        this.selectChangeHandler = this.selectChangeHandler.bind(this)
    }

    showModelHandler(e) {
        e.stopPropagation()
        this.setState({visible: true})
    }

    hideModelHandler() {
        this.setState({visible: false})
    }

    okHandler() {
        const {onOk} = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values)
                this.hideModelHandler()
            }
        })
    }

    selectChangeHandler(value) {
        console.log('selected ' + value)
    }

    render() {
        const {children} = this.props
        const {getFieldDecorator} = this.props.form
        const {userName, trueName, organization, permissions} = this.props.record
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }
        }

        let DropdownItem = []
        for (const [id, name] of this.props.organizationMap) {
            DropdownItem.push(<Option key={id}>{name}({id})</Option>)
        }
        const Dropdown = (<Select showSearch={true} searchPlaceholder="输入" onChange={this.selectChangeHandler}>{DropdownItem}</Select>)

        return (
            <span>
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal title="创建用户" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler}>
                    <Form layout="horizontal" onSubmit={this.okHandler}>
                        <FormItem {...formItemLayout} label="用户名">
                            {getFieldDecorator('userName', {initialValue: userName, rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                }
                            ]})(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="真实姓名">
                            {getFieldDecorator('trueName', {initialValue: trueName})(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码">
                            {getFieldDecorator('passWord')(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="电话号码">
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        type: 'number',
                                        message: '电话号码必须为数字'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮件">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '邮箱不合法'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="组织">
                            {getFieldDecorator('organization', {initialValue: organization, rules: [
                                {
                                    required: true,
                                    message: '请选择一个组织'
                                }
                            ]})(Dropdown)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="权限">
                            {getFieldDecorator('permissions', {initialValue: permissions})(<Input/>)}
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }
}

UserCreateModal.propTypes = {
    children: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    onOk: PropTypes.func.isRequired,
    organizationMap: PropTypes.object.isRequired
}

// 必须调用 Form.create()，否则在使用 getFieldDecorator 时便会出现 getFieldDecorator of undefined 错误
export default Form.create()(UserCreateModal)
