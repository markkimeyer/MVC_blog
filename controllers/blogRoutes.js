const router = require('express').Router();

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
      console.log("home page accessed");
      res.render('homepage');
      return;
  });

//   router.post('/logout', (req, res) => {
//     if (req.session.logged_in) {
//       req.session.destroy(() => {
//         res.status(204).end();
//       });
//     } else {
//       res.status(404).end();
//     }
//   });
  
    module.exports = router;