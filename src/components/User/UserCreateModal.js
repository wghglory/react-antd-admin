/**
 * 创建用户modal，未来可能把UserEditModal UserCreateModal 合并，根据record props进行判断
 */
import React, {Component} from 'react'
import {Modal, Form, Input} from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item

class UserCreateModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }

        this.showModelHandler = this.showModelHandler.bind(this)
        this.hideModelHandler = this.hideModelHandler.bind(this)
        this.okHandler = this.okHandler.bind(this)
    }

    showModelHandler(e) {
        if (e) e.stopPropagation()
        this.setState({
            visible: true,
        })
    }

    hideModelHandler() {
        this.setState({
            visible: false,
        })
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

    render() {
        const {children} = this.props
        const {getFieldDecorator} = this.props.form
        const {userName, trueName, organization, permissions} = this.props.record
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }

        return (
            <span>
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal
                    title="创建用户"
                    visible={this.state.visible}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                >
                    <Form layout="horizontal" onSubmit={this.okHandler}>
                        <FormItem
                            {...formItemLayout}
                            label="用户名"
                        >
                            {
                                getFieldDecorator('userName', {
                                    initialValue: userName,
                                })(<Input/>)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="真实姓名"
                        >
                            {
                                getFieldDecorator('trueName', {
                                    initialValue: trueName,
                                })(<Input/>)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="组织"
                        >
                            {
                                getFieldDecorator('organization', {
                                    initialValue: organization,
                                })(<Input/>)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="权限"
                        >
                            {
                                getFieldDecorator('permissions', {
                                    initialValue: permissions,
                                })(<Input/>)
                            }
                        </FormItem>

                    </Form>
                </Modal>
            </span>
        )
    }
}

UserCreateModal.propTypes = {
    children: PropTypes.element.isRequired,
    form: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    onOk: PropTypes.func.isRequired
}

// 必须调用Form.create()，否则在使用getFieldDecorator时便会出现getFieldDecorator of undefined错误
export default Form.create()(UserCreateModal)
