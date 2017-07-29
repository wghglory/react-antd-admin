import React from 'react'
import {Layout, Menu} from 'antd'
import './Header.scss'

export default () => (
    //<a href="#" onClick={location.href = "http://192.168.1.112:8282/center/logout/cas"}>Sign out</a>
    <Layout.Header className="header">
        <div className="logo">创狐科技</div>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{lineHeight: '64px'}}
        >
            <Menu.Item key="1">Hello User</Menu.Item>
            <Menu.Item key="2">通知</Menu.Item>
            <Menu.Item key="3">其他</Menu.Item>
        </Menu>
    </Layout.Header>
)