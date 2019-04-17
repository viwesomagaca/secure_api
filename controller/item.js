 const storage = require('../model/item');

 const getItems = (req, res) => {
     storage.find()
         .then(data => {
             console.log("data", data);
             return res.status(200).json({
                 success: true,
                 items: data,
                 user : req.user,
                token : req.query.secret_token
             })
         }).catch(err => {
             return res.status(400).json({
                 success: false,
                 error: err
             })
         })
 };

 const addItems = (req, res) => {
     const Item = new storage();
     Item.itemname = req.body.itemname
     Item.description = req.body.description

     Item.save(err => {
         res.status(200).json({
             success: true
         })
     })
 };

 const getItemById = (req, res) => {
  const {id} = req.params;
     storage.findOne({_id: id
         })
         .then(data => {
             res.status(200).json({
                 success: true,
                 items: data,
                 user : req.user,
                token : req.query.secret_token
             })
         }).catch(err => {
             res.status(400).json({
                 success: false,
                 error: err
             });
         })
 }

 const updateItem = (req,res)=>{
    const {id} = req.params;
    const {itemname, description} = req.body;
    storage.findByIdAndUpdate(id, {itemname, description})
    .then(data =>{
        return res.status(200).json({ success: true});
    }).catch(err =>{
        return res.status(400).json({ success: false});
    })
 };

 const deleteItem = (req,res)=>{
    const {id}= req.params;
    storage.findByIdAndDelete({_id:id})
    .then(then =>{
        return res.status(200).json({success:true});
    })
 }

 module.exports = {
     getItems,
     addItems,
     getItemById,
     updateItem,
     deleteItem

 }