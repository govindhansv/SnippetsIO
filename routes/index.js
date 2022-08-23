var express = require('express');
var router = express.Router();
var db = require('../connection')
var fun = require('../functions')
var ObjectId = require('mongodb').ObjectId
const copy = require('clipboard-copy')


/* GET home page. */

router.get('/docs', async function (req, res) {
    res.render('pages/docs');
});

// router.get('/', async function (req, res) {
//   req.session.url = req.route.path
//   let data = await db.get().collection('data').find({ "item": "courses" }).toArray()
//   if (req.session.admin === true) {
//     res.render('courses', { data, admin: true });
//   } else {
//     res.render('courses', { data });
//   }
// });

router.get('/', async function (req, res) {
  let data = await db.get().collection('data').find().toArray()
  res.render('pages/home',{data});
});

router.get('/admin', async function (req, res) {
  let data = await db.get().collection('data').find().toArray()
  res.render('pages/admin',{data});
});

router.get("/about", (req, res) => {
  res.render("pages/about")
});







router.get('/addpost', async function (req, res) {
  res.render('forms/addpost');
});

router.post('/addpost', async function (req, res) {
  let data = req.body
  await db.get().collection('data').insertOne(data)
  res.render('pages/snippet',{data})
});

router.get('/editpost/:id', async function (req, res) {
  let id = req.params.id
  let data = await db.get().collection('data').findOne({ _id: ObjectId(id) })
  res.render('forms/editpost',{data});
});

router.post('/editpost', async function (req, res) {
  let newdata = req.body
  let query = { _id: ObjectId(req.body.id) }
  var newvalues = { $set: { name: newdata.name , desc:newdata.desc, backend:newdata.backend, frontend:newdata.frontend , schema:newdata.schema , linking:newdata.linking}};
  await db.get().collection('data').updateOne(query, newvalues)
  res.redirect(`/snippet/${req.body.id}`)
});

router.get('/deletepost/:id', async function (req, res) {
  let id = req.params.id
  await db.get().collection('data').deleteOne({ _id: ObjectId(id) })
  res.redirect('back')
});

router.get('/snippet/:id', async function (req, res) {
  let id = req.params.id
  let data = await db.get().collection('data').findOne({ _id: ObjectId(id) })
  res.render('pages/snippet',{data});
});





router.get('/addcode', async function (req, res) {
  res.render('forms/addcode');
});

router.post('/addcode', async function (req, res) {
  let data = req.body
  await db.get().collection('data').insertOne(data)
  res.render('pages/snippet',{data})
});

router.get('/editcode/:id', async function (req, res) {
  let id = req.params.id
  let data = await db.get().collection('data').findOne({ _id: ObjectId(id) })
  res.render('forms/editcode',{data});
});

router.post('/editcode', async function (req, res) {
  let newdata = req.body
  let query = { _id: ObjectId(req.body.id) }
  var newvalues = { $set: { name: newdata.name , desc:newdata.desc, backend:newdata.backend, frontend:newdata.frontend , schema:newdata.schema , linking:newdata.linking}};
  await db.get().collection('data').updateOne(query, newvalues)
  res.redirect(`/code/${req.body.id}`)
});

router.get('/deletecode/:id', async function (req, res) {
  let id = req.params.id
  await db.get().collection('data').deleteOne({ _id: ObjectId(id) })
  res.redirect('back')
});

router.get('/code/:id', async function (req, res) {
  let id = req.params.id
  let data = await db.get().collection('data').findOne({ _id: ObjectId(id) })
  res.render('pages/code',{data});
});








// router.get('/deletelist/:id', async function (req, res) {
//   let id = req.params.id
//   db.get().collection('list').deleteOne({ id: ObjectId(id), userid: req.session.user })
//   res.redirect('back')
// });

// router.get('/delete/:id', async function (req, res) {
//   let id = req.params.id
//   db.get().collection('data').deleteOne({ _id: ObjectId(id) })
//   res.redirect('back')
// });

// router.get('/edit/:id', async function (req, res) {
//   let id = req.params.id
//   let data = await db.get().collection('data').findOne({ _id: ObjectId(id) })
//   res.render('edit', { data })
// });

// router.post('/edit', async function (req, res) {
//   let newdata = req.body.name
//   let query = { _id: ObjectId(req.body.id) }
//   var newvalues = { $set: { name: newdata } };
//   db.get().collection('data').updateOne(query, newvalues)
//   res.redirect(req.session.url)
// });


// router.get('/login', function (req, res) {
//   if (req.session.loggedIN) {
//     res.redirect('/users/')
//   }
//   if (req.session.loggedfalse) {
//     res.render('login', { err: true });
//   } else {
//     res.render('login');
//   }
// });

// router.get('/signup', (req, res) => {
//   if (req.session.signupstatusfalse) {
//     res.render('signup', { err: true })
//   } else
//     res.render('signup')
// })

// router.post('/signup', (req, res) => {
//   fun.doSignup(req.body).then((response) => {
//     if (response.signupstatus) {
//       session = req.session;
//       session.user = response.insertedId
//       session.loggedfalse = false
//       session.loggedIN = true
//       res.redirect(req.session.url)
//     } else {
//       req.session.signupstatusfalse = true
//       res.redirect('/signup/')
//     }
//   })
// })


// router.post('/login', (req, res) => {
//   fun.doLogin(req.body).then((response) => {
//     if (response.status) {
//       req.session.user = String(response.user._id)
//       req.session.loggedfalse = false
//       req.session.loggedIN = true
//       res.redirect(req.session.url)
//     } else {
//       req.session.loggedfalse = true
//       res.redirect('/login');
//     }
//   })
// })


// router.get('/logout', function (req, res) {
//   req.session.destroy()
//   res.redirect('/');
// });

// router.get('/myprofile', async function (req, res) {
//   req.session.url = '/myprofile'
//   let user = await db.get().collection('users').findOne({ _id: ObjectId(req.session.user) })
//   let uploads = await db.get().collection('uploads').find({ "user": req.session.user }).toArray()
//   if (user) {
//     res.render('myprofile', { user, uploads })
//   } else {
//     res.redirect('/login')
//   }
// });

module.exports = router;
