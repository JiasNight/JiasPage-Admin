<template>
  <div class="login-container">
    <div class="content-box">
      <div class="box-left"></div>
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
                  required
                  :rules="adminFormRules.password"
                  :counter="10"
                  label="登录密码"
                  prepend-inner-icon="mdi-account-key"
                  variant="outlined"
                  color="success"
                  density="compact"
                  shaped
                ></v-text-field>
                <v-divider></v-divider>
                <div class="form-tool">
                  <span>
                    <v-checkbox label="记住密码" color="orange" value="success" hide-details></v-checkbox>
                  </span>
                  <span>忘记密码？</span>
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
const valid = $ref(false);
const firstname = $ref('');
const lastname = $ref('');
const email = $ref('');

const adminForm = reactive({
  userName: '',
  password: ''
});

const adminFormRules = reactive({
  userName: [(v: any) => !!v || '请输入用户名！', (v: any) => v.length <= 3 || '用户名长度太短！'],
  password: [(v: any) => !!v || '请输入密码！', (v: any) => /.+@.+/.test(v) || '密码过于简单了！']
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100%;
  // background-image: url('/src/assets/images/admin/login/autumn.jpg');
  background-repeat: no-repeat;
  background-position: center;
  .content-box {
    width: 1000px;
    height: 550px;
    background-color: rgb(50, 132, 199);
    box-shadow: 10px 10px 10px 0 rgb(158, 153, 153);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-items: center;
    border-radius: 5px;
    .box-left {
      width: 45%;
      height: 100%;
      border-right: 2px solid rgb(158, 150, 150);
    }
    .box-right {
      width: 55%;
      .right-login {
        .login-title {
          font-size: 25px;
          font-weight: 600;
          text-align: center;
          padding: 20px;
        }
        .login-form {
          width: 75%;
          margin: 0 auto;
          margin-top: 30px;
          .form-tool {
            display: flex;
            flex-direction: row;
            align-content: space-between;
            justify-items: center;
          }
        }
      }
    }
  }
}
</style>
