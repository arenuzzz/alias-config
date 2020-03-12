import ts from '@wessberg/rollup-plugin-ts';
import analyze from 'rollup-plugin-analyzer';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default [
  // browser-friendly UMD build
  {
    watch: {
      clearScreen: false,
    },
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }),
      // resolve(), // so Rollup can find `ms`
      // commonjs(), // so Rollup can convert `ms` to an ES module
      ts({
        tsconfig: 'tsconfig.build.json',
        transpileOnly: true,
        // tsconfig: IS_PRODUCTION ? 'tsconfig.prod.json' : 'tsconfig.json',
        // transpiler: 'babel',
      }),
      analyze(),
      // typescript(), // so Rollup can convert TypeScript to JavaScript
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  // {
  //   input: 'src/index.ts',
  //   external: ['ms'],
  //   plugins: [
  //     typescript(), // so Rollup can convert TypeScript to JavaScript
  //   ],
  //   output: [
  //     { file: pkg.main, format: 'cjs' },
  //     { file: pkg.module, format: 'es' },
  //   ],
  // },
];