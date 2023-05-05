<template>
  <div class="login-container">
    <div class="content-box">
      <div class="box-right">
        <div class="right-login">
          <p class="login-title">{{ $t('login.title') }}</p>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="login-theme" @click="changeCurrentThemeBtn">
                <n-icon>
                  <NightlightFilled></NightlightFilled>
                </n-icon>
              </n-button>
            </template>
            <span>{{ $t('login.theme') }}</span>
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="login-language" @click="changeCurrentLanguageBtn">
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
              size="large"
              require-mark-placement="left"
            >
              <n-form-item path="userName">
                <n-input
                  v-model:value="adminFormData.userName"
                  size="large"
                  round
                  clearable
                  :placeholder="$t('login.inputUserNamePlaceholder')"
                >
                  <template #prefix>
                    <n-icon size="25" :component="PersonOutlineRound" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="adminFormData.password"
                  type="password"
                  size="large"
                  clearable
                  round
                  show-password-on="mousedown"
                  :placeholder="$t('login.inputPasswordPlaceholder')"
                >
                  <template #prefix>
                    <n-icon size="25" :component="PasswordRound" />
                  </template>
                </n-input>
              </n-form-item>
              <div class="form-verify-code">
                <div class="code-input">
                  <n-form-item path="verifyCode">
                    <n-input
                      v-model:value="adminFormData.verifyCode"
                      size="large"
                      clearable
                      round
                      :placeholder="$t('login.inputVerifyCodePlaceholder')"
                    />
                  </n-form-item>
                </div>
                <img class="code-img" :src="verifyCodeImg" alt="verifyCode" @click="getCodeImgBtn" />
              </div>
              <n-divider></n-divider>
              <div class="form-tool">
                <n-checkbox class="tool-remember-password" :label="$t('login.rememberPassword')" value="success">
                </n-checkbox>
                <a class="tool-forget-password" href="#">{{ $t('login.forgetPassword') }}</a>
              </div>
              <n-button class="form-submit" :loading="submitBtnIsLoading" type="primary" round @click="submitLoginBtn">
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
import { FormInst } from 'naive-ui';
import { SignLanguageFilled, NightlightFilled, PersonOutlineRound, PasswordRound } from '@vicons/material';
import { useRouter } from 'vue-router';
import { getValidateCode, getAesKey } from '@/api/login/index';
import userStore from '@/store/module/user';
import appStore from '@/store/module/app';
import { useI18n } from 'vue-i18n';

const useUserStore = userStore();
const useAppStore = appStore();
const { locale } = useI18n();
// 获取当前组件实例
const { appContext } = getCurrentInstance();
const globalProxy = appContext.config.globalProperties;

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
  getCurrentAesKey();
  getCurrentVerifyCode();
  isLoading = true;
  setTimeout(() => {
    isLoading = false;
  }, 2000);
});

// 获取加密密钥
const getCurrentAesKey = () => {
  const sessionAesKey = window.sessionStorage.getItem('aesKey');
  if (!sessionAesKey) {
    getAesKey().then((res: Ires) => {
      window.sessionStorage.setItem('aesKey', res.data);
    });
  }
};

// 获取验证码
const getCurrentVerifyCode = () => {
  getValidateCode().then((res: Ires) => {
    if (res && res.code === 200) {
      verifyCodeImg = res.data;
    }
  });
};

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
    message: globalProxy.$t('login.inputUserNamePlaceholder')
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy.$t('login.inputPasswordPlaceholder')
  },
  verifyCode: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy.$t('login.inputVerifyCodePlaceholder')
  }
});

const loginForm: any = $ref<FormInst | null>(null);

let submitBtnIsLoading = $ref<boolean>(false);

const submitLoginBtn = (e: MouseEvent) => {
  e.preventDefault();
  loginForm.validate((valid: any) => {
    if (!valid) {
      submitBtnIsLoading = true;
      useUserStore.userLoginHandle(adminFormData);
    } else {
      console.log('验证失败');
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
  height: 100vh;
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
    border-radius: 10px;
    background: rgba(194, 188, 188, 0.5);
    box-shadow: 20px 20px 50px rgba(142, 131, 238, 0.5);
    transform: translate(-50%, -50%);
    border-top: 2px solid rgba(142, 131, 238, 0.5);
    border-left: 2px solid rgba(142, 131, 238, 0.5);
    backdrop-filter: blur(5px);
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
          width: 80%;
          .form-verify-code {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: flex-start;
            .code-input {
              width: 62%;
            }
            .code-img {
              width: 35%;
              height: 40px;
              cursor: pointer;
            }
          }
          .form-tool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .tool-remember-password :deep(.n-checkbox__label) {
              color: #5b1ee9 !important;
            }
            .tool-remember-password :deep(.n-checkbox__label):hover {
              color: #2ecc71 !important;
            }
            .tool-forget-password {
              color: #5b1ee9;
            }
            .tool-forget-password:hover {
              color: #2ecc71;
            }
          }
          .form-submit {
            width: 100%;
            margin-top: 20px;
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
