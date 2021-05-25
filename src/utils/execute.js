import { exec } from 'child_process';

export const execute = cmd => new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            reject(err);
        } else {
            resolve({ stdout, stderr });
        }
    });
});

export const delay = ms => new Promise(res => setTimeout(res, ms));