const Flight = require('../models/flight')

module.exports = {
    index,
    new: newFlight, 
    create,
}

function index(req, res){
    Flight.find({}, function(err, flights){
        res.render('flights/index', {
            flights,
            title: 'ALL FLIGHTS'
        })
    })
}

function newFlight(req, res){
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate, title: 'ADD FLIGHT' });
}

function create(req, res){
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    const flight = new Flight(req.body)


    flight.save(function(err){
        if(err) {
            console.log(err.message, req.body.departs, 'depart req.body')
            return res.redirect('/flights/new')
        }
        res.redirect('/flights')
    })
}