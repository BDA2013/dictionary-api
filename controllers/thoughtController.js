const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // get all thoughts
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single thought by id
    async getSingleThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought (req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            if (dbThoughtData.userId === User.userId) {
                const dbUserData = await User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
            }
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update thought by id
    async updateThought (req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete thought by id
    async deleteThought (req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add reaction to thought
    async addReaction (req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete reaction from thought
    async deleteReaction (req, res) {
        try {
            const deletedReaction = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } }
            );
            if (!deletedReaction) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }
            res.json(deletedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};