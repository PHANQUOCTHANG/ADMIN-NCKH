const routerDashboard = require("./dashboard.routes") ;
const routerModel = require("./model.routes") ;
const routerHotspot = require("./hotspot.routes") ;
const routerAuth = require("./auth.routes") ;
const routerAccount = require("./account.routes") ;
const middleware = require("../../middleware/admin/login.middleware") ;
// Các router của admin .
module.exports = (app) => {
    const PATH_ADMIN = "/admin";
    app.use(PATH_ADMIN + "/dashboard" ,  middleware.requireAuth , routerDashboard) ;// Trang chủ
    app.use(PATH_ADMIN + "/hotspot" ,  middleware.requireAuth , routerHotspot) // hotspot .
    app.use(PATH_ADMIN + "/model" ,  middleware.requireAuth , routerModel) // model .
    app.use(PATH_ADMIN + "/account" , middleware.requireAuth , routerAccount) // account .
    app.use(PATH_ADMIN + "/assignment" , middleware.requireAuth , routerAccount) // account .
    app.use(PATH_ADMIN + "/auth" , routerAuth) // auth .
}