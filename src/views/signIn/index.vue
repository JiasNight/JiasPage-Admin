<template>
  <div class="login-container">
    <div class="content-box">
      <div class="box-right">
        <div class="right-login">
          <p class="login-title">{{ $t('login.title') }}</p>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button class="login-theme" @click="changeCurrentThemeBtn">
                <n-icon>
                  <NightlightFilled></NightlightFilled>
                </n-icon>
              </n-button>
            </template>
            <span>{{ $t('login.theme') }}</span>
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button class="login-language" @click="changeCurrentLanguageBtn">
                <n-icon>
                  <SignLanguageFilled></SignLanguageFilled>
                </n-icon>
              </n-button>
            </template>
            <span>{{ $t('login.language') }}</span>
          </n-tooltip>
          <div class="login-form">
            <n-form
              ref="loginForm"
              :model="adminFormData"
              :rules="adminFormRules"
              label-placement="left"
              label-width="auto"
              require-mark-placement="right-hanging"
            >
              <n-form-item :label="$t('login.userName')" path="userName">
                <n-input v-model:value="adminFormData.userName" placeholder="Input" />
              </n-form-item>
              <n-form-item :label="$t('login.password')" path="password">
                <n-input
                  v-model:value="adminFormData.password"
                  type="password"
                  show-password-on="mousedown"
                  placeholder="Input"
                />
              </n-form-item>
              <div class="form-verify-code">
                <div class="code-input">
                  <n-form-item :label="$t('login.verifyCode')" path="verifyCode">
                    <n-input v-model:value="adminFormData.password" placeholder="Input" />
                  </n-form-item>
                </div>
                <img class="code-look" :src="verifyCodeImg" alt="verifyCode" @click="getCodeImgBtn" />
              </div>
              <n-divider></n-divider>
              <div class="form-tool">
                <n-checkbox class="tool-remember-password" :label="$t('login.rememberPassword')" value="success">
                </n-checkbox>
                <a class="tool-forget-password" href="#">{{ $t('login.forgetPassword') }}</a>
              </div>
              <n-button class="form-submit" :loading="submitBtnIsLoading" round @click="submitLoginBtn">
                {{ $t('login.signInBtn') }}
              </n-button>
            </n-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';
import { SignLanguageFilled, NightlightFilled } from '@vicons/material';
import { FormInst, FormItemRule, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import { getValidateCode, userLogin } from '@/api/login/index';
import userStore from '@/store/module/user';
import appStore from '@/store/module/app';
import { useI18n } from 'vue-i18n';

const useUserStore = userStore();
const useAppStore = appStore();
const { locale } = useI18n();

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
  useAppStore.setTheme();
};

let currentLanguage = 'zh_CN';

// 切换当前语言
const changeCurrentLanguageBtn = (): void => {
  currentLanguage = currentLanguage === 'zh_CN' ? 'en_US' : 'zh_CN';
  locale.value = currentLanguage;
  useAppStore.setLanguage(currentLanguage);
};

const getCodeImgBtn = () => {
  getValidateCode().then((res: Ires) => {
    if (res && res.code === 200) {
      verifyCodeImg = res.data.base64;
    }
  });
};

const showPassword = $ref<boolean>(false);

const adminFormData = reactive({
  userName: '',
  password: '',
  verifyCode: ''
});

const adminFormRules = reactive({
  userName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 inputValue'
  }
});

const loginForm: any = $ref<FormInst | null>(null);

let submitBtnIsLoading = $ref<boolean>(false);

const submitLoginBtn = () => {
  loginForm.validate().then((val: any) => {
    console.log(val.valid);
    if (val.valid) {
      submitBtnIsLoading = true;
      useUserStore.userLoginHandle(adminFormData);
      // userLogin(adminFormData).then((res: any) => {
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
  background-image: url('/src/assets/images/login/login-background-1.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .content-box {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    width: 450px;
    height: 500px;
    border: 2px solid #8e44ad;
    border-radius: 10px;
    background: rgba(194, 188, 188, 0.5);
    box-shadow: 5px 3px 7px rgb(142, 131, 238);
    transform: translate(-50%, -50%);
    flex-direction: row;
    .box-right {
      width: 100%;
      .right-login {
        .login-title {
          padding: 30px;
          font-size: 30px;
          font-weight: 600;
          text-align: center;
        }
        .login-theme {
          position: absolute;
          top: 0;
          right: 0;
        }
        .login-language {
          position: absolute;
          top: 30px;
          right: 0;
        }
        .login-form {
          margin: 0 auto;
          width: 75%;
          .form-verify-code {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: flex-start;
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
            justify-content: space-around;
            align-items: center;

            :deep(.v-selection-control--inline) {
              display: flex;
            }
            .tool-remember-password {
              left: 0;
              color: #5b1ee9;
            }
            .tool-remember-password:hover {
              color: #2ecc71;
            }
            .tool-forget-password {
              color: #5b1ee9;
            }
            .tool-forget-password:hover {
              color: #2ecc71;
            }
          }
          .form-submit {
            width: 90%;
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
