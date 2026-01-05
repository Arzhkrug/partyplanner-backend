const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// 👉 POST /api/events (créer une soirée)
router.post("/", async (req, res) => {
  try {
    const { title, description, date, location, organizerName } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizerName,
      participants: [],
      loot: [],
    });

    const savedEvent = await newEvent.save();

    //envoyer sur Discord
    const message = {
      content: `🛡️ Nouvelle quête proposée !\n**Titre:** ${
        newEvent.title
      }\n**Organisateur:** ${newEvent.organizerName}\n**Lieu:** ${
        newEvent.location
      }\n**Date:** ${new Date(
        newEvent.date
      ).toLocaleString()}\n\n[Inscrivez-vous ici](https://tonsite.com/events/${
        newEvent.id
      })`,
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    res.status(201).json(savedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de créer la soirée" });
  }
});

// 👉 GET /api/events (lister toutes les soirées)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de récupérer les missions" });
  }
});

// 👉 GET /api/events/:id (récupérer une soirée spécifique)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Mission non trouvée" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de récupérer la mission" });
  }
});

// 👉 POST /api/events/:id/join (rejoindre une soirée)
router.post("/:id/join", async (req, res) => {
  try {
    const { pseudo, classe, niveau } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Soirée non trouvée" });

    // éviter les doublons
    if (!event.participants.some((p) => p.pseudo === pseudo)) {
      event.participants.push({ pseudo, classe, niveau });
      await event.save();
    }

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de rejoindre la mission" });
  }
});

// Ajouter un loot
router.post("/:id/loot", async (req, res) => {
  try {
    const { item } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Partie non trouvée" });

    event.loot.push(item);
    await event.save();

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible d'ajouter le butin" });
  }
});

// 👉 POST /api/events/:id/vote (voter pour une activité)
router.post("/:id/vote", async (req, res) => {
  try {
    const { activityName, voter } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Soirée non trouvée" });

    const activity = event.activities.find((a) => a.name === activityName);
    if (!activity)
      return res.status(404).json({ error: "Activité non trouvée" });

    // éviter les votes doublons
    if (!activity.votes.includes(voter)) {
      activity.votes.push(voter);
      await event.save();
    }

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de voter" });
  }
});

// 👉 DELETE /api/events/:id (supprimer une soirée)
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Soirée non trouvée" });
    res.json({ message: "Soirée supprimée ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de supprimer la soirée" });
  }
});

module.exports = router;
