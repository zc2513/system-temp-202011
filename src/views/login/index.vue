<template>
  <div class="login green fl-y-sb">
    <div class="login-top flcc"> 人材培养管理系统 </div>
    <div class="login-main">
      <div class="login-module flcc green">
        登录form
        <router-view />
        <!--  <div class="login-content red fl-y-sa">
          <div> 登录form</div>
          <div class="online" />
          <div class="online" />
        </div>-->
      </div>
    </div>
    <!-- <div class="login-content wfull fle red">
      <div class="fl1 flcc">
        <div class="block">
          <h2 class="login-tit flc">用户登录</h2>
          <div class="form">
            <el-form ref="loginForm" :label-position="labelPosition" :model="loginForm">
              <el-form-item label="">
                <el-input
                  ref="userName"
                  v-model="loginForm.userName"
                  prefix-icon="iconfont el-icon-user"
                  placeholder="请输入账号"
                  name="userName"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item label="">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  prefix-icon="iconfont el-icon-lock"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-form>
            <div class="flsb rem">
              <el-checkbox v-model="isRemember">记住密码</el-checkbox>
              <p @click="forgot">忘记密码？点此找回</p>
            </div>
            <el-button type="primary" class="btn" style="width:100%" @click="handleLogin">登录</el-button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="flcc f14 copyright">下</div> -->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能少于6位'))
            } else {
                callback()
            }
        }
        return {
            labelPosition: 'right',
            isRemember: false,
            loginForm: {
                userName: 'admin',
                password: '111111'
            },
            loginRules: {
                userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        abc() {},
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.$router.push({ path: this.redirect || '/' })
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        },
        forgot() {
            alert('待开发')
        }
    }
}
</script>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
.login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../../assets/imgs/login/login.png') no-repeat;
    background-size: cover;
    &-top{
        height: 56px;
        margin-top: 64px;
        font-size:40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFF;
    }
    &-main{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .login-module{
            width: 50%;
            min-width: 400px;
            min-height: 500px;
            margin-bottom: 30px;
        }
    }
    .online{
        width: 400px;
        height: 180px;
        background: #6A69FF;
        box-shadow: 0px 4px 10px 0px rgba(26, 25, 136, 0.4);
        border-radius: 30px;
        border: 1px solid;
        border-image: radial-gradient(circle, rgba(239, 238, 255, 1), rgba(140, 139, 255, 1)) 1 1;
    }

    // .login-content{
    //     .logo{
    //         width: 100%;
    //         max-width: 640px;
    //         max-height: 212px;
    //     }
    //     .block{
    //         box-shadow: 0px 0px 5px 5px rgba(255,255,255,.15);
    //         background: white;
    //         border-radius: 3px;
    //         width: 368px;
    //         min-width: 368px;
    //         height: 440px;
    //         .login-tit{
    //             color:#024c93;
    //             padding: 40px 0;
    //             line-height: 24px;
    //             border-bottom: 1px solid #f2f2f2;
    //         }
    //         .form{
    //             padding: 40px 31px;
    //             .btn{
    //                 margin-top: 30px;
    //             }
    //             .rem p{
    //                 cursor: pointer;
    //             }
    //             .show-pwd {
    //                 position: absolute;
    //                 right: 10px;
    //                 top: 7px;
    //                 font-size: 16px;
    //                 color: $dark_gray;
    //                 cursor: pointer;
    //                 user-select: none;
    //             }
    //             ::v-deep{
    //                 .el-button--primary{
    //                     background: #014b93;
    //                     background-color: #014b93;
    //                 }
    //                 .el-button--primary:hover{
    //                     background: #0f6ac1;
    //                     background-color: #0f6ac1;
    //                 }
    //                 .el-button--small{
    //                     font-size: 16px;
    //                     height: 50px;
    //                 }
    //                 .el-input--small .el-input__inner{
    //                     height: 47px;
    //                     line-height: 47px;
    //                 }
    //                 .el-form-item--small.el-form-item{
    //                     margin-bottom: 30px;
    //                 }
    //                 .el-input__icon{
    //                     width: 35px;
    //                     font-size: 27px;
    //                     line-height: 47px;
    //                 }
    //                 .el-input--prefix .el-input__inner {
    //                     padding-left: 40px;
    //                 }
    //                 .el-checkbox__label, p{
    //                     color: #999999;
    //                     font-size: 12px;
    //                 }
    //                 .el-input__inner:focus{
    //                     border:1px solid #024c93;
    //                 }
    //                 .el-input__inner:focus + .el-input__prefix{
    //                     .el-input__icon {
    //                         color: #024c93!important;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    // .copyright{
    //     color: #FFF;
    //     position: absolute;
    //     bottom:30px;
    //     width: 100%;
    // }
}
</style>
