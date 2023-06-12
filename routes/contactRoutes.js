const express = require('express');
const router = express.Router();
const {getContact,postContact, getContactById, updateContactById,deleteContactById} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getContact).post(postContact);

router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById);


module.exports = router;