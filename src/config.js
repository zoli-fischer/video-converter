import 'dotenv/config';
import path from 'path';

const {
    DEFAULT_CRF = 24, MAX_WIDTH = 1920
} = process.env

const config = {
    path: {
        in: path.resolve(__dirname, '../in'),
        out: path.resolve(__dirname, '../out'),
        original: path.resolve(__dirname, '../original'),
        temp: path.resolve(__dirname, '../temp'),
    },
    video: {
        defaultCRF: DEFAULT_CRF,
        maxWidth: MAX_WIDTH,
    },
};

console.log('Congif: ', config);

export default config;
