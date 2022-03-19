import { Request, Response} from "express";
import { compareSemanticVersions } from "./sort";
import * as fs from "fs";

function onRoot(req: Request, res: Response) {
    const resources = fs.readdirSync('./resources');
    let versions: string[] = [];
    resources.forEach(element => {
        element = element.replace(/\_/g, '.');
        element = element.replace(".json", "");
        versions.push(element);
    });
    versions = versions.sort(compareSemanticVersions).reverse();

    res.render("pages/index", { versions });
}

function onApiMods(req: Request, res: Response) {
    const version: string = req.params.version;
    version.replace('.', '_');
    const filePath: string = `./resources/${version.replace(/\./g, '_',)}.json`;

    if (!fs.existsSync(filePath)) {
        res.json({
            "error": true,
            "message": "Unable to find archive for version " + version,
            "data": null
        });
    }

    const file: string = fs.readFileSync(filePath, "utf-8");
    const json: object = JSON.parse(file);
    res.json({
        "error": false,
        "message": "Success",
        "data": json
    });
}

function onApiVersions(req: Request, res: Response) {
    const resources = fs.readdirSync('./resources');
    let versions: string[] = [];
    resources.forEach(element => {
        element = element.replace(/\_/g, '.');
        element = element.replace(".json", "");
        versions.push(element);
    });
    versions = versions.sort(compareSemanticVersions).reverse();
    res.json(versions);
}

export { onRoot, onApiMods, onApiVersions }