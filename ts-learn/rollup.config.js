import ts from 'rollup-plugin-typescript2'; // 解析ts的插件
import serve from 'rollup-plugin-serve'
import {nodeResolve} from '@rollup/plugin-node-resolve'; // 解析第三方模块的插件
import path from 'path';

const resolve = (p) => path.resolve(__dirname, p)

export default {
  input: resolve('./src/interface.ts'),
  output: {
    file: resolve('./dist/bundle.js'),
    format: 'iife',
    sourcemap: 'true'
  },
  plugins: [
    nodeResolve({ // 第三方文件解析
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      open: true,
      port: '3000',
      openPage: '/public/index.html',
      contentBase: ''
    })
  ]
}