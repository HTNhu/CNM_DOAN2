import React, { lazy, Suspense } from 'react'
// import { inject, observer } from 'mobx-react'
import {
  Switch, Route, withRouter
  , Redirect
}
  from 'react-router-dom'
import Login from './login'
import LayoutPage from './layout'
import { routers } from '../routes'
import Signup from './signup'
//  import Breadcrumbs from '../component/breadcrumb'
function Root(props) {
  
  const username = localStorage.getItem('username')
  const type = localStorage.getItem('type')
  console.log(username)
  return (
  // <>
    /* <Breadcrumbs>
      {routers.map(({ path, breadcrumbName }) => (
        <Link key={path} to={path}>
          {breadcrumbName}
        </Link>
      ))}
    </Breadcrumbs> */
    <Switch>
      {username
        ?
        routers.map((router, index) => (
          <Route
            key={index}
            exact={router.exact}
            path={router.path}
            render={() => {
              const Component = lazy(() => import(`./${router.component}`))
              return (
                <LayoutPage key={index} menuKey={router.key} {...props} >
                  <Suspense fallback={null}>
                    <Component {...props} />
                  </Suspense>
                </LayoutPage>
              )
            }}
          ></Route>))

        : <>
        <Route
            path='/'
            render={() => {
              const Component = lazy(() => import(`./login`))
              return (
                <Login {...props}>
                  <Suspense fallback={null}></Suspense>
                  <Component {...props} />
                </Login>
              )
            }}
          />
         <Route
            path='/login'
            render={() => {
              const Component = lazy(() => import(`./login`))
              return (
                <Login {...props}>
                  <Suspense fallback={null}></Suspense>
                  <Component {...props} />
                </Login>
              )
            }}
          />
          <Route
            path='/signup'
            render={() => {
              const Component = lazy(() => import(`./signup`))
              return (
                <Signup {...props}>
                  <Suspense fallback={null}></Suspense>
                  <Component {...props} />
                </Signup>
              )
            }}
          /> </>}

      { !username 
      ? <Redirect to='/' /> 
      : type === 'member' 
      ? <Redirect to='/payment' />  
      : type === 'company' 
      ? <Redirect to='/managebill'/>
      : <Redirect to='/managecompany' /> 
    }
    </Switch>
    // </>
  )
}

export default (withRouter(Root))
