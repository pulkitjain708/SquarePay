const express=require('express')
const router=express.Router()
const cont=require("./controllers")

router.get("/sq/requests",cont.renderRequests)
router.get("/",cont.getRoot)
router.get("/sq",cont.authenticatesqAdmin,cont.getsq)
router.get("/about",cont.getAbout)
router.get("/accounts/forgotPassword",cont.getForgotPassword)
router.get("/dashboard/prev-orders",cont.getOrders)
router.get("/logout",cont.logout)
router.get("/contact",cont.getContact)
router.get("/dashboard/FAQ's",cont.faqs)
router.get("/admin",cont.authenticateAdmin,cont.getAdmin)
router.get("/signIn",cont.getSignIn)
router.get("/sq/chats",cont.getChat)
router.get("/signUp",cont.getSignUp)
router.post("/addUser",cont.postAddUser)
router.post("/requestrefund",cont.reqref)
router.post("/sendFAQ",cont.FAQ)
router.post("/checkSignIn",cont.postCheckSignIn)
router.post("/updatePic",cont.updateAvatar)
router.post("/changePassword",cont.passwordUpdate)
router.post("/OTP",cont.otp)
router.post("/otppass",cont.passwordUpdate)
router.get("/dashboard",cont.authenticate,cont.getDashboard)
router.get("/dashboard/settings",cont.getSettings)
router.get("*",cont.err404)
router.post("/fetchall",cont.fetchall)
router.post("/deleteUser",cont.deleteUser)
router.post("/updateUser",cont.updateUser)
router.post("/getCard",cont.getCard)
router.post("/submitAnswer",cont.submitAnswer)
router.post("/addItem",cont.addMenu)
router.post("/updateItem",cont.updateItem)
router.post("/successPayment",cont.payment)
router.post("/updateAvail",cont.updateAvail)
router.post("/sendOrder",cont.sendOrder)
router.post("/fetch_chats",cont.postChats)
router.post("/getItems",cont.getItems)

module.exports=router