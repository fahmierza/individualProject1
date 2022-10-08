var express = require('express');
var router = express.Router();

const moment = require('moment');
const multer = require('multer');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, '../individualProject1/images');
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname);
	}
  });
  
const upload = multer({
	storage: fileStorage
})

const db = require('../models');
const News = db.newss;
const Comment = db.comments;
const Op = db.Sequelize.Op;


/* GET home page. */

router.get('/', function (req, res, next) {

	News.findAll()
		.then(newss => {
			res.render('index', {
				title: 'NEWS',
				newss: newss,
				moment: moment
			});
		})
		.catch(err => {
			res.render('index', {
				title: 'NEWS'
			});
		});

});

//detail news
router.get('/newsdetail/:id', async function (req, res, next) {
	const id = req.params.id;
	const commentss = await Comment.findAll({ where: { idnews: id } });
	await News.findByPk(id)
		.then(detailNews => {
			if (detailNews) {
				res.render('newsdetail', {
					title: 'Berita',
					newss: detailNews,
					comments: commentss,
					moment: moment
				});
			} else {
				res.status(404).send({
					message: "tidak ada id=" + id
				})
			}
		})
		.catch(err => {
			res.render('index', {
				title: 'Berita Terkini'
			});
		});

});

//add news
router.get('/addnews', function(req, res, next) {
	res.render('addnews', { title: 'Tambah Berita' });
  });
  router.post('/addnews', upload.array('image', 1), function(req, res, next) {
	let image = req.files[0].filename;

		let news = {
		  judul: req.body.judul,
		  author: req.body.author,
		  artikel: req.body.artikel,
		  image: image
	  }
	  News.create(news)
	  .then(data => {
		  res.redirect('/');
	  })
	  .catch(err => {
		  res.render('addnews', { 
		title: 'Tambah Berita'
	  });
	  });
  });

  router.get('/deletenews/:id', function(req, res, next) {  
	var id = parseInt(req.params.id);
	News.destroy({
		  where: {id: id}
	  })
	  .then(num => {
	  res.redirect('/');
	  })
	  .catch(err => {
		  res.json({
			  info: "Error",
			  message: err.message
		  });
	  });  
  
  });

router.get('/editnews/:id', function (req, res, next) {
	const id = parseInt(req.params.id);
	News.findByPk(id)
		.then(news => {
			if (news) {
				res.render('editnews', {
					title: 'Edit Berita',
					news: news
				});
			} else {
				// http 404 not found
				res.redirect('/');
			}

		})
		.catch(err => {
			res.redirect('/editnews');
		});

});
router.post('/editnews/:id', upload.array('image', 1), function (req, res, next) {
	const id = parseInt(req.params.id);
	let image = req.files[0].filename;
	let news = {
		judul: req.body.judul,
		author: req.body.author,
		artikel: req.body.artikel,
		image: image
	}
	News.update(news, {
		where: { id: id }
	})
		.then(num => {
			res.redirect('/');

		})
		.catch(err => {
			res.json({
				info: "Error",
				message: err.message
			});
		});

});

//comment
router.post('/comment', function(req, res, next) {
	let comment = {
		idnews: req.body.idnews,
		nama: req.body.nama,
		komentar: req.body.komentar
	}
	Comment.create(comment)
	.then(data => {
		res.redirect(`/newsdetail/${req.body.idnews}`);
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
	  });
	});
});



module.exports = router;
