<template>
  <div class="wrapper">
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          <div class="col mx-auto">
            <div class="mb-4 text-center">
              <img src="@/assets/images/logo-img.png" width="180" alt="" />
            </div>
            <div class="card">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="text-center">
                    <h3 class="">-^0^- 注册成功！请记住您的id是{{id}}。</h3>
                    
                  </div>
                  
                  <div class="login-separater text-center mb-4"> 
                    <hr/>
                  </div>
                  <div class="form-body">
                    <el-form class="row g-3">
                      
                    <div class="col-12" style="margin-top:10%">
                        <div class="d-grid">
                          <el-button   class="btn btn-light"  @click.prevent="jump_login"><i class="lni lni-checkmark-circle"></i>跳转到登录界面</el-button>
                          
                        </div>
                      </div>
                    </el-form>
                    
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end row-->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      id:0,
    }
  },
   created() {
    this.fetchDoctorData();
  },
  methods: {
    fetchDoctorData: function () {
      this.id = localStorage.getItem("idd");
    },
    jump_login(){
      this.$router.push({ path: '/login' })
    }
  },
  mounted() {
    document.getElementsByTagName('body')[0].className = "bg-theme bg-theme2";
  },
  
}
</script>

<style scoped>
@import './css/register_patient.css';
@import './css/register.css';
@import "./css/login.css";
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";

</style>

 