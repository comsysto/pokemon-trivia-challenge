import * as express from "express";
import { AddressInfo } from "net";
import * as path from "path";

(() => {
    const app = express();
    const dataFolder = path.join(__dirname, "../../..", "node_modules/api-data/data");
    app.use("/", express.static(dataFolder, { index: ["index.json"] }));
    const server = app.listen(7894, () => {
        const addressInfo = server.address() as AddressInfo;
        const host = addressInfo.address;
        const port = addressInfo.port;
        console.log(`🚀 PokeAPI Server running on http://${host === "::" ? "localhost" : host}:${port}/api/v2/`);
    });
})();
