import express from "express";
import isDocker from "is-docker";
import * as path from "path";

(() => {
    const serverPort = 7894;

    const dataFolder = path.join(__dirname, isDocker() ? ".." : "../../..", "node_modules/api-data/data");
    const server = express();

    server.use("/", express.static(dataFolder, { index: ["index.json"] })).listen(serverPort, () => {
        console.log(`🚀 PokeAPI Server running on http://localhost:${serverPort}`);
    });
})();
