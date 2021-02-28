import config from '../config';
import { execute } from './execute';
import fileSystem from './file_system';
import fsExtra from 'fs-extra';
import fs from 'fs';
import nodePath from 'path';

class Converter {
    videos = [];
    processedVideoPath = null;

    start() {
        this.updateVideos();
    }

    updateVideos() {
        this.videos = this.getVideoPaths();
        this.processNext();
    }

    processNext() {
        if (!this.processedVideoPath) {
            if (this.videos.length > 0) {
                this.processedVideoPath = this.videos[0];
                console.log(`Starting ${this.processedVideoPath}`);
                this.convert(this.processedVideoPath, true)
                    .then(() => {
                        console.log(`Done ${this.processedVideoPath}`);
                    })
                    .catch((error) => {
                        console.error(`Error ${this.processedVideoPath} ${error}`);
                    }).finally(() => {
                        this.processedVideoPath = null;
                        this.updateVideos();
                    });
            }
        }
    }

    async convert(path, convertMP4 = false, qualityCRF = config.video.defaultCRF, maxWidth = config.video.maxWidth) {
        let outFile = path.replace(config.path.in, config.path.out);
        let tempFile = path.replace(config.path.in, config.path.temp);
        const originalFile = path.replace(config.path.in, config.path.original);
        const isMP4 = fileSystem.isMP4(path);

        fsExtra.ensureDir(nodePath.dirname(originalFile));
        fsExtra.moveSync(path, originalFile, { overwrite: true });

        if (!isMP4 || (isMP4 && convertMP4)) {
            outFile = isMP4 ? outFile : outFile+'.mp4';
            tempFile = isMP4 ? tempFile : tempFile+'.mp4';
            fsExtra.ensureDir(nodePath.dirname(outFile));
            fsExtra.ensureDir(nodePath.dirname(tempFile));
            const cmd = `ffmpeg -i "${originalFile}" -c:v h264 -c:a aac -crf ${qualityCRF} -vf "scale='min(${maxWidth},iw)':-2" "${tempFile}"`;
            console.log(cmd);
            await execute(cmd);

            const { size: tempSize } = fs.statSync(tempFile);
            const { size: originalSize } = fs.statSync(originalFile);

            if (tempSize <= originalSize) {
                fsExtra.moveSync(tempFile, outFile, { overwrite: true });
            } else {
                fsExtra.copySync(originalFile, outFile, { overwrite: true });
                fsExtra.removeSync(tempFile);
            }
        } else if (isMP4) {
            fsExtra.ensureDir(nodePath.dirname(outFile));
            fsExtra.copySync(originalFile, outFile, { overwrite: true });
        }
    }

    getVideoPaths() {
        return fileSystem.getVideosInFolder(config.path.in);
    }    
}

const converter = new Converter();

export default converter;
