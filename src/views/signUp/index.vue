<template>
  <div class="signIn-container">
    <div class="content-box">
      <div class="box-right">
        <div class="right-signIn">
          <p class="signIn-title">{{ $t('signIn.title') }}</p>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="signIn-theme" @click="changeCurrentThemeBtn">
                <n-icon>
                  <NightlightFilled></NightlightFilled>
                </n-icon>
              </n-button>
            </template>
            <span>{{ $t('signIn.theme') }}</span>
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="signIn-language" @click="changeCurrentLanguageBtn">
                <n-icon>
                  <SignLanguageFilled></SignLanguageFilled>
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
              <n-form-item path="userName">
                <n-input
                  v-model:value="adminFormData.userName"
                  size="large"
                  round
                  clearable
                  :placeholder="$t('signIn.inputUserNamePlaceholder')"
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
                  :placeholder="$t('signIn.inputPasswordPlaceholder')"
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
                      maxlength="4"
                      :placeholder="$t('signIn.inputVerifyCodePlaceholder')"
                    >
                      <template #prefix>
                        <n-icon size="25" :component="PasswordRound" />
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
                <n-checkbox class="tool-remember-password" :label="$t('signIn.rememberPassword')" value="success">
                </n-checkbox>
                <a class="tool-forget-password" href="#">{{ $t('signIn.forgetPassword') }}</a>
              </div>
              <n-button class="form-submit" :loading="submitBtnIsLoading" type="primary" round @click="submitSignInBtn">
                {{ $t('signIn.signInBtn') }}
              </n-button>
            </n-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormInst } from 'naive-ui';
import { SignLanguageFilled, NightlightFilled, PersonOutlineRound, PasswordRound } from '@vicons/material';
import { getValidateCode } from '@/api/signIn/index';
import { getAesKey } from '@/api/app/index';
import useUserStore from '@/store/module/user';
import useAppStore from '@/store/module/app';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { locale } = useI18n();
// 获取当前组件实例
const instance = getCurrentInstance()?.appContext;
// let globalProxy = instance.appContext.config.globalProperties;
let globalProxy = instance?.config.globalProperties;

interface Ires {
  success: boolean;
  code: number;
  message: string;
  timestamp: string;
  data: any;
}

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
    getAesKey().then((res: Ires) => {
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
    .then((res: Ires) => {
      if (res && res.code === 200) {
        verifyCodeImg = res.data;
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
  useAppStore().setTheme();
};

let currentLanguage = 'zh_CN';

// 切换当前语言
const changeCurrentLanguageBtn = (): void => {
  currentLanguage = currentLanguage === 'zh_CN' ? 'en_US' : 'zh_CN';
  locale.value = currentLanguage;
  useAppStore().setLanguage(currentLanguage);
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
      useUserStore()
        .userSignInHandle(adminFormData)
        .then(() => {
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
</script>

<style lang="scss" scoped>
.signIn-container {
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/images/signIn/signIn-background-1.jpg');
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
    border-top: 2px solid rgba(142, 131, 238, 0.5);
    border-left: 2px solid rgba(142, 131, 238, 0.5);
    border-radius: 10px;
    background: rgba(194, 188, 188, 0.5);
    box-shadow: 20px 20px 50px rgba(142, 131, 238, 0.5);
    transform: translate(-50%, -50%);
    backdrop-filter: blur(5px);
    flex-direction: row;
    .box-right {
      width: 100%;
      .right-signIn {
        .signIn-title {
          padding: 30px;
          font-size: 30px;
          font-weight: 600;
          text-align: center;
        }
        .signIn-theme {
          position: absolute;
          top: 0;
          right: 0;
        }
        .signIn-language {
          position: absolute;
          top: 30px;
          right: 0;
        }
        .signIn-form {
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
            margin-top: 20px;
            width: 100%;
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
