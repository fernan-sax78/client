export function imageExpoFormat(uri) {
    let fileName = uri.split("/").pop();

    let match = /\.(\w+)$/.exec(fileName);
    let type = match ? `image/${match[1]}` : "image";

    return { uri , name : fileName, type}
}