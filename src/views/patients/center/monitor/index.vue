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
            <p>{{Heart}}<label style="font-size: 20px">次/分钟</label></p>
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
            <p>{{BloodO2}}<label style="font-size: 20px">%</label></p>
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
            <p>{{Breath}}<label style="font-size: 20px">次/分钟</label></p>
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
            <p>{{Sbp}}/{{Dbp}}<label style="font-size: 20px">mmHg</label></p>
          </div>
        </div>
        <div class="four wide column">
          <div
            class="ui center aligned text container olive segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui green label">体温</div>
            <p>{{BodyTem}}<label style="font-size: 20px">℃</label></p>
          </div>
        </div>
        <div class="two wide column">
          <div
            class="ui center aligned text container segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui blue label">室温</div>
            <p>{{temper}}<label style="font-size: 20px">℃</label></p>
          </div>
        </div>
        <div class="two wide column">
          <div
            class="ui center aligned text container segment"
            style="width: 100%; font-size: 50px; padding: 15px"
          >
            <div class="floating ui blue label">湿度</div>
            <p>{{himidity}}<label style="font-size: 20px">%</label></p>
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
      var data = JSON.parse(frame.body)
      this.ecglinedata.xdata.push(data.time)
      this.ecglinedata.ydata.push(data.ECG.data)
      this.bloodo2linedata.xdata.push(data.time)
      this.bloodo2linedata.ydata.push(data.BloodO2.data)
      this.breathlinedata.xdata.push(data.time)
      this.breathlinedata.ydata.push(data.Breath.data)
      this.temper=data.temper.data
      this.BloodO2=data.BloodO2.data
      this.himidity=data.himidity.data
      this.Dbp=data.Dbp.data
      this.Sbp=data.Sbp.data
      this.Heart=data.Heart.data
      this.Breath=data.Breath.data
      this.BodyTem=data.BodyTem.data
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
