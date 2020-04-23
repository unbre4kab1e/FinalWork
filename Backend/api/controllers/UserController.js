'use strict';

module.exports = {
    
    async login(req, res) {
        try {
            const data = req.body;

            if (!('username' in data && 'password' in data)) return res.badRequest({ success: false,  message: 'Username and password required'});
    
            const result = await User.getUser(data.username, data.password);
            
            if (result) {
                delete result['password'];
                const token = jwtService.sign(result);
                res.send({ success: true, result: result, token:  token});
            } else {
                res.status(400).send({ success: false, message:  'Connexion error'});
            }
            
        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false });
        }



    },
    async registration(req, res) {
        try {
            const data = req.body;
    
            const doc = {
                // email: data.email,
                password: data.password,
                firstName: data.firstname,
                lastName: data.lastname,
                userName: data.username,
                email: data.email,
                role: 'admin'
            }
    
            const result = await User.registration(doc);
            
            res.send({ success: true, result: result });

        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false });
        }

    },
	
    async adduser(req, res) {
        try {
            const data = req.body;
    
            const doc = {
                // email: data.email,
                password: data.password,
                firstName: data.firstname,
                lastName: data.lastname,
                userName: data.username,
                email: data.email,
                role: data.role
            }
    
            const result = await User.registration(doc);
            
            res.send({ success: true, result: result });

        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false });
        }

    },

    async getUsersList(req, res) {
        try {
    
            const result = await User.getUsersList();
            
            res.send({ success: true, result: result });

        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false });
        }

    }
};