<template>
  <div class="container">
    <!-- <div class="box">
      <header class="header"></header>
      <div class="content"></div>
    </div> -->
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="footer"></router-view>
    <!-- <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
         <router-link to="/kind" tag="li">
          <span class="iconfont icon-fenlei"></span>
          <p>分类</p>
        </router-link>
         <router-link to="/cart" tag="li">
          <span class="iconfont icon-gouwuche"></span>
          <p>购物车</p>
        </router-link>
         <router-link to="/user" tag="li">
          <span class="iconfont icon-ziyuan"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer> -->
  </div>
</template>

<style lang="scss">
// 编写样式 审查元素
* { padding: 0; margin: 0; list-style: none; }
html, body, .container { height: 100%; }

html {
  // font-size: 100px; // 所有的机型显示出来的 高度保持一致
  // 假设设计稿以iphone 5为基准 640 * 1280  - css- 320 * 640  ------ 100 / 320 * 100  ---- vw的单位
  // font-size: 31.25vw;
  // 假设设计稿以iphone 6为基准 750 * 1334  - css- 375 * 667  ------ 100 / 375 * 100  ---- vw的单位
  font-size: 26.6666666666vw;
}

body {
  font-size: 14px;
}
// 横屏
@media all and (orientation: landscape){
  html {
    font-size: 100px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  .box {
    flex: 1;
    overflow: auto; // 内容超出显示滚动条
    display: flex;
    flex-direction: column;
    .header {
      height: 0.44rem;
      background-color: #f66;
    }
    .content {
      flex: 1;
      overflow: auto; // 内容超出显示滚动条
    }
  }
  .footer {
    height: 0.5rem;
    background-color: #efefef;
    ul {
      display: flex;
      height: 100%;
      li {
        flex: 1;
        // 弹性盒实现水平垂直居中
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.router-link-active {
          color: #f66;
        }
        span{
          font-size: 0.24rem;
          .van-info {
            top: 8px;
          }
        }
        p{
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>
