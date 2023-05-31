const mongoose = require('mongoose');

const crop = mongoose.Schema({
   image: {
    type: String,
   },
   name: {
    type: String,
   }, 
   grade: {
    type: Array,
   }, 
   variaty: {
    type: Array,
   }, 
   moisture: {
    type: String, 
   }, 
   extraneous: {
    type: String
   }, 
   foreign: {
    type: String
   }
})

module.exports = mongoose.model('Crope', crop)