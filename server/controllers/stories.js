import mongoose from "mongoose";
import Story from "../models/storyContent.js";

const getStories = async (req, res) => {
    const story = await Story.find();
    console.log(story);
    try {
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json( { message: error.message });
    }
}

const createStory = async (req, res) => {
    const body = req.body;
    const newStory = new Story({
        ...body
    });
    console.log(newStory);
    try {
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        console.log(error.message);
        res.status(409).json( { message: error.message });
    }
}

const updateStory = async (req, res) => {
    const { id: _id } = req.params;
    const story = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("this id does not belong to any story!");
    }
    const updatedStory = await Story.findByIdAndUpdate(_id, story, { new: true });
    res.json(updatedStory);
}

const deleteStory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("This id doesnt belong to any story");
    }

    await Story.findByIdAndDelete(id);

    res.json({ message: "Story deleted successfully" });
}

const likeStory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("This id doesnt belong to any story");
    }

    const story = await Story.findById(id);
    const updatedStory = await Story.findByIdAndUpdate(id, { likes: story.likes + 1}, { new: true });
    res.json(updatedStory);
}

export { getStories, createStory, updateStory, deleteStory, likeStory };
