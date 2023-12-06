import fs from "fs";
import path from "path";
import { execFile } from "child_process";

export function findExecutable(executableName, rootDirectory) {
    let executablePath = null;

    try {
        const files = fs.readdirSync(rootDirectory);

        for (const file of files) {
            const filePath = path.join(rootDirectory, file);
            if(!filePath.includes("obs")) continue;
            if(filePath.includes("bit")) return filePath;

            try {
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    const foundPath = findExecutable(executableName, filePath);
                    if (foundPath) {
                        executablePath = foundPath;
                        break;
                    }
                } else if (file === executableName) {
                    executablePath = filePath;
                    break;
                }
            } catch (err) {
                // Handle permission-related errors (EPERM) here
                console.error(`Error accessing ${filePath}:`, err.message);
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${rootDirectory}:`, err.message);
    }

    return executablePath;
}

