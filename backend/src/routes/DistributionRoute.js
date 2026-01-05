import express from "express";
import DistributionController from "../controllers/DistributionController.js";

const routerDistribution = express.Router();

routerDistribution.get("/", DistributionController.getAll);
routerDistribution.post("/", DistributionController.create);
routerDistribution.put("/:id_distribusi", DistributionController.update);
routerDistribution.patch("/:id_distribusi/status", DistributionController.updateStatus);
routerDistribution.delete("/:id_distribusi", DistributionController.delete);

export default routerDistribution;
