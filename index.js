import chokidar from 'chokidar';
import converter from './src/utils/converter';

converter.start();

// let currentVideo = null;

// setInterval(() => {
//     const videos = converter.getVideoPaths();
//     if (!currentVideo) {
//         if (videos.length > 0) {
//             currentVideo = videos[0];
//             console.log(`Starting ${currentVideo}`);
//         }
//     }
// }, 1000);

// One-liner for current directory
chokidar.watch('./in').on('all', (event, path) => {
    switch (event) {
        case 'add':
            converter.updateVideos();
            break;
    }
});
