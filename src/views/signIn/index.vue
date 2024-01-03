<template>
  <div class="login-container">
    <div class="content-box animate__animated animate__bounceInLeft">
      <div class="box-right">
        <div class="right-login">
          <p class="login-title">{{ $t('login.title') }}</p>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="login-theme" @click="changeCurrentThemeBtn">
                <n-icon>
                  <icon-mdi:theme-light-dark></icon-mdi:theme-light-dark>
                </n-icon>
              </n-button>
            </template>
            <span>{{ $t('login.theme') }}</span>
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="login-language" @click="changeCurrentLanguageBtn">
                <n-icon>
                  <icon-mdi:translate></icon-mdi:translate>
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
                    <n-icon :size="25">
                      <icon-mdi:account></icon-mdi:account>
                    </n-icon>
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
                    <n-icon :size="25">
                      <icon-mdi:lock></icon-mdi:lock>
                    </n-icon>
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
                      maxlength="4"
                      :placeholder="$t('login.inputVerifyCodePlaceholder')"
                      @keydown.enter="submitLoginBtn"
                    >
                      <template #prefix>
                        <n-icon :size="25">
                          <icon-mdi:alphabetical-variant></icon-mdi:alphabetical-variant>
                        </n-icon>
                      </template>
                    </n-input>
                  </n-form-item>
                </div>
                <n-spin :show="verifyImgLoading">
                  <img class="code-img" :src="verifyCodeImg" alt="verifyCode" @click="clickCodeImgBtn" />
                </n-spin>
              </div>
              <n-divider></n-divider>
              <div class="form-tool">
                <n-checkbox class="tool-remember-password" :label="$t('login.rememberPassword')" value="success">
                </n-checkbox>
                <a class="tool-forget-password" href="#">{{ $t('login.forgetPassword') }}</a>
              </div>
              <n-button
                class="form-submit"
                :loading="submitBtnIsLoading"
                type="primary"
                round
                keyboard
                @click="submitLoginBtn"
              >
                {{ $t('login.signInBtn') }}
              </n-button>
            </n-form>
            <div class="other-signIn">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-icon :size="30">
                    <icon-mdi:qrcode></icon-mdi:qrcode>
                  </n-icon>
                </template>
                <span>{{ $t('login.QRSignIn') }}</span>
              </n-tooltip>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-icon :size="30">
                    <icon-mdi:github></icon-mdi:github>
                  </n-icon>
                </template>
                <span>{{ $t('login.githubSignIn') }}</span>
              </n-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 版权信息 -->
    <div class="copyright">Copyright &copy; 2023 Powered by <a href="#">JIAS</a>&trade;</div>
  </div>
</template>

<script lang="ts" setup>
import { FormInst, useMessage } from 'naive-ui';
import { getValidateCode, getAesKey } from '@/api/login/index';
import useUserStore from '@/store/module/user';
import useAppStore from '@/store/module/app';
import { useI18n } from 'vue-i18n';
import { IRes } from '@/interface/common';
import 'animate.css';
import { useRouter } from 'vue-router';

const router = useRouter();

const { locale } = useI18n();
const userStore = useUserStore();
const appStore = useAppStore();
// 获取当前组件实例
const instance = getCurrentInstance()?.appContext;
// let globalProxy = instance.appContext.config.globalProperties;
let globalProxy = instance?.config.globalProperties;

// 响应式变量
let isLoading = $ref<boolean>(false);
let verifyCodeImg = $ref<string>('');
let verifyImgLoading = $ref<boolean>(false);

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
    getAesKey().then((res: IRes) => {
      if (res && res.code === 200) {
        window.sessionStorage.setItem('aesKey', res.data);
      } else {
        window.sessionStorage.setItem('aesKey', '');
      }
    });
  }
};

// 获取验证码
const getCurrentVerifyCode = () => {
  verifyImgLoading = true;
  getValidateCode()
    .then((res: IRes) => {
      if (res && res.code === 200) {
        verifyCodeImg = res.data.base64;
        verifyImgLoading = false;
      } else {
        verifyImgLoading = false;
      }
    })
    .catch(() => {
      verifyImgLoading = false;
    });
};

// 切换当前主题
const changeCurrentThemeBtn = (): void => {
  appStore.setTheme();
};

let currentLanguage = 'zh_CN';

// 切换当前语言
const changeCurrentLanguageBtn = (): void => {
  currentLanguage = currentLanguage === 'zh_CN' ? 'en_US' : 'zh_CN';
  locale.value = currentLanguage;
  appStore.setLanguage(currentLanguage);
};

const clickCodeImgBtn = () => {
  getCurrentVerifyCode();
};

const adminFormData = reactive({
  userName: '',
  password: '',
  verifyCode: ''
});

const adminFormRules = reactive({
  userName: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy?.$t('login.inputUserNamePlaceholder')
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy?.$t('login.inputPasswordPlaceholder')
  },
  verifyCode: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy?.$t('login.inputVerifyCodePlaceholder')
  }
});

const loginForm: any = $ref<FormInst | null>(null);

let submitBtnIsLoading = $ref<boolean>(false);

const submitLoginBtn = (e: MouseEvent) => {
  e.preventDefault();
  loginForm.validate((valid: any) => {
    if (!valid) {
      submitBtnIsLoading = true;
      userStore.userLoginHandle(adminFormData).then(() => {
        router.push('/');
        submitBtnIsLoading = false;
      });
    } else {
      // console.log('验证失败');
    }
  });
  setTimeout(() => {
    submitBtnIsLoading = false;
    // loginForm.resetValidation();
  }, 1000);
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/images/login/login-background-1.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .content-box {
    position: absolute;
    top: 20%;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 30%;
    min-width: 25rem;
    max-width: 28.125rem;
    height: 500px;
    border-top: 2px solid rgba(142, 131, 238, 0.5);
    border-left: 2px solid rgba(142, 131, 238, 0.5);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(142, 131, 238, 0.5);
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
            .n-spin-container {
              width: 35%;
              height: 40px;
              .code-img {
                width: 90%;
                height: 90%;
                cursor: pointer;
              }
            }
          }
          .form-tool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .tool-remember-password :deep(.n-checkbox__label) {
              color: #000 !important;
            }
            .tool-remember-password :deep(.n-checkbox__label):hover {
              color: #5b1ee9 !important;
            }
            .tool-forget-password {
              color: #000;
            }
            .tool-forget-password:hover {
              color: #5b1ee9;
            }
          }
          .form-submit {
            margin-top: 20px;
            width: 100%;
          }
        }
        .other-signIn {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          margin-top: 1.25rem;
          width: 80%;
          svg {
            cursor: pointer;
          }
        }
      }
    }
  }
  .copyright {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}

// 媒体查询响应式页面
@media screen {
}
</style>
