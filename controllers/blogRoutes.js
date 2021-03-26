const router = require('express').Router();
const { User, Blog } = require('../models');
// const Blog = require('../seeds/blogData.json');



router.get('/dashboard', async (req, res) => {
    // if (req.session.logged_in) {
    console.log("blog page accessed");

    //new
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User }],
        });

        const blogPosts = blogData.map((Blog) => Blog.get({ plain: true }));

        console.log(blogPosts);
        res.render("dashboard", {
            blogPosts,
            //added session login instead of if/else logged in
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
    finally {
        if (!req.session.logged_in) {
            res.redirect('/login');
        }
    }
});



router.get('/home', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User }],
        });

        const blogPosts = blogData.map((Blog) => Blog.get({ plain: true }));

        res.render('homepage', { blogPosts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newpost', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('newpost', {
        loggedIn: req.session.logged_in
    });
})



// router.post('/newpost', async (req, res) => {
//     try {
//       const newPost = await Blog.create(req.body);

//       req.session.save(() => {
//         req.session.title =newPost.title;
//         req.session.text=newPost.text;
//         // req.session.user_id = newPost.user_id;

//         res.status(200).json(newPost);
//       });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

router.post('/newpost', async (req, res) => {
    try {
        const newPost = await Blog.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.body.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

    module.exports = router;