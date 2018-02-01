const express = require('express');
const router = express.Router();
const endorsementController = require('../controller/endorsementController');
const auth = require('../middleware/jwtMiddleware');

router.get('/', endorsementController.getEndorsedInvestigations);

router.post('/:id', auth, endorsementController.doEndorsement);

router.delete('/:id', auth, endorsementController.revokeEndorsement);

module.exports = router;
