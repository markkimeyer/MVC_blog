const router = require('express').Router();
const { User, Blog } = require('../../models');
// const Blog = require('../seeds/blogData.json');


//should be moved to API, these are data routes


router.put("/:id", async (req, res) => {
    // try {
    //     const updateBlog = await Blog.update({

    //         title: req.body.title,
    //         text: req.body.text,
    //     },
    //     {
    //         where: {
    //         id: req.params.id
    //     },
       
    // });

    // res.status(200)
        

    // }
    // catch {

    // }
});





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
            user_id: req.session.user_id,
            
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

    module.exports = router;