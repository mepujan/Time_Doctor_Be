import multer from "multer";
import path from 'path';

//saves user images inside images/profile_picture
export const ProfilePictureStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images/profile_picture');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})