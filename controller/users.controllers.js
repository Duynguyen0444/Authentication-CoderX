var db = require("../db");
var User = require('../models/user.model');
var shortid = require('shortid');
var bcrypt = require('bcrypt');
var pagination = require('../utils/pagination');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});
// cloudinary.config({
//   cloud_name: "dqxudw2je",
//   api_key: 369422698625971,
//   api_secret: "kyihKLIG-FAqWXXoXFAOEhXvjRc"
// });

module.exports.index = (req, res) => {
	let filtered = db.get('users').value();
	let result = pagination(req.query.page, filtered);

	res.render('users/index', {
		users: result.filtered,
		pagination: result.pagination,
	});
	// User.find().then(function (user) {
	//   res.render("users/index", {
	// users: result.filtered,
	// pagination: result.pagination,
	//     user: user
	//   });
	// });
};

module.exports.create = (request, response) => {
	response.render('users/create');
};

module.exports.createPost = async (request, response) => {
	let newUser = request.body;
	let hashedPassword = await bcrypt.hash(newUser.password, 10);

	newUser.id = shortid.generate();
	newUser.isAdmin = false;
	newUser.password = hashedPassword;
	// Chuyển đổi path image
	newUser.avatar = 'https://res.cloudinary.com/malburo/image/upload/v1587739176/default-avatar_o2xet3.webp';

	db.get('users').push(newUser).write();
	//await User.create(newUser);
	response.redirect('/users');

	// req.body.password = hashedPassword;
	// db.get("users")
	//   .push(req.body)
	//   .write();
	// res.redirect("/users");
};
// ---------------------View user---------------------
module.exports.view = (request, response) => {
	let id = request.params.id;
	let user = db.get('users').find({ id: id }).value();
	response.render('users/view', {
		user: user,
	});
};

// ---------------------Update User---------------------
module.exports.update = async (request, response) => {
	let id = request.params.id;
	let userUpdate = db.get('users').find({ id: id }).value();

	//await User.findByIdAndUpdate({ id: id });
	response.render('users/update', {
		user: userUpdate,
	});
};

module.exports.updatePost = async (request, response) => {
	let id = request.params.id;
	let requestBody = request.body;

	requestBody.avatar = request.file.path.split('\\').slice(1).join('/');
	cloudinary.uploader.upload(request.file.path, async function (error, result) {
		requestBody.avatar = result.url;

		db.get('users').find({ id: id }).assign({ name: requestBody.name, avatar: requestBody.avatar }).write();

		// await User.findByIdAndUpdate(id, {
		// 	name: requestBody.name,
		// 	avatar: requestBody.avatar,
		// });
		response.redirect('/users');
	});
	response.redirect('/users');
};

// ---------------------Delete User---------------------
module.exports.delete = async (request, response) => {
	let id = request.params.id;

	db.get('users').remove({ id: id }).write();

	//await User.findByIdAndRemove({ id: id });
	response.redirect('/users');
};
