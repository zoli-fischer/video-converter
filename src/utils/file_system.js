import fs from 'fs';

class FileSystem {
    getAllInFolder(dir) {
        let results = [];
    
        fs.readdirSync(dir).forEach((file) => {
    
            file = dir+'/'+file;
            const stat = fs.statSync(file);
    
            if (stat && stat.isDirectory()) {
                results = [...results, ...this.getAllInFolder(file)];
            } else {
                results.push(file);
            }
        });
    
        return results;
    }

    getVideosInFolder(dir) {
        const files = this.getAllInFolder(dir);
        return files.filter(path => this.isVideo(path));
    }
    
    isVideo(path) {
        return this.isMP4(path) || (
            this.getFileExtension(path) === 'avi' ||
            this.getFileExtension(path) === 'mkv' ||
            this.getFileExtension(path) === 'wmv' ||
            this.getFileExtension(path) === 'mov'
        );
    }

    isMP4(path) {
        return this.getFileExtension(path) === 'mp4';
    }

    getFileExtension(path) {
        const ext = /^.+\.([^.]+)$/.exec(path);
        return ext == null ? "" : ext[1];
    }
}

const fileSystem = new FileSystem();

export default fileSystem;
