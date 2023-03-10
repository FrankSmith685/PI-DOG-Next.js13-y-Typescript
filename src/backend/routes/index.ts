const { Router } = require('express');
import dogs from "./routerDogs";

export const router = Router();

// Configurar los routers
router.use("/dogs",dogs);
