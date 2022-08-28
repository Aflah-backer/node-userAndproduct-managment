var express = require("express");
const { route } = require("express/lib/application");
const res = require("express/lib/response");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
var router = express.Router();
const userHelpers = require("../helpers/user-helpers");

/* GET home page. */
  router.get("/", function (req, res, next) {
    let user = req.session.user;
  let products = [
    {
      name: "Microsoft Surface Laptop ",
      category: "Touchscreen Laptop",
      description: "",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqsU6ectayRmp7_dVM0JhPCn5aJwlEPgGcuA&usqp=CAU",
    },
    {
      name: "Mac",
      category: "Laptop",
      description: "",
      image:
        "https://icdn.digitaltrends.com/image/digitaltrends/macbook-pro-2021-16.jpg",
    },
    {
      name: "Asus ROG Strix G15 Advantage Edition",
      category: "Gaming Latop",
      description: "",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qO0wtFTdZRoMNg_44wuc6XshFAA3OWR03A&usqp=CAU",
    },
    {
      name: "Asus ZenBook 13 OLED UM325U",
      category: "design ultraportable laptop ",
      description: "",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3AMfjY6SVG2mF1twCBy225-u7DiXF5S-paA&usqp=CAU",
    },
    {
      name: "Microsoft Surface Laptop Studio",
      category: "NotebookCheck",
      description: "",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjArMAdplFTmPKfVIRqe1CK6NnjL3VV5FEyQ&usqp=CAU",
    },
    {
      name: "Microsoft Surface Pro X ",
      category: "Laptop",
      description: "",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-AHECbJswxl6mj9Nf_7zb39RXOO5XdIvCA&usqp=CAU",
    },
    {
      name: "Apple iPad Pro ",
      category: "iPad",
      description: "",
      image:
        "https://images.hindustantimes.com/tech/img/2021/09/14/960x540/WhatsApp_Image_2021-09-14_at_5.13.31_PM_1631623490905_1631623503195.jpeg",
    },
    {
      name: "Lenovo Yoga 9i",
      category: "Gaming Laptop",
      description: "",
      image:
        "https://www.cnet.com/a/img/resize/aa457a450e5846a91c4673a3f76f6d72b0198d1e/2020/12/01/32d62315-9dd2-40c7-b9dc-855c25a9898d/lenovo-yoga-9i-15-2020-02.jpg?auto=webp&fit=crop&height=675&width=1200",
    },
    {
      name: "GeForce RTX 30-Series Laptops",
      category: "Gaming Laptop",
      description: "",
      image:
        "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ces/gaming-laptops/geforce-rtx-30-series-laptops-shop-630-d.png",
    },
    {
      name: "Dell XPS 13 Laptop",
      category: "Laptop ",
      description: "",
      image:
        "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9310/general/xps-13_black_open-up-left-v2.jpg?fmt=pjpg&pscan=auto&scl=1&wid=3334&hei=2017&qlt=100,0&resMode=sharp2&size=3334,2017",
    },
    {
      name: "ASUS ZenBook Pro Duo UX581",
      category: "design laptop ",
      description: "",
      image:
        "https://www.artlex.com/wp-content/uploads/2022/01/ASUS-ZenBook-Pro-Duo-UX581-Laptop-1024x767.jpg",
    },
    {
      name: "ASUS' Zenbook 17 Fold OLED Laptop",
      category: "Foldable Display Laptop",
      description: "",
      image:
        "https://www.espldaily.com/wp-content/uploads/2022/01/asus-zenbook-17-fold-oled-laptop-boasts-a-full-length-foldable-display.jpg",
    },
  ];
  res.render("user/index", { products, user, userFlag: true });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("user/login", { loginErr: req.session.loginErr });
    req.session.loginErr = false;
  }
});
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    req.session.user = response;
    req.session.user.loggedIn = true;
    res.redirect("/login");
  });
});
router.post("/login", (req, res) => {
   res.header('cache-control','no-cache,private,no-store,must-revalidate,max-stale=0,post,check=0,pre-check=0');
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = response.user;
      req.session.user.loggedIn = true;
      res.redirect("/");
    } else {
      req.session.loginErr = "Invalid username or password";
      res.redirect("/login");
    }
  });
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});
router.get("/cart", (req, res) => {
  res.render("user/cart");
});

module.exports = router;
