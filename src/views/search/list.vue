<template>
  <div class="box">
    <header class="header">
      <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action>
        <template #left>
          <div class="searchback" @click="$router.back()">
            <van-icon name="arrow-left" />
          </div>
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </header>
    <div class="content">
      <van-empty
      v-if="this.searchlist.length === 0"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="没有查找到您想要的商品信息"
      />
      <div v-else>
        <van-Sticky :offset-top="43">
          <van-dropdown-menu>
          <van-dropdown-item v-model="price" :options="option1" />
          <van-dropdown-item v-model="sales" :options="option2" />
          <van-dropdown-item title="筛选" ref="item">
            <van-switch-cell v-model="switch1" title="包邮" />
            <van-switch-cell v-model="switch2" title="团购" />
            <label class="pricelabel">价格区间</label>
            <input type="text" placeholder="0" class="priceClass" v-model="min">
            ---
            <input type="text" placeholder="最大" class="priceClass" v-model="max"/>
            <div style="padding: 5px 16px;">
              <van-button type="danger" block round @click="filter">
                确认
              </van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
        </van-Sticky>
        <van-card
        v-for="item of searchlist"
        :key="item.proid"
        :price="item.price"
        :desc="item.desc"
        :title="item.proname"
        :thumb="item.proimg"
        @click="$router.push('/detail/' + item.proid)"
        >
        <template #tags>
          <van-tag plain type="danger">{{ item.brand }}</van-tag>
          <van-tag plain type="danger">已售{{ item.sales }}</van-tag>
        </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Dialog, Icon, Toast, Empty, DropdownMenu, DropdownItem, SwitchCell, Button, Card, Tag, Sticky } from 'vant'
import { getSearchData } from '@/api'
Vue.use(Search)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(Empty)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(SwitchCell)
Vue.use(Button)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Sticky)
export default {
  data () {
    return {
      searchText: '',
      searchlist: [1],
      list: [],
      min: 0,
      max: null,
      price: 0,
      sales: 0,
      switch1: false,
      switch2: false,
      option1: [
        { text: '价格排序', value: 0 },
        { text: '价格降序', value: 1 },
        { text: '价格升序', value: 2 }
      ],
      option2: [
        { text: '销量排序', value: 0 },
        { text: '销量降序', value: 1 },
        { text: '销量升序', value: 2 }
      ]
    }
  },
  // 侦听属性解决价格升降序和销量升降序问题
  watch: {
    price (val) {
      console.log(val)
      if (val === 0) {
        this.searchlist = this.list
      } else if (val === 1) {
        // 价格降序
        this.searchlist.sort((a, b) => {
          return b.price - a.price
        })
      } else {
        // 价格升序
        this.searchlist.sort((a, b) => {
          return a.price - b.price
        })
      }
    },
    sales (val) {
      console.log(val)
      if (val === 0) {
        this.searchlist = this.list
      } else if (val === 1) {
        // 销量降序
        this.searchlist.sort((a, b) => {
          return b.sales - a.sales
        })
      } else {
        // 销量升序
        this.searchlist.sort((a, b) => {
          return a.sales - b.sales
        })
      }
    }
  },
  mounted () {
    console.log(this.$route.query.searchText)
    this.searchText = this.$route.query.searchText
    getSearchData({
      searchText: this.searchText
    }).then(res => {
      this.searchlist = res.data.data
      // 深拷贝，将json数据转为字符串，不改变排序之前的顺序
      this.list = JSON.parse(JSON.stringify(res.data.data))
    })
  },
  methods: {
    onSearch () {
      // 改变地址栏
      // 如果输入的关键词没有发生变化，不执行
      if (this.$route.query.searchText === this.searchText) {
        return
      }
      this.$router.replace('/searchlist?searchText=' + this.searchText)
      // 重新请求数据
      getSearchData({
        searchText: this.searchText
      }).then(res => {
        this.searchlist = res.data.data
        this.list = JSON.parse(JSON.stringify(res.data.data))
      })
    },
    // 筛选(区间)
    filter () {
      this.searchlist = this.list
      let arr = []
      if (this.max === null) {
        arr = this.searchlist.filter(item => {
          return item.price >= this.min * 1
        })
      } else {
        arr = this.searchlist.filter(item => {
          return item.price >= this.min * 1 && item.price <= this.max * 1
        })
      }
      this.searchlist = arr
      this.$refs.item.toggle()
    }
  }
}
</script>

<style lang="scss">
  .van-search {
    padding: 5px 12px;
  }
  .searchback {
    margin: 0 20px 0 0;
  }
  .searchBox {
    padding: 10px 8px;
    h3 {
      margin-top: 15px;
    }
    .van-tag {
      margin: 5px;
      padding: 3px 10px;
    }
  }
  .pricelabal {
    margin: 10px;
  }
  .priceClass {
    width: 80px;
    height: 32px;
    margin: 15px 0;
  }
</style>
