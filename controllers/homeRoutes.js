const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

//home routes are 'gets' and for use when rendering handlebars

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return;
  }

  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  // if (req.session.logged_in) {
  // console.log("blog page accessed");

  //new
  try {
      const blogData = await Blog.findAll({
          where: {user_id : req.session.user_id},
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
     console.log(err);
      if (!req.session.logged_in) {
          res.redirect('/login');
      }
  }
  //if statement can go here instead of using finally ??
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


module.exports = router;
