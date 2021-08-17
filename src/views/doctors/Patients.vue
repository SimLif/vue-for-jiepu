<template>
  <div class="dashboard-container ">

    <h1 class="ui header">我的病人</h1>

    <!-- <div class="ui menu">
        <div class="right menu">
            <div class="item">
                <el-button>添加患者</el-button>
            </div>
        </div>
    </div> -->

    <div v-show="!ifSearch" class="ui right aligned container segment">
      <div class="ui action input">
        <input type="text" placeholder="输入ID搜索添加病人...">
        <button @click="reverseSearchFlag" class="ui icon button">
          <i class="search icon"></i>
        </button>
      </div>
    </div>

    <div v-show="ifSearch" class="ui right aligned container segment">
      <button @click="reverseSearchFlag" class="ui button">
        取消添加
      </button>
    </div>

    <div v-show="ifSearch" class="ui center aligned container segment">
      <div id="datatable">
        <el-table border :data="tableData" style="width: 100%; margin-top: 15px">
          <el-table-column label="编号" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="病人姓名" align="center" width="180">
            <template slot-scope="scope">
              <el-image
                style="width: 40px; height: 40px"
                :src="scope.row.avatar"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="病人ID"
            align="center"
            width="150"
            style="margin-left: 10px"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >添加患者</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="ui container">
        <div class = "ui four stackable cards">
            <div v-for="t in test"  class="ui centered card" :key="t.index">
              <div class="content">
                <img class="right floated mini ui image" src="@/assets/images/kristy.png">
                <div class="header">
                  病人姓名
                </div>
                <div class="meta">
                  病人所处病房
                </div>
                <div class="description">
                  <div class="ui internally celled grid">
                    
                    <div class="eight wide column">心率</div>
                    <div class="eight wide column">血压</div>

                    <div class="three column row">
                      <div class="column">体温</div>
                      <div class="column">血氧</div>
                      <div class="column">呼吸值</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content">
                <div class="ui three buttons">
                  <div class="ui basic green button">重点关注</div>
                  <div class="ui basic red button">移除病人</div>
                </div>
                
              </div>
            </div>
        </div>
    </div>

    <!-- <div class="ui container segment" style="position:fixed;top:40%;left:0;right:0;margin:0 auto;">
        123
    </div> -->

    <!-- <div class="ui divider"></div> -->

    <div class="ui centered grid" style="margin-top:3%">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import $ from "jquery";
import "@/assets/semantic-ui/semantic.min.js"
import "@/assets/semantic-ui/semantic.min.css"

export default {
  name: 'Dashboard',
  data() {
      return {
          test : [1, 2, 3, 4, 6, 7, 8, 9],
          ifSearch : false
          }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    reverseSearchFlag(event) {
      this.ifSearch = !this.ifSearch;
    },
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

<style scoped>
    /* @import "@/assets/css/semantic.min.css"; */
</style>
