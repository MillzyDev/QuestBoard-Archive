import express from "express";
import { Application } from "express";
import { onRoot, onApiMods, onApiVersions } from "./subdirectories";

const app: Application = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", onRoot);
app.get("/api/mods/:version", onApiMods);
app.get("/api/versions", onApiVersions);

app.listen("0.0.0.0:81", () => {
    console.log("Archive is now listening on port 80!");
});