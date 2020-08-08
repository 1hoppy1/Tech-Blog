const Post = require("./Post");
const User = require("./User");
const Vote = require("./Vote");

//User can post many posts 13.3.5
User.hasMany(Post, {
  foreignKey: 'user_id'
});

//Each post belongs to one user 13.3.5
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//User can only have one vote???? or many????
//  User.hasOne(Vote, {
//     foreignKey: 'user_id'
// });

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

module.exports = {
  Post,
  User,
  Vote
};