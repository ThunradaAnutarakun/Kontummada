const User = require('../models/user');


const user_index = (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('userslist', { users: result, title: 'All users' });
        })
        .catch(err => {
            console.log(err);
        });
}

const user_details = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.render('details', { user: result, title: 'user Details' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'user not found' });
        });
}

const user_create_get = (req, res) => {
    res.render('create', { title: 'Create a new user' });
}

const user_create_post = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(result => {
            res.redirect('/users');
        })
        .catch(err => {
            console.log(err);
        });
}

const user_update_get = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.render('edit', { user: result, title: 'Edit user' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'user not found' });
        });
}

const user_update_post = (req, res) => {
    const id = req.params.id; // Extract the id from request parameters
    User.findByIdAndUpdate(id, req.body) // Find and update the user document
        .then(result => {
            res.redirect('/users'); // Redirect after successful update
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'User not found' });
        });
}



const user_delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/users' });
        })
        .catch(err => {
            console.log(err);
        });
}


module.exports = {
    user_index,
    user_details,
    user_create_get,
    user_create_post,
    user_update_get,
    user_update_post,
    user_delete
}