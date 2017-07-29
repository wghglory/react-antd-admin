import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import Home from '../Home/Home'
import UserList from '../User/UserList'
import OrganizationList from '../Organization/OrganizationList'


export default () => (
    <Layout.Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/users' component={UserList}/>
            <Route exact path='/organizations' component={OrganizationList}/>
            <Route render={() => <p>Not found</p>}/>
        </Switch>
    </Layout.Content>
)