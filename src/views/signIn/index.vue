<template>
  <div class="signIn-container">
    <div class="content-wrapper animate__animated animate__bounceInLeft">
      <div class="wrapper-signIn">
        <p class="signIn-title">{{ $t('signIn.title') }}</p>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button tertiary circle class="signIn-theme" @click="changeCurrentThemeBtn">
              <n-icon>
                <icon-mdi:theme-light-dark></icon-mdi:theme-light-dark>
              </n-icon>
            </n-button>
          </template>
          <span>{{ $t('signIn.theme') }}</span>
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button tertiary circle class="signIn-language" @click="changeCurrentLanguageBtn">
              <n-icon>
                <icon-mdi:translate></icon-mdi:translate>
              </n-icon>
            </n-button>
          </template>
          <span>{{ $t('signIn.language') }}</span>
        </n-tooltip>
        <div class="signIn-form">
          <n-form
            ref="signInForm"
            :model="adminFormData"
            :rules="adminFormRules"
            label-placement="left"
            label-width="auto"
            size="large"
            require-mark-placement="left"
          >
            <n-form-item path="username">
              <n-input
                v-model:value="adminFormData.username"
                size="large"
                round
                clearable
                :placeholder="$t('signIn.inputUserNamePlaceholder')"
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
                round
                show-password-on="mousedown"
                :placeholder="$t('signIn.inputPasswordPlaceholder')"
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
                    :placeholder="$t('signIn.inputVerifyCodePlaceholder')"
                    @keydown.enter="submitSignInBtn"
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
            <div class="form-tools">
              <n-checkbox class="tool-remember-password" :label="$t('signIn.rememberPassword')" value="success">
              </n-checkbox>
              <a class="tool-forget-password" href="#">{{ $t('signIn.forgetPassword') }}</a>
            </div>
            <n-button
              class="form-submit"
              :loading="submitBtnIsLoading"
              type="primary"
              round
              keyboard
              @click="submitSignInBtn"
            >
              {{ $t('signIn.signInBtn') }}
            </n-button>
          </n-form>
          <div class="other-signIn">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon :size="30">
                  <icon-mdi:qrcode></icon-mdi:qrcode>
                </n-icon>
              </template>
              <span>{{ $t('signIn.QRSignIn') }}</span>
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon :size="30">
                  <icon-mdi:github></icon-mdi:github>
                </n-icon>
              </template>
              <span>{{ $t('signIn.githubSignIn') }}</span>
            </n-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!-- 版权信息 -->
    <div class="copyright">Copyright &copy; 2024 Powered by <a href="#">JIAS</a>&trade;</div>
  </div>
</template>

<script lang="ts" setup>
import { FormInst, useMessage } from 'naive-ui';
import { getValidateCode } from '@/api/signIn/index';
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
let verifyCodeImg = $ref<string>('');
let verifyImgLoading = $ref<boolean>(false);

// 获取验证码
const getCurrentVerifyCode = () => {
  verifyImgLoading = true;
  getValidateCode()
    .then((res: IRes) => {
      if (res && res.code === 200) {
        verifyCodeImg = res.data.base64;
        const safe = res.data.safe;
        localStorage.setItem('safe', safe);
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
  username: '',
  password: '',
  verifyCode: ''
});

const adminFormRules = reactive({
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy?.$t('signIn.inputUserNamePlaceholder')
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy?.$t('signIn.inputPasswordPlaceholder')
  },
  verifyCode: {
    required: true,
    trigger: ['blur', 'input'],
    message: globalProxy?.$t('signIn.inputVerifyCodePlaceholder')
  }
});

const signInForm: any = $ref<FormInst | null>(null);

let submitBtnIsLoading = $ref<boolean>(false);

const submitSignInBtn = (e: MouseEvent) => {
  e.preventDefault();
  signInForm.validate((valid: any) => {
    if (!valid) {
      submitBtnIsLoading = true;
      userStore.userSignInHandler(adminFormData).then(() => {
        router.push('/');
        submitBtnIsLoading = false;
      });
    } else {
      // console.log('验证失败');
    }
  });
  setTimeout(() => {
    submitBtnIsLoading = false;
    // signInForm.resetValidation();
  }, 1000);
};

// 挂载之前
onBeforeMount(() => {});

onMounted(() => {
  getCurrentVerifyCode();
});
</script>

<style lang="scss" scoped>
.signIn-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/images/signIn/signIn-background-1.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .content-wrapper {
    position: absolute;
    top: 20%;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 auto;
    width: 30%;
    min-width: 25rem;
    max-width: 28.125rem;
    height: 500px;
    border-top: 2px solid rgba(99, 91, 236, 0.5);
    border-left: 2px solid rgba(99, 91, 236, 0.5);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(99, 91, 236, 0.5);
    backdrop-filter: blur(5px);

    .wrapper-signIn {
      width: 100%;
      position: relative;
      .signIn-title {
        padding: 1.875rem;
        font-size: 1.875rem;
        font-weight: 600;
        text-align: center;
        color: #fff;
      }
      .signIn-theme {
        position: absolute;
        top: 0;
        right: 0;
      }
      .signIn-language {
        position: absolute;
        top: 1.875rem;
        right: 0;
      }
      .signIn-form {
        padding: 0 3.125rem;
        .form-verify-code {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: flex-start;
          .code-input {
            width: 60%;
          }
          .n-spin-container {
            width: 35%;
            height: 2.5rem;
            .code-img {
              width: 95%;
              height: 90%;
              cursor: pointer;
            }
          }
        }
        .form-tools {
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
          // background-color: #5b1ee9;
          // border-color: #5b1ee9 !important;
          // &:hover {
          //   background-color: #4a1bb5;
          // }
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
