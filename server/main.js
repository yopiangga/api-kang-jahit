import { Meteor } from 'meteor/meteor';
import { Order } from './order/Order';
import { Pencairan } from './pencairan/Pencairan';
import { User } from './user/User';
import { Topup } from './topup/Topup';

if (Meteor.isServer) {
  Meteor.startup(() => {
    // User = new Meteor.Collection('user');

    WebApp.rawConnectHandlers.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
      return next();
    });

  });

  User();
  Order();
  Pencairan();
  Topup();

}
