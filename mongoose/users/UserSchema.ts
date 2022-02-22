/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef UserSchema Represent users
 * @property {string} username User's username
 * @property {string} password User's password
 * @property {string} firstName User's first name
 * @property {string} lastName User's last name
 * @property {string} email User's email
 * @property {string} profilePhoto User's profile photo
 * @property {string} headerImage User's headerImage
 * @property {string} biography User's biography
 * @property {Date} dateOfBirth User's date of birth
 * @property {string} accountType User's account type where AccountType is an enumeration
 * @property {string} maritalStatus User's marital status where MaritalStatus is an enumeration
 * @property {Date} joined User's joined date
 * @property {LocationSchema} location User's location
 * @property {Number} salary User's salary

 */

const UserSchema = new mongoose.Schema<User>(
    {
        username: {
            type: String,
            required: true,
            default: `testusername${Date.now()}`,
        },
        password: {
            type: String,
            required: true,
            default: `testpassword${Date.now()}`,
        },
        firstName: String,
        lastName: String,
        email: {
            type: String,
            required: true,
            default: `testemail${Date.now()}`,
        },
        profilePhoto: String,
        headerImage: String,
        biography: String,
        dateOfBirth: Date,
        accountType: {
            type: String,
            enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
        },
        maritalStatus: { type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"] },
        location: {
            latitude: Number,
            longitude: Number,
        },
        salary: { type: Number, default: 50000 },
    },
    { collection: "users" }
);

export default UserSchema;
