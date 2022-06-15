const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String, 
    required: true   
  },
  breed: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  about: {
    type: String,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
  image: {
    type: String,
    required: true    
  },
  age: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
  
}, { timestamps: true })


// model
const petModel = mongoose.model('Pet', petSchema)

// export
module.exports = petModel