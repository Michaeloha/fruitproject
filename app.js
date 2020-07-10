//jshint esversion6
// Tues 24/6/20 L-357 Introduction to Mongoose

const mongoose = require('mongoose');  //https://mongoosejs.com/ https://mongoosejs.com/docs/index.html
mongoose.connect('mongodb://localhost:27017/fruitsDB',{useNewUrlParser: true, useUnifiedTopology: true });


// insertDocuments
// thurs 25/6/20 l-359 Data Validation with Mongoose
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    // required: [true, "Please check data entry, no name specified"]
  },
  rating: {
  type: Number,
    min: 1,
    max: 10
},
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// this has no name and validation did not allow it to be added to our fruits
const fruit = new Fruit({

  rating: 10,
  review: "Peaches are yummy fruit!."
});

// fruit.save();



const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // L- 361: establishing Relationship with Embedding Documents using Mongoose
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// //  added new fruit for embedding
// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 9,
//   review: "Lovely fruit."
// })
//
// // pineapple.save();


// const person = new Person({
//   name:"Amy",
//   age: 20,
//   favouriteFruit: pineapple
// });
//
// // person.save();

// new fruit to be embedding to old person data.
const mango = new Fruit({
  name: "Mango",
  rating: 10,
  review: "Awesome fruit."
});

// mango.save();

// update old person with embedding data
Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfully updated document");
  }
});









//Find All Documents
Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  } else {

    // mongoose.connection.close();

    fruits.forEach(function(fruit){
        console.log(fruit.name);
    });

  }
});

// l-360 Update and Delete ( CRUD : CREATE: READ: UPDATE: DELETE)
            // UPDATE
// https://mongoosejs.com/docs/api/model.html#model_Model.updateOne
// // got the id from hyper( automatically generated)
// Fruit.updateOne({_id:"5ef4b4a1a90ec5c722bffca5"}, {name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Succesfully updated the document");
//   }
// });

// Delete
// https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne
// Fruit.deleteOne({name:"Peach"},function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Deleted Succesfully");
//   }
// });
//
// // Delete Many (i did the challenge)
// Person.deleteMany({name:"John"}, function(err){
// if(err){
//   console.log(err);
// } else {
//   console.log("Deleted Many");
// }
//
// });
