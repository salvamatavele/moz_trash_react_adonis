import React from 'react';
import { Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import Unfound from './pages/errors/404.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/admin/Admin.jsx';
import Auth from './pages/auth/Auth.jsx';
import Companies from './pages/admin/Companies';
import Users from './pages/admin/Users';
import Alerts from './pages/admin/Alerts';
import Adverts from './pages/admin/Adverts';
import Claims from './pages/admin/claims/Claims';
import ShowClaim from './pages/admin/claims/Show';
import Tips from './pages/admin/tips/Tips';
import ShowTip from './pages/admin/tips/Show'
import Schedules from './pages/admin/Schedules';
import Notifications from './pages/admin/notifications/index';
import Notify from './pages/admin/notifications/Notify';

import Tip from './pages/tip/index';
import TipById from './pages/tip/Tip';
import Advert from './pages/advert/index';
import AdvertById from './pages/advert/Advert';
import Notification from './pages/notification/index'
import ProtectedRoute from './components/ProtectedRoute';

function routes() {
  return (
    <>
     <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/tips" component={Tip} />
      <Route exact path="/tips/:id" component={TipById} />
      <Route exact path="/adverts" component={Advert} />
      <Route exact path="/adverts/:id" component={AdvertById} />
      <ProtectedRoute exact path="/notifications" component={Notification}/>

      {/* Admin */}
      <PrivateRoute exact access={3} path='/Dashboard' component={Admin}/>
      <PrivateRoute exact access={1} path="/admin/companies" component={Companies}/>
      <PrivateRoute exact access={2} path="/admin/users" component={Users}/>
      <PrivateRoute exact access={3} path="/admin/adverts" component={Adverts}/>
      <PrivateRoute exact access={3} path="/admin/alerts" component={Alerts}/>
      <PrivateRoute exact access={3} path="/admin/claims" component={Claims}/>
      <PrivateRoute exact access={3} path="/admin/claims/:id" component={ShowClaim}/>
      <PrivateRoute exact access={3} path="/admin/tips" component={Tips}/>
      <PrivateRoute exact access={3} path="/admin/tips/:id" component={ShowTip}/>
      <PrivateRoute exact access={3} path="/admin/schedules" component={Schedules}/>
      <PrivateRoute exact access={3} path="/admin/notifications" component={Notifications}/>
      <PrivateRoute exact access={3} path="/admin/notifications/:id" component={Notify} />

      {/**Authentications Routes */}
      <Route path="/login" component={Auth} />
      {/**NotFound Router */}
      <Route path="*" component={Unfound} />
    </Switch> 
    </>
  )
}

export default routes