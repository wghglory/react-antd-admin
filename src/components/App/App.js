/**
 * index 入口之后的顶层 component，负责布局。使用了 antd 的布局
 * HeaderCustomize: 网站最上部
 * MenuCustomize: 网站左侧
 * ContentCustomize: 网站右侧正文部分
 * Layout.Footer: 使用 antd 默认的网站底部
 */
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Layout} from 'antd'
import HeaderCustomize from '../Header/HeaderCustomize'
import MenuCustomize from '../Menu/MenuCustomize'
import ContentCustomize from '../Content/ContentCustomize'
import './App.scss'

function App() {
    return (
        <Layout>
            <HeaderCustomize/>
            <BrowserRouter>
                <Layout>
                    <Layout.Sider width={200} style={{background: '#fff'}}>
                        <MenuCustomize/>
                    </Layout.Sider>

                    <Layout style={{padding: '0 24px 24px'}}>
                        <ContentCustomize/>

                        <Layout.Footer style={{textAlign: 'center'}}>
                            Hi-fox后台管理
                        </Layout.Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        </Layout>
    )
}

export default App
