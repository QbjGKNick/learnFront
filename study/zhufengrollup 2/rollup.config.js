
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';export default {
    input:'./src/main.js',//入口文件
    output:{
        file:'./dist/bundle.js',//打包后的存放文件
        format:'cjs',//输出格式 amd es6 iife umd cjs
        name:'bundleName'//如果iife,umd需要指定一个全局变量
    },
    plugins:[
        resolve(),
        commonjs()
    ]
}