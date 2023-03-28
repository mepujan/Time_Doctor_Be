import User from '../models/user_model.js';
import Role from '../models/role_model.js';
import { sendmail } from '../sendemail.js';
import { sendSMS } from '../sendSMS.js';
import { config } from '../configurations/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';


export const createUser = async (req, res, next) => {
    /**
     * new user creating method that takes user information
     * save the password in a variable, hash it and append to the json 
     * and then save the data to the database
     * token is created using jwt using secret key
     */
    try {
        const { password } = req.body;
        const user = User.build(req.body);
        const hash_password = await bcrypt.hash(password, 10);
        user.password = hash_password;
        let webPath = req.file.path.replace(/\\/g, '/');
        user.profile_image = path.join(`${config.host}:${config.port}`, webPath);
        const result = await user.save();
        const token = jwt.sign({ email: result.email, id: result.id, username: result.user_name, mobile: result.mobile_number }, process.env.Secret_Key);
        return res.status(201).json({ "message": "User Account Created Successfully.", result, token });

    } catch (e) {
        next(e);
    }
}

export const updateUser = async (req, res, next) => {
    /**
     * Update the information to the user
     * if data is updated successfully, it will call sendmail() and sendSMS() method
     * to notify the user about the change has been done.
     */
    try {
        const updatedUser = await User.update({ first_name: req.body.first_name, middle_name: req.body.middle_name, last_name: req.body.last_name, email: req.body.email, user_name: req.body.user_name, mobile_number: req.body.mobile_number, address: req.body.address, dob: req.body.dob, gender: req.body.gender, blood_group: req.body.blood_group, role_id: req.body.rold_id }, { where: { id: req.id } });
        const { email, mobile_number } = req.body;
        if (updatedUser > 0) {
            sendmail(email, "Account Update", "Account Updated Successfully");
            sendSMS(mobile_number, "Account Updated Successfully");
        }

        return res.status(200).json({ "message": "User Account is Updated" });
    } catch (e) {
        next(e);
    }
}



export const updatePassword = async (req, res, next) => {
    // update user password
    try {
        const { password } = req.body;
        const { id, mobile, email } = req;
        const newHashPassword = await bcrypt.hash(password, 10);
        const updatedPassword = await User.update({ password: newHashPassword }, { where: { id: id } });
        if (updatedPassword) {
            sendmail(email, "Password Update", "Password Updated Successfully");
            sendSMS(mobile, "Password Updated Successfully");
            return res.status(201).json({ "message": "Password Updated Successfully." });
        }
        else {
            return res.status(500).json({ "message": "Cannot Update Password." });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }

}


export const getLoggedInUserDetail = async (req, res, next) => {
    try {
        const { id } = req;
        const userDetail = await User.findByPk(id);
        return res.status(200).json(userDetail);
    } catch (e) {
        next(e)
    }
}


export const getAllUserByRole = async (req, res, next) => {
    try {
        const { role } = req.params;
        const getRoleIdFromName = await Role.findOne({
            where: {
                name: role
            },
            attributes: ['id']
        });


        // return res.send(getRoleIdFromName);

        if (getRoleIdFromName) {
            const { id } = getRoleIdFromName;
            const users = await User.findAll({
                where: {
                    role_id: id
                }
            });
            return res.status(200).json(users);
        }
        return res.status(404).json({ "message": "Users not found" })

    } catch (err) {
        console.log(err);
        next(err);
    }
}