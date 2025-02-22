
const routerDashboard = require("./dashboard.routes") ;
const routerModel = require("./model.routes") ;
const routerHotspot = require("./hotspot.routes") ;
// Các router của admin .
module.exports = (app) => {
    const PATH_ADMIN = "/admin";
    app.use(PATH_ADMIN + "/dashboard" , routerDashboard) ;// Trang chủ
    app.use(PATH_ADMIN + "/hotspot" , routerHotspot) // hotspot .
    app.use(PATH_ADMIN + "/model" , routerModel) // model .
}