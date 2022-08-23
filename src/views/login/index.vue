<template>
  <div class="login-container">
    <div class="content-box">
      <div v-loading="isLoading" v-ripple class="box-left text-center elevation-2 pa-12 text-h5">
        <!-- <img src="https://picsum.photos/id/11/500/300" alt="" />
        <br />
        <br />
        <p>
          如果你拥有别人没有的，知道别人不知道的，会做别人不会做的，请准备好：别人都会来批评你。如果想杜绝批评，那你不妨做一个无脑无能无言无为的人
        </p> -->
      </div>
      <div class="box-right">
        <div class="right-login">
          <p class="login-title">标题</p>
          <div class="login-form">
            <v-container>
              <v-form>
                <v-text-field
                  v-model="adminForm.userName"
                  required
                  :rules="adminFormRules.userName"
                  :counter="10"
                  label="登录账户"
                  prepend-inner-icon="mdi-account-lock"
                  variant="outlined"
                  color="success"
                  density="compact"
                  shaped
                >
                </v-text-field>
                <v-text-field
                  v-model="adminForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  required
                  :rules="adminFormRules.password"
                  :counter="10"
                  label="登录密码"
                  prepend-inner-icon="mdi-account-key"
                  variant="outlined"
                  color="success"
                  density="compact"
                  shaped
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
                <div class="form-verify-code">
                  <div class="code-input">
                    <v-text-field
                      v-model="adminForm.verifyCode"
                      required
                      :rules="adminFormRules.verifyCode"
                      :counter="4"
                      label="验证码"
                      prepend-inner-icon="mdi-barcode-scan"
                      variant="outlined"
                      color="success"
                      density="compact"
                      shaped
                    ></v-text-field>
                  </div>
                  <img class="code-look" src="https://picsum.photos/id/11/500/300" alt="verifyCode" />
                </div>
                <v-divider></v-divider>
                <div class="form-tool">
                  <v-checkbox
                    class="tool-remember-password"
                    label="记住密码"
                    color="orange"
                    value="success"
                    hide-details
                  >
                  </v-checkbox>
                  <a class="tool-forget-password" href="#">忘记密码？</a>
                </div>
                <v-btn rounded="pill" color="primary" block> <span>登 录</span></v-btn>
              </v-form>
            </v-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';
const isLoading = $ref(true);
const firstname = $ref('');
const lastname = $ref('');
const email = $ref('');

const adminForm = reactive({
  userName: '',
  password: '',
  verifyCode: ''
});

const adminFormRules = reactive({
  userName: [(v: any) => !!v || '请输入用户名！', (v: any) => v.length <= 3 || '用户名长度太短！'],
  password: [(v: any) => !!v || '请输入密码！', (v: any) => /.+@.+/.test(v) || '密码过于简单了！'],
  verifyCode: [(v: any) => !!v || '请输入验证码！']
});

const showPassword = $ref(false);
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100%;
  // background-image: url('/src/assets/images/admin/login/spring.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .content-box {
    width: 900px;
    height: 550px;
    background: rgba(248, 248, 248, 1);
    box-shadow: 5px 5px 5px 0 rgb(185, 182, 182);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 10px;
    .box-left {
      width: 45%;
      height: 100%;
      border-right: 2px solid rgb(158, 150, 150);
      img {
        height: 50%;
      }
      p {
        height: 50%;
        text-indent: 2em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: wrap;
      }
    }
    .box-right {
      width: 55%;
      .right-login {
        .login-title {
          font-size: 25px;
          font-weight: 600;
          text-align: center;
          padding: 30px;
        }
        .login-form {
          width: 75%;
          margin: 0 auto;
          .form-verify-code {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            .code-input {
              width: 60%;
            }
            .code-look {
              width: 35%;
              height: 40px;
              cursor: pointer;
            }
          }
          .form-tool {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            .tool-remember-password {
              color: #2ecc71;
            }
            .tool-remember-password:hover {
              color: #ffa502;
            }
            .tool-forget-password {
              color: #2ecc71;
            }
            .tool-forget-password:hover {
              color: #ffa502;
            }
          }
        }
      }
    }
  }
}

// 媒体查询响应式页面
@media screen {
}
</style>
