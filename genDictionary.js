/**
 * 生成notebook目录
 */
const os = require('os');
const fs = require('fs');
const path = require('path');
const util = require('util');

let data = `
# 学习笔记

_Good Gook Study, Day Day Up!_

## directory:

`;

const FsUtil = (function() {
    return {
        readDir: util.promisify(fs.readdir),
        fileState: util.promisify(fs.lstat),
        writeFile: util.promisify(fs.writeFile),
    };
})();

const travelDir = async function(dir, dirTree = null) {
    const files = await FsUtil.readDir(dir);

    for (let file of files) {
        if (file.startsWith('.') || file === 'assets') {
            continue;
        }
        const pathname = path.resolve(dir, file);
        const stats = await FsUtil.fileState(pathname);
        if (!stats.isDirectory()) {
            continue;
        }

        if (!dirTree) {
            dirTree = {};
        }
        dirTree[file] = await travelDir(pathname, dirTree[file]);
    }
    return dirTree;
};

const formatTree = function(tree, dir = '', dept = 0) {
    if (!tree || typeof tree !== 'object') {
        return [];
    }
    let lines = [];
    for (let [name, subTree] of Object.entries(tree)) {
        const relative = path.relative(__dirname, path.join(dir, name));
        lines.push(`${' '.repeat(dept * 2)}- [${name}](${relative})`);
        lines = [...lines, ...formatTree(subTree, relative, dept + 1)];
    }
    return lines;
};

travelDir(__dirname).then(dirTree => {
    return formatTree(dirTree);
}).then(strArr => {
    data += strArr.join('\n');
    if (os.type().toLowerCase().includes('windows')) {
        data = data.replace(/\\/g, '/');
    }

    return FsUtil.writeFile(path.resolve('./README.md'), data);
}).then(() => {
    console.log('write file successfully');
}).catch(err => {
    console.log(`write file error: ${err}`);
});
