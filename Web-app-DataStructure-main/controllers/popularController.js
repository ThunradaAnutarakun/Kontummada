const Popular = require('../models/popular');

const popular_index = (req, res) => {
    Popular.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('popularcloth', { items: result, title: 'Collections' });
        })
        .catch(err => {
            console.log(err);
        });
}

const popular_create_get = (req, res) => {
    res.render('popularcreate', { title: 'Add new item' });
}

const popular_create_post = (req, res) => {
    const popular = new Popular(req.body);
    popular.save()
        .then(result => {
            res.redirect('/popular');
        })
        .catch(err => {
            console.log(err);
        });
}

const popular_delete = (req, res) => {
    const id = req.params.id;
    Popular.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/popular' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    popular_index,
    popular_create_get,
    popular_create_post,
    popular_delete
}