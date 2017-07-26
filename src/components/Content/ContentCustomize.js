import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../Home/Home'
import UserList from '../User/UserList'
import {Layout} from 'antd'

export default () => (
    <BrowserRouter>
        <Layout.Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/users' component={UserList}/>
                <Route render={() => <p>Not found</p>}/>
            </Switch>
        </Layout.Content>
    </BrowserRouter>
)