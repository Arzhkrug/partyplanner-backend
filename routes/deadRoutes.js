const express = require("express");
const router = express.Router();
const Dead = require("../models/Dead");

// 👉 GET /api/dead (liste des morts)
router.get("/", async (req, res) => {
  try {
    const morts = await Dead.find().sort({ dateMort: -1 }); // derniers morts en premier
    res.json(morts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de récupérer les âmes perdues" });
  }
});

// 👉 POST /api/dead (ajouter un mort)
router.post("/", async (req, res) => {
  try {
    const { pseudo, classe, niveau } = req.body;

    if (!pseudo || !classe || !niveau) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const newDead = new Dead({ pseudo, classe, niveau });
    const saved = await newDead.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible d'ajouter une âme perdue" });
  }
});

module.exports = router;
