

export default function normalizedRoutes(path){
    let normalized = path.trim().toLowerCase();
    //    remove multiple slashes
    normalized = normalized.replace(/\/{2,}/g, "/");

    // remove trailing slash unless it's root
    if (normalized.length > 1 && normalized.endsWith("/")) {
        normalized = normalized.slice(0, -1);
    }
    return normalized;
}