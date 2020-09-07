<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="登录"
        left-arrow
        right-text="去注册"
        @click-right="$router.replace('/register')"
        @click-left="$router.back()"
      />
    </header>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginname"
          name="loginname"
          clearable
          placeholder="用户名/手机号"
          :right-icon="loginnameTip"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          clearable
          placeholder="密码"
          :right-icon="passwordTip"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" :disabled="btnDisabledTip">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Form, Field, Button, Toast } from 'vant'
import { login } from './../../api'
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Button)
export default {
  data () {
    return {
      loginname: '',
      password: ''
    }
  },
  computed: {
    loginnameTip () {
      if (this.loginname.length >= 2) { // 根据需求 使用 正则表达式校验
        return 'success'
      } else {
        return ''
      }
    },
    passwordTip () {
      if (this.password.length >= 6 && this.password.length < 12) { // 根据需求 使用 正则表达式校验
        return 'success'
      } else {
        return ''
      }
    },
    btnDisabledTip () {
      if (this.loginnameTip === 'success' && this.passwordTip === 'success') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    onSubmit (values) {
      console.log(values)
      login(values).then(res => {
        if (res.data.code === '10006') {
          Toast('该用还未注册')
        } else if (res.data.code === '10007') {
          Toast('密码错误')
        } else {
          Toast('登录成功')
          // 保存登录状态
          localStorage.setItem('userid', res.data.data.userid)
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('loginState', true)
          this.$store.commit('user/change_login_state', true)
          this.$store.commit('user/changeToken', res.data.data.token)
          this.$store.commit('user/changeUserid', res.data.data.userid)
          this.$router.back()
        }
      })
    }
  }
}
</script>
