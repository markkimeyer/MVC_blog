const router = require('express').Router();

router.get('/blog', (req, res) => {
    if (req.session.logged_in) {
      console.log("blog page accessed");
      res.render('blogpage', {layout: 'blogMain.handlebars'});
      return;
    } 
    else {
        res.render('loginpage');
    }
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