import path from 'path';

const config = {
    path: {
        in: path.resolve(__dirname, '../in'),
        out: path.resolve(__dirname, '../out'),
        original: path.resolve(__dirname, '../original'),
        temp: path.resolve(__dirname, '../temp'),
    },
    video: {
        defaultCRF: 16,
        maxWidth: 1920,
    },
};

export default config;
