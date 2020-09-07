<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
      title="注册"
      left-arrow
      right-text="去登录"
      @click-left="$router.back()"
      @click-right="$router.replace('/login')"
      />
    </header>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          clearable
          placeholder="用户名"
          :right-icon="usernameTip"
        />
        <van-field
          v-model="tel"
          name="tel"
          clearable
          placeholder="手机号"
          :right-icon="telTip"
        />
        <van-field
          v-model="code"
          name="code"
          center
          clearable
          placeholder="请输入短信验证码"
          :right-icon="codeTip"
        >
        <template #button>
          <van-button size="small" type="primary" :disabled="btnflag" @click="sendCodeFn">{{codemsg}}</van-button>
        </template>
        </van-field>
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
            注册
            </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Form, Field, Button, Toast } from 'vant'
import { sendCode, register } from './../../api'
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Button)
export default {
  data () {
    return {
      username: '',
      tel: '',
      password: '',
      code: '',
      codemsg: '发送短信验证码',
      time: 5,
      btnflag: false,
      timer: null
    }
  },
  computed: {
    usernameTip () {
      if (this.username.length >= 2) {
        return 'success'
      } else {
        return ''
      }
    },
    telTip () {
      if (this.tel.length === 11 && (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.tel))) {
        return 'success'
      } else {
        return ''
      }
    },
    codeTip () {
      if (this.code.length === 6) {
        return 'success'
      } else {
        return ''
      }
    },
    passwordTip () {
      if (this.password.length >= 6 && this.password.length < 12) {
        return 'success'
      } else {
        return ''
      }
    },
    btnDisabledTip () {
      if (this.usernameTip === 'success' && this.telTip === 'success' && this.codeTip === 'success' && this.passwordTip === 'success') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    validateTel () {
      if (this.telTip === 'success') {
        return true
      } else {
        return false
      }
    },
    // 调用后端接口
    sendCode () {
      sendCode({
        tel: this.tel
      }).then(res => {
        if (res.data.code === '10002') {
          Toast('该用户已注册')
          this.$router.replace('/login')
        } else {
          Toast('验证已发送到您的手机')
        }
      })
    },
    sendCodeFn () {
      if (!this.validateTel()) {
        Toast('请输入正确的手机号码')
        return
      }
      this.sendCode()
      this.btnflag = true
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.codemsg = this.time + 's后重新发送'
        } else {
          clearInterval(this.timer)
          this.time = 5
          this.codemsg = '发送短信验证码'
          this.btnflag = false
        }
        this.time--
      }, 1000)
    },
    onSubmit (values) {
      console.log(values)
      register(values).then(res => {
        if (res.data.code === '10003') {
          Toast('该用户名已存在')
        } else if (res.data.code === '10033') {
          Toast('该手机号已被占用')
        } else if (res.data.code === '10004') {
          Toast('亲,请先获取短信验证码')
        } else if (res.data.code === '10005') {
          Toast('亲，验证码输错了')
        } else {
          Toast('注册成功')
          // 跳转登录页面
          this.$router.replace('/login')
        }
      })
    }
  }
}
</script>
