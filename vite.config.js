import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';

const r = (path) => resolve(__dirname, path);

const srcRoot = r('src');
export default () => {
  return {
    root: srcRoot,
    base: '',
    plugins: [reactRefresh(), macrosPlugin()],
    build: {
      outDir: r('out/'),
      emptyOutDir: true,
      rollupOptions: {},
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
    },
    define: {
      'process.platform': JSON.stringify('win32'),
      'process.env': {
      },
    },
  };
};
