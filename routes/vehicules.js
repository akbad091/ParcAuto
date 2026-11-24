import express from "express";

const router = express.Router();

// Tablaux de véhicules
let vehicules = [
  { id: 1, marque: "Dacia", modele: "Logan", immatriculation: "12345-A-6", disponible: true },
  { id: 2, marque: "Renault", modele: "Clio", immatriculation: "67890-B-6", disponible: false },
  { id: 3, marque: "Peugeot", modele: "208", immatriculation: "24680-D-1", disponible: true }
];

// GET liste des véhicules disponibles
router.get("/", (req, res) => {
    const { disponible } = req.query;

    let result = vehicules;

    if (disponible === "true") {
        result = vehicules.filter(vehicule => vehicule.disponible === true);
    } else if (disponible === "false") {
        result = vehicules.filter(vehicule => vehicule.disponible === false);
    }

    res.status(200).json(result);
});

// GET un véhicule par ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const vehicule = vehicules.find(v => v.id === id);

    if (!vehicule) {
        return res.status(404).json({ message: "Véhicule non trouvé" });
    }

    res.status(200).json(vehicule);
});

// POST ajouter un nouveau véhicule
router.post("/", (req, res) => {
    const { marque, modele, immatriculation } = req.body;

    if (!marque || !modele || !immatriculation) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    if (vehicules.some(v => v.immatriculation === immatriculation)) {
        return res.status(400).json({ message: "Immatriculation déjà utilisée" });
    }

    const newVehicule = {
        id: vehicules.length + 1,
        marque,
        modele,
        immatriculation,
        disponible: true
    };

    vehicules.push(newVehicule);
    res.status(201).json(newVehicule);
});

// PATCH mettre à jour un véhicule
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const vehicule = vehicules.find(v => v.id === id);

    if (!vehicule) {
        return res.status(404).json({ message: "Véhicule non trouvé" });
    }

    const { marque, modele, immatriculation, disponible } = req.body;

    if (marque !== undefined) vehicule.marque = marque;
    if (modele !== undefined) vehicule.modele = modele;
    if (immatriculation !== undefined) vehicule.immatriculation = immatriculation;
    if (disponible !== undefined) vehicule.disponible = disponible;

    res.status(200).json(vehicule);
});

// DELETE supprimer un véhicule
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = vehicules.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Véhicule non trouvé" });
    }

    vehicules.splice(index, 1);
    res.status(204).json({ message: "Véhicule supprimé" });
});

export default router;