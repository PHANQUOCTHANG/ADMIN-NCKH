
// Hàm in danh mục theo thứ tự từ lớn đến nhỏ .
function createTree(arr,parent_id = "") {
    let tree = [] ;
    arr.forEach(item => {
        if (item.parent_id === parent_id) {
            let newItem = item;
            let children = createTree(arr,item.id) ;
            if (children.length > 0) {
                newItem.children = children ;
            }
            tree.push(newItem) ;
        }
    });
    return tree ;
}

module.exports.tree = (arr,parent_id="") => {
    const tree = createTree(arr,parent_id) ;
    return tree ;
}