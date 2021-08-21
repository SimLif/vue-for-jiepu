<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="ui middle aligned center aligned grid">
      <!-- <iframe src="@/assets/images/hospital.svg" width="300" height="100"></iframe> -->
      <!-- <embed src="@/assets/images/hospital.svg" width="300" height="100" 
        type="image/svg+xml"
        pluginspage="http://www.adobe.com/svg/viewer/install/" /> -->
      <!-- <img class="ui image" src="@/assets/images/hospital.svg"/>
      <div class="column">欢迎使用病房信息化服务平台</div> -->
      <div class="row">
      <img class="ui medium  image" src="@/assets/images/hospital.svg"/>
      </div>
      <div class="row">
      <h1 class="ui header">
        
        {{name}}，欢迎使用病房信息化服务平台
      </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "@/assets/semantic-ui/semantic.min.js";
import "@/assets/semantic-ui/semantic.min.css";

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 50px;
  }
  &-text {
    font-size: 100px;
    line-height: 100px;
  }
}
</style>
