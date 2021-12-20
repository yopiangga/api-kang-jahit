import { Meteor } from 'meteor/meteor';
import { Order } from './order/Order';
import { Pencairan } from './pencairan/Pencairan';
import { User } from './user/User';
import { Topup } from './topup/Topup';

if (Meteor.isServer) {
  
  Meteor.startup(() => {
    // User = new Meteor.Collection('user');
    WebApp.rawConnectHandlers.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');

      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      res.setHeader("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");
      // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
      return next();
    });

  });

  User();
  Order();
  Pencairan();
  Topup();

}
