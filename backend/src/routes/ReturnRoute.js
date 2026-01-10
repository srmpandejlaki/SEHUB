import express from "express";
import ReturnController from "../controllers/ReturnController.js";

const routerReturn = express.Router();

// GET all returns
routerReturn.get("/", ReturnController.getAll);

// GET returns by distribution ID
routerReturn.get("/by-distribution/:id_distribusi", ReturnController.getByDistributionId);

// POST create new return
routerReturn.post("/", ReturnController.create);

// DELETE return
routerReturn.delete("/:id_return", ReturnController.delete);

export default routerReturn;
