<template>
  <div class="information-container">
    <el-tag
    effect="dark"
    style = "width: 200px;height:35px;margin-left:40px;margin-top:10px"
    >
    <span style="font-size:30px;padding:25px">我的通知</span>
  </el-tag>
   <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 1000px;margin-left: 80px;margin-top:50px;font-size:20px;border: solid;">
      <el-table-column prop="type" label="通知类型" width="180px"  align="center" > </el-table-column>
      <el-table-column prop="name" label="发件人" width="180px" align="center" style=""> </el-table-column>
      <el-table-column prop="identity" label="发件身份" align="center" width="180px"> </el-table-column>
      <el-table-column prop="time" label="发件时间" align="center" width="180px"> </el-table-column>
      <el-table-column prop="content" label="通知内容" width="180px" align="center" > </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
