const express = require('express');
const routes = express.Router();
const multer = require('multer');

const uploadConfig = require('./config/uplaod');
const { SessionController, SpotController, ProfileController, BookingController, ApprovalController, RejectionController } = require('./controllers');

const uplaod = multer(uploadConfig);

routes.post('/user', SessionController.store);
routes.post('/spot', uplaod.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/profile', ProfileController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes;