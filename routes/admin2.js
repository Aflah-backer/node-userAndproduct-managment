var express = require("express");
const async = require("hbs/lib/async");
const { render, response, getMaxListeners } = require("../app");
const userHelpers = require("../helpers/user-helpers");
var router = express.Router();
var userHelper = require("../helpers/user-helpers");


router.get('/home', function (req, res, next) {
  userHelper.getAllUser().then((user) => {
    console.log(user);
    res.render('admin2/view-user', { admin2: true, user });
  });
});
router.get('/',(req,res)=>{
  res.render('admin2/admin-login',{admin2:true})
})

router.post('/adminlogin',(req,res)=>{
  // res.header('cache-control','no-cache,private,no-store,must-revalidate,max-stale=0,post,check=0,pre-check=0');
  const username= "aflahbacker2000@gmail.com"
  const passwordb ="0071"
  const{email,password}=req.body
  
 if(email===username && password===passwordb){
  res.redirect('/admin2/home')
 }else{
   res.redirect('/admin2')
 }


})

router.get("/add-user", function (req, res) {
  // res.header('cache-control','no-cache,private,no-store,must-revalidate,max-stale=0,post,check=0,pre-check=0');
  res.render("admin2/add-user");
});
router.post("/add-user", (req, res) => {
  // res.header('cache-control','no-cache,private,no-store,must-revalidate,max-stale=0,post,check=0,pre-check=0');
  res.redirect("/admin2/home");

  userHelpers.addUser(req.body, (id) => {
    console.log(id);
    if (id) {
      res.render("admin2/");
    } else {
      res.redirect("/admin2/add-user");
    }
  });
});

router.get("/delete-user/:id", (req, res) => {
  res.header('cache-control','no-cache,private,no-store,must-revalidate,max-stale=0,post,check=0,pre-check=0');
  let useId = req.params.id;
  console.log(useId);
  userHelper.deleteUser(useId).then((response) => {
    res.redirect("/admin2/home/");
  });
});

router.get("/edit-user/:id", async (req, res) => {
  console.log(req.body);
  let user = await userHelper.getuserDetails(req.params.id);
  console.log(user);
  res.render("admin2/edit-user", { user });
});
router.post("/edit-user/:id", (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  userHelper.updateUser(req.params.id, req.body).then(() => {
    res.redirect("/admin2/home");
  });
});

router.get("/", function (req, res, next) {
  userHelper.getAllUser().then((user) => {
    console.log(user);
    res.render("admin2/view-user", { admin2: true, user });
  });
});router.get('/home', function (req, res, next) {
  userHelper.getAllUser().then((user) => {
    console.log(user);
    res.render('admin2/view-user', { admin2: true, user });
  });
});
router.get('/',(req,res)=>{
  res.render('admin2/admin-login')
})



router.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/admin2')
})


module.exports = router;
