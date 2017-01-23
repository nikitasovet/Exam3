var mongoose = require('mongoose');
var Hotel = mongoose.model('hotel');


module.exports.hotelGetAll = (req,res) => {
   console.log('Get the Hotel');


  Hotel
        .find()
        .exec(function(err,hotels){
          console.log(err);
          console.log(hotels);
          if(err){
            console.log("Error finding hotel");
            res
                .status(500)
                .json(err);
          } else {
            console.log("Found hotels", hotels.length);
            res
                .json(hotels);
          }
        });
};

module.exports.hotelGetOne = (req, res) => {
  var id = req.params.hotelId;
  console.log('Get hotelId', id);

  Hotel
        .findById(id)
        .exec(function(err,hotel){
          if(err){
            console.log("Error finding hotel");
            res
                .status(500)
                .json(err);
          } else if (!hotel) {
            console.log("HotelId not found in database", id);
            res
                .status(400)
                .json(err);
          }
          res
            .status(200)
            .json(hotel);
        });

};
var _splitArray = function(input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

module.exports.addOneComment = (req, res) => {
  var hotelID = req.params.hotelId;

  Hotel
    .findById(hotelID)
    .select('reviews')
    .exec((err, hotel) => {
      if(err) {
        console.log('Erreur hotel');
        res
        .status(500)
        .json(err);
      }
      else if(!hotel) {
        console.log('Hotel introuvable');
        res
        .status(404)
        .json({"message": "Hotel introuvable"});
      }
      else {

        hotel.reviews.push({
          name : req.body.name,
          rating : parseInt(req.body.rating, 10),
          review : req.body.commentaire
        });

        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(200)
              .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
          }
        });

      }
    });

};
