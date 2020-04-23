'use strict';
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/dbTest";
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database OK!");
    db.close();
});

let users = [
    {
        userName: 'user1',
        password: '1234',
        firstName: 'fuser1',
        lastName: 'luser1',
		email: 'test@gamil.com',
        role: 'admin'
    },
    {
        userName: 'user2',
        password: '1234',
        firstName: 'fuser2',
        lastName: 'luser2',
		email: 'test2@gamil.com',
        role: 'nurse'
    }
]

module.exports = {

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string'
        },
        email: {
            type: 'string',
            isEmail: true,
            required: true,
            unique: true
        },
        firstname: {
            type: 'string',
            defaultsTo: ''
        },
        lastname: {
            type: 'string',
            defaultsTo: ''
        },
        role: {
            type: 'string',
            defaultsTo: ''
        },
    },

    // Here we encrypt password before creating a User
    beforeCreate(values, next) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                sails.log.error(err);
                return next();
            }

            bcrypt.hash(values.password, salt, (err, hash) => {
                if (err) {
                    sails.log.error(err);
                    return next();
                }
                values.encryptedPassword = hash; // Here is our encrypted password
                return next();
            });
        });
    },

    comparePassword(password, encryptedPassword) {

        return new Promise(function (resolve, reject) {
            bcrypt.compare(password, encryptedPassword, (err, match) => {
                if (err) {
                    sails.log.error(err);
                    return reject("Something went wrong!");
                }
                if (match) return resolve();
                else return reject("Mismatch passwords");
            });
        });
    },

    getUsers() {
        return users;
    },
    async getUser(userName, password) {

        const client = await MongoClient.connect(url);

        if (!client) {
            return;
        }

        try {
            const db = client.db("dbTest");
            const col = db.collection("users");
            const query = { userName: userName, password: password }
            const res = await col.findOne(query);
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

    },
    async registration(doc) {

        const client = await MongoClient.connect(url);

        if (!client) {
            return;
        }

        try {
            const db = client.db("dbTest");
            const col = db.collection("users");
            const res = await col.insertOne(doc);
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

    },
    async getUsersList() {

        const client = await MongoClient.connect(url);

        if (!client) {
            return;
        }

        try {
            const db = client.db("dbTest");
            const col = db.collection("users");
            const res = await col.find({}, { projection: { password: 0 } }).toArray();
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }

    },

};