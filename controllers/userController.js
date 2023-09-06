const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single user by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user by id
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete user by id
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete(
                { _id: req.params.userId }
            );
            const deletedThoughts = await Thought.deleteMany(
                { username: deletedUser.username }
            );

            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(deletedUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // add friend to user's friend list
    async addFriend(req, res) {
        try {
             const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove friend from user's friend list
    async deleteFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};