<template>
  <div class="box">
    <header class="header">
      <van-nav-bar
        title="设置"
        left-arrow
        @click-left="$router.back()"
      >
      </van-nav-bar>
    </header>
    <div class="content setuser">
       <van-field label="账户名" value="十二" disabled />
       <van-field label="昵称" value="十二123" clearable/>
       <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="0">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        clickable
        name="datetimePicker"
        :value="birthday"
        label="生日"
        placeholder="点击选择生日"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-button type="info" block>保存</van-button>
      <van-button plain type="danger" block  class="logout" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Field, Radio, RadioGroup, Popup, DatetimePicker, Button } from 'vant'
import { mapState, mapMutations } from 'vuex'
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Popup)
Vue.use(DatetimePicker)
Vue.use(Button)
export default {
  computed: {
    ...mapState({
      // 解构赋值 -- 多重解构赋值  - 参数的解构赋值
      // obj = { a: { b: { c: 1 } } }
      // obj.a.b.c
      // const c = obj.a.b.c
      // const { c } = obj.a.b
      // const { b: { c } } = obj.a
      // const { a: { b: { c } } } = obj
      loginState: ({ user }) => user.loginState,
      userid: ({ user: { userid } }) => userid,
      token: ({ user: { token } }) => token
    })
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('loginState') === 'true') {
      next()
    } else {
      next('/login')
    }
  },
  methods: {
    ...mapMutations({
      change_login_state: 'user/change_login_state',
      changeToken: 'user/changeToken',
      changeUserid: 'user/changeUserid'
    }),
    logout () {
      localStorage.removeItem('userid')
      localStorage.removeItem('loginState')
      localStorage.removeItem('token')
      this.change_login_state(false)
      this.changeToken('')
      this.changeUserid('')
      this.$router.replace('/login')
    },
    onConfirm (val) {
      console.log(val.toLocaleDateString())
      this.birthday = val.toLocaleDateString()
      this.showPicker = false
    }
  },
  data () {
    return {
      sex: '1',
      showPicker: false,
      birthday: '',
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  }
}
</script>

<style lang="scss">
.setuser {
  padding: 10px 8px;
  .logout {
    margin-top: 30px;
  }
}
</style>
