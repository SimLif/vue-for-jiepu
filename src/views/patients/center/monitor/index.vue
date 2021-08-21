<template>
  <div class="dashboard-container">
    <div class="ui grid">
      <div class="row">
        <div class="twelve wide column">
          <div class="ui center aligned padded segment">
            <echartsline-3 :linedata="ecglinedata"></echartsline-3>
            <div class="ui bottom left attached teal label">心电图 I</div>
          </div>
        </div>
        <div class="four wide column">
          <div
            class="ui center aligned text container olive segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui green label">心率</div>
            <p v-if="Heart_alert==1" style="color:red">{{Heart}}<label  style="font-size: 20px;color:red">次/分钟</label></p>
            <p v-else >{{Heart}}<label  style="font-size: 20px;">次/分钟</label></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="twelve wide column">
          <div class="ui center aligned padded segment">
            <echartsline-2 :linedata="bloodo2linedata"></echartsline-2>
            <div class="ui bottom left attached teal label">血氧饱和度</div>
          </div>
        </div>
        <div class="four wide column">
          <div
            class="ui center aligned text container olive segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui green label">血氧</div>
            <p v-if="BloodO2_alert==1" style="color:red">{{BloodO2}}<label style="font-size: 20px;color:red">%</label></p>
            <p v-else >{{BloodO2}}<label  style="font-size: 20px;">%</label></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="twelve wide column">
          <div class="ui center aligned padded segment">
            <echartsline-2 :linedata="breathlinedata"></echartsline-2>
            <div class="ui bottom left attached teal label">呼吸波形</div>
          </div>
        </div>
        <div class="four wide column">
          <div
            class="ui center aligned text container olive segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui green label">呼吸值</div>
            <p v-if="Breath_alert==1" style="color:red">{{Breath}}<label style="font-size: 20px;color:red">次/分钟</label></p>
            <p v-else>{{Breath}}<label style="font-size: 20px">次/分钟</label></p>
          </div>
        </div>
      </div>

      <div class="ui divider"></div>
      <div class="row">
        <div class="four wide column">
          <div
            class="ui center aligned text container olive segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui green label">血压</div>
            <p v-if="Sbp_alert==1||Dbp_alert==1" style="color:red">{{Sbp}}/{{Dbp}}<label style="font-size: 20px;color:red">mmHg</label></p>
            <p v-else>{{Sbp}}/{{Dbp}}<label style="font-size: 20px">mmHg</label></p>
          </div>
        </div>
        <div class="four wide column">
          <div
            class="ui center aligned text container olive segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui green label">体温</div>
            <p v-if="BodyTem_alert==1" style="color:red">{{BodyTem}}<label style="font-size: 20px;color:red">℃</label></p>
            <p v-else>{{BodyTem}}<label style="font-size: 20px">℃</label></p>
          </div>
        </div>
        <div class="two wide column">
          <div
            class="ui center aligned text container segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui blue label">室温</div>
            <p v-if="temper_alert==1" style="color:red">{{temper}}<label style="font-size: 20px;color:red">℃</label></p>
            <p v-else>{{temper}}<label style="font-size: 20px">℃</label></p>
          </div>
        </div>
        <div class="two wide column">
          <div
            class="ui center aligned text container segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui blue label">湿度</div>
            <p v-if="himidity_alert==1" style="color:red">{{himidity}}<label style="font-size: 20px;color:red">%</label></p>
            <p v-else>{{himidity}}<label style="font-size: 20px">%</label></p>
          </div>
        </div>
        <div class="two wide column">
          <div
            class="ui center aligned text container segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui blue label">窗户</div>
            <p>开<label style="font-size: 20px"></label></p>
          </div>
        </div>
        <div class="two wide column">
          <div
            class="ui center aligned text container segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui blue label">窗帘</div>
            <p>开<label style="font-size: 20px"></label></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//引入自定义组件
import echartsline2 from "@/components/EchartsComponents/Echartsline2.vue";
import echartsline3 from "@/components/EchartsComponents/Echartsline3.vue";
import Stomp from "stompjs";
import {
  MQ_SERVICE,
  MQ_USERNAME,
  MQ_PASSWORD,
} from "../../../../config/linkparams.js";
import "@/assets/semantic-ui/semantic.min.js";
import "@/assets/semantic-ui/semantic.min.css";

export default {
  name: "Dashboard",
  components: {
    echartsline2,
    echartsline3,
  },
  data() {
    return {
      client: Stomp.client(MQ_SERVICE),
      temper_alert:0,
      himidity_alert:0,
      Dbp_alert:0,
      Sbp_alert:0,
      BodyTem_alert:0,
      BloodO2_alert:0,
      Heart_alert:0,
      Breath_alert:0,
      ecglinedata: {
        xdata: [],
        ydata: [],
      },
      bloodo2linedata: {
        xdata: [],
        ydata: [],
      },
      breathlinedata: {
        xdata: [],
        ydata: [],
      },
      temper:26,
      himidity:60,
      Dbp:120,
      Sbp:80,
      BodyTem:36.5,
      BloodO2:98,
      Heart:60,
      Breath:12,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    this.connect();
  },
  methods: {
    onConnected: function (frame) {
      console.log("Connected: " + frame);
      var topic = "/topic/Info";

      this.client.subscribe(topic, this.responseCallback, this.onFailed);
    },
    onFailed: function (frame) {
      console.log("Failed: " + frame);
    },
    responseCallback: function (frame) {
      console.log("responseCallback msg=>" + frame.body);
      console.log("------");
      var storage = localStorage.getItem("id");
      var emailform = new FormData();
      emailform.append("user_id", storage);
      emailform.append("type","0")
      var data = JSON.parse(frame.body)
      // console.log(data.Heart[72].Alert,"报警位")
      // if(data.Heart[72].Alert==1){this.$message.error('心率超出正常范围，请注意');
      // request({
      //       url: "/email/",
      //       method: "post",
      //       data:  emailform,
      //     });
      //     }
      this.ecglinedata.xdata.push(data.time)
      this.ecglinedata.ydata.push(data.ECG[17].data)
      this.bloodo2linedata.xdata.push(data.time)
      this.bloodo2linedata.ydata.push(data.BloodO2[8].data)
      this.breathlinedata.xdata.push(data.time)
      this.breathlinedata.ydata.push(data.Breath[9].data)
      this.temper=data.temper[6].data
      this.temper_alert=data.temper[6].Alert
      this.BloodO2=data.BloodO2[8].data
      this.BloodO2_alert=data.BloodO2[8].Alert
      this.himidity=data.himidity[7].data
      this.himidity_alert=data.himidity[7].Alert
      this.Dbp=data.Dbp[5].data
      this.Dbp_alert=data.Dbp[5].Alert
      this.Sbp=data.Sbp[6].data
      this.Sbp_alert=data.Sbp[6].Alert
      this.Heart=data.Heart[72].data
      this.Heart_alert=data.Heart[72].Alert
      this.Breath=data.Breath[9].data
      this.Breath_alert=data.Breath[9].Alert
      this.BodyTem=data.BodyTem[7].data
      this.BodyTem_alert=data.BodyTem[7].Alert
    },
    connect: function () {
      var headers = {
        login: MQ_USERNAME,
        passcode: MQ_PASSWORD,
      };
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
  },
  mounted() {},
};
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
