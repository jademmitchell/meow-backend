const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Pet = require('./../models/Pet')
const path = require('path')

// GET- get all pets ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Pet.find().populate('user', '_id firstName lastName')
    .then(pets => {
      if(pets == null){
        return res.status(404).json({
          message: "No pets found"
        })
      }
      res.json(pets)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting pets"
      })
    })  
})

// POST - create new pet --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "Pet content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new pet
  let uploadPath = path.join(__dirname, '..', 'public', 'images', 'pets')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new pet
    let newPet = new Pet({
      type: req.body.type,
      gender: req.body.gender,
      age: req.body.age,
      name: req.body.name,
      breed: req.body.breed,
      price: req.body.price,
      about: req.body.about,
      image: uniqueFilename,
    })
  
    newPet.save()
    .then(pet => {        
      // success!  
      // return 201 status with pet object
      return res.status(201).json(pet)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem adding pet",
        error: err
      })
    })
  })
})

// export
module.exports = router