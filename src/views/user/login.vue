<template>
  <div class="login-Module">
    <div class="bg-base">
      <div class="bg-top">
        <div class="login-main">
          <div class="title">用户登录</div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="userName">
              <el-input
                ref="userName"
                v-model="loginForm.userName"
                placeholder="请输入用户名"
                name="userName"
                type="text"
                tabindex="1"
                auto-complete="on"
              >
                <span slot="prefix" class="svg-container flcc">
                  <svg-icon icon-class="user" />
                </span>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
              >
                <span slot="prefix" class="svg-container flcc">
                  <svg-icon icon-class="password" />
                </span>
                <span slot="suffix" class="show-pwd flcc" @click="showPwd">
                  <svg-icon :icon-class=" passwordType === 'password' ? 'eye' : 'eye-open' " />
                </span>
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <div class="flsb captcha-box">
                <div>
                  <el-input
                    ref="captcha"
                    v-model="loginForm.captcha"
                    type="text"
                    placeholder="请输入验证码"
                    name="captcha"
                    tabindex="3"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                  />
                </div>
                <div class="flcc green verification" @click="handleChangeCheckCode">
                  <el-image :src="randCodeImage">
                    <img slot="error" width="100%" height="100%" src="@/assets/404_images/checkcode.png" alt="加载失败">
                  </el-image>
                </div>
              </div>
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;height:48px;border-radius: 6px;" @click.native.prevent="handleLogin">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { handleChangeCheckCode } from '@/api/login'
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
                password: '123456',
                captcha: null,
                checkKey: ''
            },
            loginRules: {
                userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, rigger: 'blur', validator: validatePassword }],
                captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            currdatetime: '',
            randCodeImage: ''// 验证码

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
    created() {
        this.loginForm.checkKey = Date.now() // 生成页面初始时间
        this.handleChangeCheckCode()
    },
    activated() {
        this.loginForm.checkKey = Date.now()
    },
    methods: {
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
                    this.$store.dispatch('user/login', this.loginForm).then(res => {
                        this.$s.setStorage('userInfo', res)
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

        // 调用后端生成验证码
        handleChangeCheckCode() {
            handleChangeCheckCode().then(res => {
                if (res.success) {
                    this.randCodeImage = res.result
                } else {
                    this.$message.error(res.message)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-Module {
    width: 480px;
    height: 500px;
    .bg-base {
        width: 480px;
        height: 380px;
        border-radius: 16px;
        background-color: rgba(255, 255, 255, 0.2);
        position: relative;
    }
    .bg-top {
        position: absolute;
        width: 440px;
        left: 20px;
        top: -30px;
        height: 440px;
        background: #ffffff;
        box-shadow: 0px 2px 13px 0px rgba(26, 25, 206, 0.69);
        border-radius: 16px;
        background-color: rgba(255, 255, 255, 0.2);
        z-index: 100;
    }
    .login-main {
        position: absolute;
        width: 400px;
        height: 500px;
        left: 20px;
        top: -30px;
        background-color: #fff;
        padding: 56px 24px 0;
        z-index: 1000;
        box-shadow: 0px 4px 10px 0px rgba(26, 25, 206, 0.73);
        .title {
            color: #6666ff;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 32px;
        }
        .login-form {
            //表单设置
            .svg-container {
                width: 43px;
                height: 100%;
                font-size: 20px;
                position: relative;
                &::before {
                    content: "";
                    position: absolute;
                    width: 1px;
                    height: 20px;
                    right: 0;
                    background: #e0e4eb;
                }
            }
            .show-pwd {
                width: 30px;
                height: 100%;
            }
            .captcha-box {
                > div {
                    &:first-of-type {
                        width: 180px;
                    }
                    &:last-of-type {
                        width: 150px;
                        height: 48px;
                        .el-image{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            ::v-deep {
                .el-input input {
                    height: 48px;
                    line-height: 48px;
                    border-color: #e0e4eb;
                }
                .el-input--prefix .el-input__inner {
                    //输入框样式
                    padding-left: 64px;
                }
                .el-form-item {
                    //每一列间隙
                    margin-bottom: 24px;
                }
            }
        }
    }
}
</style>
