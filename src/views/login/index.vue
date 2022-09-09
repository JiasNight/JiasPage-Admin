<template>
  <div class="login-container">
    <div class="content-box">
      <div class="box-right">
        <div class="right-login">
          <p class="login-title">{{ $t('login.title') }}</p>
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn
                class="login-theme"
                v-bind="props"
                variant="plain"
                icon="mdi-theme-light-dark"
                @click="changeCurrentThemeBtn"
              ></v-btn>
            </template>
            <span>{{ $t('login.theme') }}</span>
          </v-tooltip>
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn
                class="login-language"
                v-bind="props"
                variant="plain"
                icon="mdi-sign-language"
                @click="changeCurrentLanguageBtn"
              ></v-btn>
            </template>
            <span>{{ $t('login.language') }}</span>
          </v-tooltip>
          <div class="login-form">
            <v-container>
              <v-form ref="loginForm">
                <v-text-field
                  v-model="adminForm.userName"
                  required
                  :rules="adminFormRules.userName"
                  :counter="10"
                  :label="$t('login.userName')"
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
                  :label="$t('login.password')"
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
                      prepend-inner-icon="mdi-shield-key"
                      variant="outlined"
                      color="success"
                      density="compact"
                      shaped
                    ></v-text-field>
                  </div>
                  <img class="code-look" :src="verifyCodeImg" alt="verifyCode" @click="getCodeImgBtn" />
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
                <v-btn rounded="pill" color="primary" block :loading="submitBtnIsLoading" @click="submitLoginBtn">
                  登 录
                </v-btn>
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
import { useRouter } from 'vue-router';
import { getValidateCode, userLogin } from '@/api/login/index';
import userStore from '@/store/module/user';
import appStore from '@/store/module/app';

const userConfig = userStore();
const appConfig = appStore();

interface Ires {
  success?: boolean;
  code?: number;
  message?: string;
  timestamp?: string;
  data?: any;
}

const router = useRouter();
let isLoading = $ref<boolean>(false);
let verifyCodeImg = $ref<string>('');

onMounted(() => {
  getValidateCode().then((res: Ires) => {
    if (res && res.code === 200) {
      verifyCodeImg = res.data.base64;
    }
  });
  isLoading = true;
  setTimeout(() => {
    isLoading = false;
  }, 2000);
});

// 切换当前主题
const changeCurrentThemeBtn = (): void => {
  appConfig.setTheme();
};

let currentLanguage = 'zh_CN';

// 切换当前语言
const changeCurrentLanguageBtn = () => {
  currentLanguage = currentLanguage === 'zh_CN' ? 'en_US' : 'zh_CN';
  appConfig.setLanguage(currentLanguage);
};

const getCodeImgBtn = () => {
  getValidateCode().then((res: Ires) => {
    if (res && res.code === 200) {
      verifyCodeImg = res.data.base64;
    }
  });
};

const showPassword = $ref<boolean>(false);

const adminForm = reactive({
  userName: '',
  password: '',
  verifyCode: ''
});

const adminFormRules = reactive({
  userName: [
    (v: string) => !!v || '请输入用户名！',
    (v: string) => v.length >= 3 || '用户名长度太短！',
    (v: string) => v.length < 10 || '用户名长度太长！'
  ],
  password: [
    (v: string) => !!v || '请输入密码！',
    (v: string) => /.+@.+/.test(v) || '密码过于简单了！',
    (v: string) => v.length < 10 || '密码长度太长！'
  ],
  verifyCode: [(v: string) => !!v || '请输入验证码！']
});

const loginForm = $ref(null);

let submitBtnIsLoading = $ref<boolean>(false);

const submitLoginBtn = () => {
  loginForm.validate().then((val: any) => {
    console.log(val.valid);
    if (val.valid) {
      submitBtnIsLoading = true;
      userConfig.userLoginHandle(adminForm);
      // userLogin(adminForm).then((res: any) => {
      //   console.log(res);
      //   // router.push('/');
      // });
    }
  });
  setTimeout(() => {
    submitBtnIsLoading = false;
    loginForm.resetValidation();
  }, 1000);
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100%;
  background-image: url('/src/assets/images/login/login-background.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  .content-box {
    width: 450px;
    height: 500px;
    background: rgba(231, 229, 229, 0.5);
    box-shadow: 5px 5px 5px 0 rgb(182, 179, 179);
    border: 1px solid #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 10px;
    .box-right {
      width: 100%;
      .right-login {
        .login-title {
          font-size: 30px;
          font-weight: 600;
          text-align: center;
          padding: 30px;
        }
        .login-theme {
          position: absolute;
          right: 0;
          top: 0;
        }
        .login-language {
          position: absolute;
          right: 0;
          top: 30px;
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
