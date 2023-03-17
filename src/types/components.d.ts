import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
declare module 'vue' {
  // GlobalComponents不能变，这是规定
  interface GlobalComponents {
    // 指定组件类型，typeof 从组件对象得到类型，设置给全局组件：CpNavBar
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn

  }
}
