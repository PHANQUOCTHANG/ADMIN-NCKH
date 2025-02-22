// const Hotspot = require("../../model/hotspot.model") ;

// module.exports.index = async (req , res) =>{
//     const hotspots = await Hotspot.find({delete : false , status : "active"});
//     console.log(hotspots) ;
//     const hotspot = JSON.stringify(hotspots) ;
//     res.render("client/pages/home/index.pug" , 
//         {
//             title : "Home" ,
//             hotspot : hotspot,
//             hotspots : hotspots ,
//         }
//     )
// }