import * as url from "url";
import * as path from "path";
import * as getCaller from "caller";

import electron from "./electronAdapter";

export interface IPathObject {
    path: string;
    hash?: string;
    query?: string | any;
    search?: string;
}

const appDir: string = electron.app.getAppPath();

function getCallerDirName(): string {
    let localFuncPath = getCaller(1);
    let parentFuncPath = "";

    for (let parentFuncDepth = 2;
        localFuncPath === (parentFuncPath = getCaller(parentFuncDepth));
        parentFuncDepth++) { }

    return path.dirname(parentFuncPath);
}

export default function resolve(
    pathObject: string | IPathObject,
    fromAppDir: boolean = false): string {
    let urlObject: url.UrlObject = {
        protocol: "file:",
        slashes: true
    };

    if (typeof pathObject === "string") {
        urlObject.pathname = local(pathObject, fromAppDir);
    } else {
        urlObject.pathname = local(pathObject.path, fromAppDir);

        if (pathObject.hash) {
            urlObject.hash = pathObject.hash;
        }

        if (pathObject.query) {
            urlObject.query = pathObject.query;
        }

        if (pathObject.search) {
            urlObject.search = pathObject.search;
        }
    }

    return url.format(urlObject);
}

export function local(target: string, fromAppDir: boolean = false): string {
    return path.join(fromAppDir ? appDir : getCallerDirName(), target);
}
