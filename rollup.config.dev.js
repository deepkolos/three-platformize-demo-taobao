import sucrase from '@rollup/plugin-sucrase';
import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: './pages/index/index.ts',
    treeshake: true,
    cache: false,
    output: {
      format: 'esm',
      file: './pages/index/index.js'
    },
    plugins: [
      resolve({ extensions: ['.ts', '.js'] }),
      sucrase({
        transforms: ['typescript']
      })
    ]
  }
]