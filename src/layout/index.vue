<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Stomp from "stompjs";
import request from "../utils/request.js";
import {
  MQ_SERVICE,
  MQ_USERNAME,
  MQ_PASSWORD,
} from "../config/linkparams.js";
export default {
  name: 'Layout',
  data () {
    return {
      client: Stomp.client(MQ_SERVICE),
      refreshFlag:true,
    
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created () {
    this.connect()
  },
  methods: {
    onConnected: function (frame) {
      console.log('Connected: ' + frame)
      var topic = '/topic/Info'
 
      this.client.subscribe(topic, this.responseCallback, this.onFailed)
    },
    onFailed: function (frame) {
      console.log('Failed: ' + frame)
    },
    responseCallback: function (frame) {
      var storage = localStorage.getItem("id");
      var emailform = new FormData();
      emailform.append("user_id", storage);
      emailform.append("type","0")
      console.log('responseCallback msg=>' + frame.body)
      console.log('------')
      var data = JSON.parse(frame.body)
      console.log(data.Heart[72].Alert,"报警位")
      if(data.Heart[72].Alert==1){this.$message.error('心率超出正常范围，请注意');
      request({
            url: "/email/",
            method: "post",
            data:  emailform,
          });
          }
    },
    connect: function () {
      var headers = {
        'login': MQ_USERNAME,
        'passcode': MQ_PASSWORD
      }
      this.client.connect(headers, this.onConnected, this.onFailed)
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  mounted() {
    if (location.href.indexOf("#reloaded") == -1) {
               location.href = location.href + "#reloaded";
                location.reload();
      }
  },
  
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
