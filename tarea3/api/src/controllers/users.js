const User = require('../models/user');
const ResponseStatus = require('./../../utils/response-status')

class usersController {
    getUsers(req, res){
        User.find().then(response =>{
            res.send(response);
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send("Something went wrong")
        } )
   }

   async getUserById(req, res){
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(ResponseStatus.NOT_FOUND).send('Usuario no encontrado');
        }
        res.send(user);
    } catch (error) {
        res.status(ResponseStatus.BAD_REQUEST).send(error);
    }
}

   createUser(req, res){
        try {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
            });
            user.save();
            res.status(ResponseStatus.SUCCESS).send(user);
        } catch (error) {
            res.status(ResponseStatus.BAD_REQUEST).send(error);
        }
    };

   async updateUser(req, res){
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(ResponseStatus.NOT_FOUND).send();
        }
        res.send(user);
    } catch (error) {
        res.status(ResponseStatus.BAD_REQUEST).send(error);
    }
};

   async deleteUser(req, res){
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(ResponseStatus.NOT_FOUND).send();
        }
        res.send("Deleted user: " + user);
    } catch (error) {
        res.status(ResponseStatus.ISE).send(error);
    }
}
}

module.exports = new usersController();