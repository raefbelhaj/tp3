const express = require('express');
const router = express.Router();
const Annonce = require('../models/annonce'); 

// add
router.post('/', async (req, res) => {
    try {
        const nouvelleAnnonce = new Annonce(req.body);
        const savedAnnonce = await nouvelleAnnonce.save();
        res.status(201).json(savedAnnonce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// get all
router.get('/', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get by id
router.get('/:id', async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id);
        if (!annonce) {
            return res.status(404).json({ message: "Annonce introuvable" });
        }
        res.json(annonce);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update
router.put('/:id', async (req, res) => {
    try {
        const updatedAnnonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnnonce) {
            return res.status(404).json({ message: "Annonce introuvable" });
        }
        res.json(updatedAnnonce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedAnnonce = await Annonce.findByIdAndDelete(req.params.id);
        if (!deletedAnnonce) {
            return res.status(404).json({ message: "Annonce introuvable" });
        }
        res.json({ message: "Annonce supprimée" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
