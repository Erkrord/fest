const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..//uploads/'))
    },

    filename: (req, file, cb) => {
        let extArray = file
            .mimetype
            .split("/");
        let extension = extArray[extArray.length - 1]
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)

    }
})

module.exports = {
    upload
}
