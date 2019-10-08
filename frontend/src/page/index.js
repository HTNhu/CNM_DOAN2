import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from '../routes'
import login from './login'
import signup from './signup'
import payment from './payment'
import LayoutApp from './layout'
import bg from '../assets/images/bg.jpg'
function Root(props) {
    console.log(routes)
    return (
        <div style={{ backgroundImage: `url(${bg})`, height:'750px' }}>
            <LayoutApp ></LayoutApp>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={payment} />
                    <Route
                        path='/signup'
                        component={signup} />
                    <Route
                        path='/login'
                        component={login} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default Root