const sequelize = require('../config/connection');
const { User, Blog } = require('../models');


const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();









//trying to seed both users and blog jsons
// const sequelize = require('../config/connection');
// const  { User }  = require('../models/User');
// const { Blog } = require('../models/blog');

// const userData = require('./userData.json');
// const blogData = require('./blogData.json');


// const seedUsers = async () => {
//   await sequelize.sync({ force: true });

//  User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// const seedBlogs = async () => {
//   await sequelize.sync({ force: true });

//    Blog.bulkCreate(blogData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };


// seedUsers();
// seedBlogs();