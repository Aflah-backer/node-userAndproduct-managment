$(document).ready(function(){
    $("#login-one","signup").validate({
        rules:{
            email:{
                required:true,
                email:true
            },
            password:{
                required:true,
                minlength:4

            }
        }
    })
})
// $(document).ready(function(){
//     $('#signup-form').validate({
//         rules:{
//             userName:{
//                 required:true,
//                 minlength:3
//             },
//             email:{
//                 required:true,
//                 email:true
//             },
//             password:{
//                 required:true,
//                 minlength:4
//             }

//         }
//     })
// }),
// $(document).ready(function(){
//     $('#admin-login').validate({
//         rules:{
//             required:true,
//             email:email
//         },
//         password:{
//             required:true,
//             minlength:4
//         }
//     })
// })