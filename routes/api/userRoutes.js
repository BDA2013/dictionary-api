const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route ('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

// PUT to update a user by its _id
router.route('/:userId').put(updateUser);

// DELETE to remove user by its _id
router.route('/:userId').delete(deleteUser);

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend);

// DELETE to remove a friend from a user's friend list
router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;



