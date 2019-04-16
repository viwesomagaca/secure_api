 const storage = require('./model/item');

 const getItems = (req, res)=>{
   storage.find()
  .then(data =>{
      console.log("data",data);
      return res.status(200).json({ sucess: true, items: data})
  }).catch(err =>{
      return res.status(400).json({ sucess: false, error:err})
  })
 }

 module.exports ={
     getItems,
    
 }