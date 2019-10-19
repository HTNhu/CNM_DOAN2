import React, { lazy, Suspense } from 'react'
// import { inject, observer } from 'mobx-react'
import { Switch, Route, withRouter
    , Redirect 
} 
    from 'react-router-dom'
import Login from './login'
import LayoutPage from './layout'
import { routers }  from '../routes'
import Signup from './signup'
//  import Paycompany from './payment/paycompany'
function Root(props) {
console.log(routers)
const username = localStorage.getItem('username')
  return (  
    <Switch>
   { username 
   ? 
      routers.map((router, index) => (
         !router.type ? <Route 
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
            )}
          }
      /> :
      <Route 
           key={index}
          exact={router.exact}
          path={router.path}
          render={() => { 
             const Component = lazy(() => import(`./payment/${router.component}`))
            return (
             <LayoutPage key={index} menuKey={router.key} {...props} >
                <Suspense fallback={null}>
                  <Component {...props} />
                </Suspense>
              </LayoutPage>
            )}
          }
        />
       ))
        // child.map((router, index) => ())
        
     : <>
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
   <Redirect to='/login' /> 
    </Switch>
  )
}

export default (withRouter(Root))
