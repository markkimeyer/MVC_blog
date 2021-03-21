const router = require('express').Router();
const Blog = require('../seeds/blogData.json');



router.get('/dashboard', (req, res) => {
    if (req.session.logged_in) {
      console.log("blog page accessed");
      res.render('dashboard', {layout: 'blogMain.handlebars'});
    } 
    else {
        res.render('login');
        //   alert('Please login to access the Dashboard');
    }
  });

  router.get('/home', (req, res) => {
      res.render('homepage', {blog: Blog} );
  });


  


    module.exports = router;