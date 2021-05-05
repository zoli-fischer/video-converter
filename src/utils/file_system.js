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
        return this.isMP4(path) || /^(avi|mkv|wmv|mov|vob)$/i.test(this.getFileExtension(path));
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
