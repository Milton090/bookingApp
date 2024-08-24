import { getAll, create, update, remove } from '../controllers/customers';


const router = require('express').Router();


router.get("", getAll);

router.post("", create);

router.put("/:id", update);

router.delete("/:id", remove);


module.exports = router;
