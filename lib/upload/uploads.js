const multer = require("multer");
const uuid4 = require("uuid4");
const path = require('path');
const fs = require('fs');

const uploads = {

    UPLOAD_PROFILE_MIDDLEWARE: () => {

        const upload = multer({
            storage: multer.diskStorage({
                destination(req, file, done) {

                    let fileDir = `C:\\newTodoList\\upload\\profile_thums\\${req.body.m_id}\\`
                    if (!fs.existsSync(fileDir)) {
                        fs.mkdirSync(fileDir, { recursive: true });
                    }
                    
                    done(null, `C:\\newTodoList\\upload\\profile_thums\\${req.body.m_id}\\`);
                },
                filename(req, file, done) {
                    let uuid = uuid4();
                    let extName = path.extname(file.originalname);
                    let fileName = uuid + extName
                    done(null, fileName);
                },
            }),
            limits: { 
                fileSize: 1024*1024,
            },
        });

        return upload.single('profile_thum');
    },


}

module.exports = uploads;