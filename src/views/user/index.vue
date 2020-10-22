<template>
  <div class="loginlayut green fl-y-sb">
    <div class="loginlayut-top flcc"> 人材培养管理系统 </div>
    <div class="fl1 fle">
      <div class="loginlayut-module flcc">
        <router-view />
      </div>
    </div>
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
.loginlayut{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../../assets/imgs/login/login.png') no-repeat;
    background-size: cover;
    &-top{
        height: 56px;
        margin-top: 64px;
        font-size:40px;
        font-weight: 600;
        color: #FFF;
    }
    &-module{
        width: 50%;
        min-width: 400px;
        min-height: 500px;
    }
}
</style>
