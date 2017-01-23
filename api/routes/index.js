var express = require('express');
var router = express.Router();

var ctrlHotel = require('../controllers/hotel.controllers.js');

// route pour hotel
router
    .route('/hotel')
    .get(ctrlHotel.hotelGetAll);

router
  .route('/hotel/:hotelId')
  .get(ctrlHotel.hotelGetOne)
  .post(ctrlHotel.addOneComment);


module.exports = router;
