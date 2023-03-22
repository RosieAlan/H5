import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// 实现按需引入组件
import Components from 'unplugin-vue-components/vite'
// 解析器，支持vant、element-ui、element-plus
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
  server: {
    open: true,
    port: 80
  },
  plugins: [
    vue(),
    Components({
      // 默认是true,开启自动生成组件的类型声明文件，vant的组件已经有类型声明文件，只要导入了就会使用类型声明
      dts: false,
      // 在main.ts已经引入了所有的样式，不需要自动导入样式了，只需要自动导入组件即可
      resolvers: [VantResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
