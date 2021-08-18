<template>
  <div class="medical-container">
    <el-container>
      <el-card
        class="box-card1"
        style="border: solid; margin-top: 100px; margin-left: 60px"
      >
        <div
          slot="header"
          class="clearfix"
          style="font-size: 30px"
          align="center"
        >
          <span>我的医生</span>
        </div>
        <div key="1">
          <el-container>
            <el-avatar
              shape="square"
              style="
                width: 100px;
                height: 100px;
                margin-top: 0px;
                margin-left: 20px;
              "
              :src="squareUrl"
            ></el-avatar>
            <div  style="font-size: 30px;margin-left: 50px;margin-top: 10px;" > {{ "姓名" }}  </div> 
          </el-container>
        </div>
        <div key="2">
          <div  style="font-size: 30px;margin-left: 170px;margin-top: -30px;" > {{ "性别" }}  </div> 
        </div>
        <div key="3">
          <div  style="font-size: 30px;margin-left: 20px;margin-top: 50px;" > {{ "电话号码" }}  </div> 
        </div>
      </el-card>
      <el-card class="box-card2" style="border: solid; margin: 100px 60px">
        <div
          slot="header"
          class="clearfix"
          style="font-size: 30px"
          align="center"
        >
          <span>我的护士</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.text {
  font-size: 60px;
}

.item {
  margin-bottom: 18px;
}

/* .clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
} */

.box-card1 {
  width: 680px;
  height: 700px;
  border-radius: 30px;
}
.box-card2 {
  width: 680px;
  height: 700px;
  border-radius: 30px;
}
</style>
