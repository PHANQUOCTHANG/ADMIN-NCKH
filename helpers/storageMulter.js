const multer = require("multer") ;

// xử lí file ảnh khi đưa vào folder upload để ảnh có thể truy cập online (có đuôi ảnh) . 
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/upload') ;
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() ;
          cb(null, `${uniqueSuffix}-${file.originalname}`)  ;
        } ,
      }) ;
      return storage ; // is function .
}