const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");
//@desc Get All Contacts
//@route GET /api/contacts
//@access private


const getContact = asyncHandler( async (req,res)=>{
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

//@desc Create Contacts
//@route POST /api/contacts
//@access private


const postContact = asyncHandler( async (req,res)=>{
  console.log(req.body);
  const {name, email, phone} = req.body;
  if(!name || !email || !phone){res.status(400);
  throw new Error('All fields are required')}
  const contact = await Contact.create({user_id:req.user.id,name, email, phone});
  res.status(201).json(contact);
});

//@desc Update Contacts by id
//@route PUT /api/contacts/:id
//@access private

const updateContactById =asyncHandler(async (req,res)=>{
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("Not authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.status(200).json(updatedContact);
});

//@desc Get All Contacts by id
//@route GET /api/contacts/:id
//@access private

const getContactById = asyncHandler(async (req,res)=>{
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Delete Contacts by id
//@route DELETE /api/contacts/:id
//@access private

const deleteContactById =asyncHandler( async (req,res)=>{
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("Not authorized");
  }
  await Contact.deleteOne(contact);
  res.status(200).json(contact);
});




module.exports = {getContact, postContact , getContactById, updateContactById, deleteContactById};