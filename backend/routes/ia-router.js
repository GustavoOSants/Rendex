const express = require("express");
const { gerarDescricao} = require("../controllers/ia-controller");

const router = express.Router();

router.post("/gerar-descricao", gerarDescricao);

module.exports = router;