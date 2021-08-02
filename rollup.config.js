import sucrase from '@rollup/plugin-sucrase';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
// import esbuild from 'rollup-plugin-esbuild';
import * as fastGlob from 'fast-glob';

export default [
  {
    input: './pages/index/index.ts',
    treeshake: true,
    output: {
      format: 'esm',
      // file: './pages/index/index.js',
      dir: './pages/',
      chunkFileNames: 'chunks/[name].js',
      entryFileNames: '[name]/[name].js',
      manualChunks: {
        'three-platformize': [
          'three-platformize',
          ...fastGlob.sync('node_modules/three-platformize/examples/jsm/**/*.js'),
          // ...fastGlob.sync('node_modules/three-platformize/src/libs/**/*.js'),
          // ...fastGlob.sync('node_modules/three-platformize/src/TaobaoPlatform/**/*.js'),
          // ...fastGlob.sync('node_modules/three-platformize-demo/src/**/*.ts'),
          // ...fastGlob.sync('node_modules/three-platformize-demo/src/TaobaoPlatform/**/*.js'),
          // ...fastGlob.sync('node_modules/three-platformize/tools/**/*.js'),
        ],
        'three-platformize-demo': [
          ...fastGlob.sync('node_modules/three-platformize-demo/src/**/*.ts'),
        ],
        'tabao-platform': [
          ...fastGlob.sync('node_modules/three-platformize/src/libs/**/*.js'),
          ...fastGlob.sync('node_modules/three-platformize/src/TaobaoPlatform/**/*.js'),
          // ...fastGlob.sync('node_modules/three-platformize-demo/src/TaobaoPlatform/**/*.js'),
          // ...fastGlob.sync('node_modules/three-platformize/tools/**/*.js'),
        ],
      }
      // manualChunks(id) {
      //   console.log(id, id.includes('three-platformize'))
      //   if (id.includes('three-platformize')) return 'three-platformize';
      //   if (id.includes('node_modules')) return 'vendor';
      //   return 'main'
      // }
    },
    plugins: [
      resolve({ extensions: ['.ts', '.js'] }),
      sucrase({ transforms: ['typescript'] }),
      // esbuild({
      //   sourceMap: false,
      //   minify: false,
      //   target: 'es2018',
      //   legalComments: 'none',
      // }),
      // terser({ output: { comments: false } }),
    ]
  }
]