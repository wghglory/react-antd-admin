import moment from 'moment'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, Form, Input, Radio, Select} from 'antd'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const Option = Select.Option

class UserEditModal extends Component {

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

    enableChangeHandler(e) {
        console.log(`enable changed to ${e.target.value}`)
    }

    selectChangeHandler(value) {
        console.log('selected ' + value)
    }

    render() {
        const {children} = this.props
        const {getFieldDecorator} = this.props.form
        const {
            id,
            userName,
            trueName,
            organizationName,
            permissions,
            enable,
            createdOn,
            phone,
            email
        } = this.props.record
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
                <Modal title="编辑用户" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler}>
                    <Form layout="horizontal" onSubmit={this.okHandler}>
                        <FormItem {...formItemLayout} label="id">{id}</FormItem>
                        <FormItem {...formItemLayout} label="创建时间">
                            {moment(new Date(createdOn)).format('YYYY-MM-DD HH:mm:ss')}
                        </FormItem>
                        <FormItem {...formItemLayout} label="用户名">
                            {userName}
                        </FormItem>
                        <FormItem {...formItemLayout} label="真实姓名">
                            {getFieldDecorator('trueName', {initialValue: trueName})(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="电话">
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        type: 'number',
                                        message: '电话号码必须为数字'
                                    }
                                ],
                                initialValue: phone
                            })(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '邮箱不合法'
                                    }
                                ],
                                initialValue: email
                            })(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="状态">
                            {getFieldDecorator('enable', {initialValue: enable})(
                                <RadioGroup onChange={this.enableChangeHandler}>
                                    <Radio value={true}>正常</Radio>
                                    <Radio value={false}>禁用</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="组织">
                            {getFieldDecorator('organizationName', {initialValue: organizationName})(Dropdown)}
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

UserEditModal.propTypes = {
    children: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    onOk: PropTypes.func.isRequired,
    organizationMap: PropTypes.object.isRequired
}

// 必须调用 Form.create()，否则在使用 getFieldDecorator 时便会出现 getFieldDecorator of undefined 错误
export default Form.create()(UserEditModal)
