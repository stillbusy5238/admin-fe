import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router,Switch, Route,Link,Redirect} from 'react-router-dom';

//页面
import Home from 'page/home/index.jsx';
//登陆
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
//
import Layout from 'component/layout/index.jsx';
import Error from 'page/error/index.jsx';

//分路由
import ProductRouter from 'page/product/router.jsx';

class App extends React.Component{


   render(){
    let LayoutRouter = (
      <Layout>
       <Switch>
         <Route  exact path="/" component={Home}></Route>
         <Route   path="/product" component={ProductRouter}></Route>
         <Route  path="/product-category" component={Home}></Route>
         <Route   path="/user/index" component={UserList}></Route>
         <Redirect   exact from="/user" to="/user/index"></Redirect>
         <Route  component={Error}></Route>


       </Switch>

    </Layout>
    );
    return(
      <Router>
        <Switch>
          <Route  path="/login" component={Login}></Route>
          <Route  path="/" render={ props => LayoutRouter} />




        </Switch>


      </Router>


    );
  }

}



ReactDOM.render(
  <App />,




   document.getElementById('app')
   );
