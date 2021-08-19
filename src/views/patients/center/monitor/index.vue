<template>
  <div class="dashboard-container">
     
         <div class="ui grid">
             <div class="row">
                <div class="twelve wide column">
                    <div class="ui center aligned padded segment">
                        <echartsline3/>
                        <div class="ui bottom left attached teal  label">心电图 I</div>
                    </div>
                </div>
                <div class="four wide column">
                    
                    <div class="ui center aligned text container olive segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui green label">心率</div>
                        <p>60<label style="font-size:20px">次/分钟</label> </p>
                        
                    </div>
                    
                </div>
             </div>
             <div class="row">
                <div class="twelve wide column">
                    <div class="ui center aligned padded segment">
                        <echartsline2/>
                        <div class="ui bottom left attached teal  label">血氧饱和度</div>
                    </div>
                </div>
                <div class="four wide column">
                    
                    <div class="ui center aligned text container olive segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui green label">血氧</div>
                        <p>98<label style="font-size:20px">%</label> </p>
                        
                    </div>
                    
                </div>
             </div>
             <div class="row">
                <div class="twelve wide column">
                    <div class="ui center aligned padded segment">
                        <echartsline2/>
                        <div class="ui bottom left attached teal label">呼吸波形</div>
                    </div>
                </div>
                <div class="four wide column">
                    
                    <div class="ui center aligned text container olive segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui green label">呼吸值</div>
                        <p>12<label style="font-size:20px">次/分钟</label> </p>
                        
                    </div>
                    
                </div>
             </div>
             
             <div class="ui divider"></div>
             <div class="row">
                <div class="four wide column">
                    
                    <div class="ui center aligned text container olive segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui green label">血压</div>
                        <p>120/80<label style="font-size:20px">mmHg</label> </p>
                        
                    </div>
                    
                </div>
                <div class="four wide column">
                    
                    <div class="ui center aligned text container olive segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui green label">体温</div>
                        <p>36.5<label style="font-size:20px">℃</label> </p>
                        
                    </div>
                    
                </div>
                <div class="two wide column">
                    
                    <div class="ui center aligned text container segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui blue label">室温</div>
                        <p>26<label style="font-size:20px">℃</label> </p>
                        
                    </div>
                    
                </div>
                <div class="two wide column">
                    
                    <div class="ui center aligned text container segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui blue label">湿度</div>
                        <p>60<label style="font-size:20px">%</label> </p>
                        
                    </div>
                    
                </div>
                <div class="two wide column">
                    
                    <div class="ui center aligned text container segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui blue label">窗户</div>
                        <p>开<label style="font-size:20px"></label> </p>
                        
                    </div>
                    
                </div>
                <div class="two wide column">
                    
                    <div class="ui center aligned text container segment" style="width: 100%;font-size:50px;padding:15px">
                        <div class="floating ui blue label">窗帘</div>
                        <p>开<label style="font-size:20px"></label> </p>
                        
                    </div>
                    
                </div>
             </div>
             
         </div>
     </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
//引入自定义组件
import echartsline2 from "@/components/EchartsComponents/Echartsline2.vue";
import echartsline3 from "@/components/EchartsComponents/Echartsline3.vue";
import "@/assets/semantic-ui/semantic.min.js";
import "@/assets/semantic-ui/semantic.min.css";

export default {
  name: 'Dashboard',
  components: {
    echartsline2,
    echartsline3,
  },
  data () {
      return {

      }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

  },
  mounted() {

  },
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
