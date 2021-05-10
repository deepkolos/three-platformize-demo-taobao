import sucrase from '@rollup/plugin-sucrase';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
// import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: './pages/index/index.ts',
    treeshake: true,
    output: {
      format: 'esm',
      // file: './pages/index/index.js',
      dir: './pages/',
      chunkFileNames: 'chunks/[name].js',
      entryFileNames: 'pages/[name]/[name].js',
      manualChunks: {
        'three-platformize': ['three-platformize'],
      }
    },
    plugins: [
      resolve({ extensions: ['.ts', '.js'] }),
      // esbuild({
      //   sourceMap: false,
      //   minify: false,
      //   target: 'es2018',
      //   legalComments: 'none',
      // }),
      // terser({ output: { comments: false } }),
      sucrase({ transforms: ['typescript'] })
    ]
  }
]