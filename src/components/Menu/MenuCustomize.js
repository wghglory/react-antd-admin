import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd'

export default() => (
    <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{height: '100%', borderRight: 0}}
    >
        <Menu.Item key="1"><Link to="/"><Icon type="home" />Dashboard</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/users"><Icon type="user" />用户管理</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/organizations"><Icon type="team" />组织管理</Link></Menu.Item>
    </Menu>
)

/*  <Menu.SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
        </Menu.SubMenu> */