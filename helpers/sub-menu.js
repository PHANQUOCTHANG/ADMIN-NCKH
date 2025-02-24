module.exports.subMenu = (productCategory) => {
    let category = [] ;
    function subMenu(productCategory) {
        for (let item in productCategory) {
           category.push(item.id) ;
           if (item.children && item.children.length > 0) {
            subMenu(item.children) ;
           }
        }
    }
    subMenu(productCategory ) ;
    return category  ;
}