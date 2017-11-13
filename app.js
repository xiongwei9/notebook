const os = require('os');
const fs = require('fs');
const path = require('path');

let data = `
# 学习笔记

_Good Gook Study, Day Day Up!_

## directory:

`;

travelSync(__dirname);

// console.log(path.relative(__dirname, './Back-End/nginx/0.intro.md'));

if (os.type().toLowerCase().includes('windows')) {
    data = data.replace(/\\/g, '/');
}
fs.writeFileSync(path.resolve('./README.md'), data);

/* 同步遍历 */
function travelSync(dir, step = 0, deal = write) {
    let files = [];

    for (let file of fs.readdirSync(dir)) {
        if (file.startsWith('.') || file === 'assets') {
            continue;
        }

        const pathname = path.resolve(dir, file);
        if (fs.lstatSync(pathname).isDirectory()) {
            deal(file, step);
            travelSync(pathname, step + 1);
        } else {
            files.push(file);
        }
    }

    for (let file of files) {
        deal(file, step, dir);
    }
}

function write(name, step, dir) {
    if (dir) {
        const relative = path.relative(__dirname, path.join(dir, name));
        data += `${' '.repeat(step * 2)}- [${name}](${relative})\n`;
    } else {
        data += `${' '.repeat(step * 2)}- ${name}\n`;
    }

}