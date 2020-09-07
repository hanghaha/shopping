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
          <div @click= "onSearch">搜索</div>
        </template>
      </van-search>
    </header>
    <div class="content">
      <div class="kindbox">
        <div class="left">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item v-for="(item, index) of kindlist" :key="index" :title="item" />
          </van-sidebar>
        </div>
        <div class="right">
          <!-- 分类列表 -->
          <van-grid :border="false">
            <van-grid-item icon="photo-o" v-for="(item, index) of brandlist" :key="index" :text="item" @click="tolist(item)"/>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sidebar, SidebarItem, Search, Icon, Grid, GridItem } from 'vant'
import { getKindListData, getBrandListData } from '@/api'
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)
export default {
  data () {
    return {
      activeKey: 0,
      searchText: '',
      kindlist: [],
      brandlist: []
    }
  },
  mounted () {
    getKindListData().then(res => {
      this.kindlist = res.data.data
      // 请求完分类数据 自动点击第一个
      this.onChange(0)
    })
  },
  methods: {
    tolist (item) {
      const category = this.kindlist[this.activeKey]
      const brand = item
      console.log(category, brand)
      this.$router.push('/kindlist?category=' + category + '&brand=' + brand)
    },
    onChange (index) {
      const category = this.kindlist[index]
      console.log(category)
      getBrandListData({ category }).then(res => {
        console.log(res.data.data)
        this.brandlist = res.data.data
      })
    },
    onSearch () {
      // 改变地址栏
      // 如果输入的关键词没有发生变化，不执行
      console.log(this.$route)
      if (this.searchText === '') {
        return null
      } else {
        this.$router.push('/searchlist?searchText=' + this.searchText)
      }
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
  .kindbox {
    display: flex;
    height: 100%;
    .left {
      width: 85px;
      height: 100%;
      overflow: auto;
    }
    .right {
      flex: 1
    }
  }
</style>
