const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.get('/getAll', taskController.getAll);
router.post('/newTask', taskController.newTask);
router.delete('/deleteTask/:id', taskController.deleteTask);
router.put('/updateTask/:id', taskController.updateTask);

module.exports = router;
