/**
 * 创建用户 modal，未来可能把 OrganizationEditModal OrganizationCreateModal 合并，根据 record props 进行判断
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, Form, Input} from 'antd'
const FormItem = Form.Item

class OrganizationCreateModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }

        this.showModelHandler = this.showModelHandler.bind(this)
        this.hideModelHandler = this.hideModelHandler.bind(this)
        this.okHandler = this.okHandler.bind(this)
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

    render() {
        const {children} = this.props
        const {getFieldDecorator} = this.props.form
        const {name, enableSystem} = this.props.record
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }
        }

        return (
            <span>
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal title="创建组织" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler}>
                    <Form layout="horizontal" onSubmit={this.okHandler}>
                        <FormItem {...formItemLayout} label="名字">
                            {getFieldDecorator('name', {initialValue: name})(<Input/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="已激活系统">
                            {getFieldDecorator('enableSystem', {initialValue: enableSystem})(<Input/>)}
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }
}

OrganizationCreateModal.propTypes = {
    children: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    onOk: PropTypes.func.isRequired
}

// 必须调用 Form.create()，否则在使用 getFieldDecorator 时便会出现 getFieldDecorator of undefined 错误
export default Form.create()(OrganizationCreateModal)
