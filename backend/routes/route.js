const express=require('express')
const router=express.Router();
const controller=require('../controllers/controller')
const invoice=require('../controllers/invoice')
const admin=require('../controllers/admin')
router.route('/').get(controller.home);
router.route('/user').get(controller.user);
router.route('/signup').post(controller.signup);
router.route('/login').post(controller.login);
router.route('/customerlogin').post(controller.customerlogin);
router.route('/getcustomerlogin').post(controller.getcustomerlogin)
router.route('/CustomerPanel/:id').get(controller.CustomerPanel)
router.route('/getuser/:id').get(controller.Getuser)
router.route('/getairports').get(controller.getairports)
router.route('/BookTicket').post(controller.BookTicket)
router.route('/SearchFlights').get(controller.SearchFlights)

router.route('/AvailableFlights').post(controller.AvailableFlights);
router.route('/UpdateFlightBooking').post(invoice.UpdateFlightBooking);
router.route('/invoice/:id').get(invoice.getuserinfo);
router.route('/invoicefares').get(invoice.invoicefares);
router.route('/invoiceconfirm').post(invoice.invoiceconfirm);

router.route('/invoiceconfirmAgain').post(invoice.invoiceconfirmAgain);
router.route('/removesearch').delete(invoice.removesearch);
router.route('/showPass/:id').get(invoice.showPass);

router.route('/getstats').get(admin.getstats);
router.route('/get').get(admin.get);

router.route('/get/:id').get(admin.getwithid);
router.route('/updateuser/:id').put(admin.updateuser);

router.route('/post').post(admin.post);
router.route('/remove/:id').delete(admin.remove);

router.route('/airplaneget').get(admin.airplaneget);
router.route('/airplanegetbyid/:id').get(admin.airplanegetbyid);
router.route('/sendairplanedata').post(admin.sendairplanedata);
router.route('/airplanegetdata/:id').put(admin.airplanegetdata);
router.route('/viewairplane/:id').get(admin.viewairplane);
router.route('/getairports').get(admin.getairports);
module.exports=router
