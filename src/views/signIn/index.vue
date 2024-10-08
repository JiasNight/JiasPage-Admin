<template>
  <div class="signIn-container">
    <div class="content-wrapper animate__animated animate__bounceInLeft">
      <div class="wrapper-signIn">
        <p class="signIn-title">{{ $t("signIn.title") }}</p>
        <q-btn
          class="signIn-theme"
          color="ghost"
          round
          size="xs"
          :icon="mdiThemeLightDark"
          @click="changeCurrentThemeBtn"
        >
          <q-tooltip> {{ $t("signIn.theme") }} </q-tooltip>
        </q-btn>
        <q-btn
          class="signIn-language"
          color="ghost"
          round
          size="xs"
          :icon="mdiTranslate"
          @click="changeCurrentLanguageBtn"
        >
          <q-tooltip> {{ $t("signIn.language") }} </q-tooltip>
        </q-btn>
        <div class="signIn-form">
          <q-form ref="signInFormRef" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false">
            <q-input
              v-model="adminFormData.username"
              class="form-item"
              :label="$t('signIn.userName')"
              :placeholder="$t('signIn.inputUsernamePlaceholder')"
              filled
              clearable
              lazy-rules
              :rules="[(val: string) => (val && val.length > 0) || $t('signIn.inputUsernamePlaceholder')]"
            >
              <template #prepend>
                <q-icon :name="mdiAccount" />
              </template>
            </q-input>
            <q-input
              v-model="adminFormData.password"
              class="form-item"
              :type="isPwd ? 'password' : 'text'"
              :label="$t('signIn.password')"
              :placeholder="$t('signIn.inputPasswordPlaceholder')"
              filled
              clearable
              lazy-rules
              :rules="[(val: string) => (val && val.length > 0) || $t('signIn.inputPasswordPlaceholder')]"
            >
              <template #prepend>
                <q-icon :name="mdiAccountKey" />
              </template>
              <template #append>
                <q-icon class="c-p" :name="isPwd ? mdiEye : mdiEyeOff" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <div class="form-verify-code">
              <div class="code-input">
                <q-input
                  v-model="adminFormData.verifyCode"
                  :label="$t('signIn.verifyCode')"
                  :placeholder="$t('signIn.inputVerifyCodePlaceholder')"
                  filled
                  clearable
                  lazy-rules
                  :rules="[(val: string) => (val && val.length > 0) || $t('signIn.inputVerifyCodePlaceholder')]"
                  @keyup.enter="submitSignInBtn"
                >
                  <template #prepend>
                    <q-icon :name="mdiAlphabeticalVariant" />
                  </template>
                </q-input>
              </div>
              <div class="code-img">
                <q-spinner-ios v-if="verifyImgLoading" color="primary" size="3em" />
                <img v-else :src="verifyCodeImg" alt="verifyCode" @click="clickCodeImgBtn" />
              </div>
            </div>
            <p class="form-driver"></p>
            <div class="form-tools">
              <q-checkbox
                v-model="isRememberPassword"
                class="tool-remember-password"
                :label="$t('signIn.rememberPassword')"
              />
              <a class="tool-forget-password" href="#">{{ $t("signIn.forgetPassword") }}</a>
            </div>
            <q-btn
              class="form-submit"
              :label="$t('signIn.signInBtn')"
              color="primary"
              :loading="submitBtnIsLoading"
              rounded
              @click="submitSignInBtn"
            ></q-btn>
          </q-form>
          <div class="other-signIn">
            <q-icon color="ghost" round size="md" :name="mdiQrcode">
              <q-tooltip> {{ $t("signIn.QRSignIn") }} </q-tooltip>
            </q-icon>
            <q-icon color="ghost" round size="md" :name="mdiGithub">
              <q-tooltip> {{ $t("signIn.githubSignIn") }} </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </div>
    <!-- 版权信息 -->
    <div class="copyright">Copyright &copy; 2024 Powered by <a href="#">JIAS</a>&trade;</div>
  </div>
</template>

<script lang="ts" setup>
import {
  mdiAccount,
  mdiAccountKey,
  mdiAlphabeticalVariant,
  mdiEye,
  mdiEyeOff,
  mdiThemeLightDark,
  mdiTranslate,
  mdiQrcode,
  mdiGithub,
} from "@quasar/extras/mdi-v6";
import { getValidateCode } from "@/api/signIn/index";
import useUserStore from "@/store/module/user";
import useAppStore from "@/store/module/app";
import { useI18n } from "vue-i18n";
import { IRes } from "@/interface/common";
import "animate.css";
import { useRouter } from "vue-router";

const router = useRouter();

const { locale } = useI18n();
const userStore = useUserStore();
const appStore = useAppStore();
// 获取当前组件实例
const instance = getCurrentInstance()?.appContext;
// let globalProxy = instance.appContext.config.globalProperties;
let globalProxy = instance?.config.globalProperties;

// 响应式变量
let verifyCodeImg = $ref<string>("");
let verifyImgLoading = $ref<boolean>(false);

// 获取验证码
const getCurrentVerifyCode = () => {
  verifyImgLoading = true;
  getValidateCode()
    .then((res: IRes) => {
      if (res && res.code === 200) {
        verifyCodeImg = res.data.base64;
        const safe = res.data.safe;
        localStorage.setItem("safe", safe);
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
  // appStore.setTheme();
};

let currentLanguage = "zh_CN";

// 切换当前语言
const changeCurrentLanguageBtn = (): void => {
  currentLanguage = currentLanguage === "zh_CN" ? "en_US" : "zh_CN";
  locale.value = currentLanguage;
  // appStore.setLanguage(currentLanguage);
};

const clickCodeImgBtn = () => {
  getCurrentVerifyCode();
};

const adminFormData = reactive({
  username: "",
  password: "",
  verifyCode: "",
});

const adminFormRules = reactive({
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: globalProxy?.$t("signIn.inputUsernamePlaceholder"),
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: globalProxy?.$t("signIn.inputPasswordPlaceholder"),
  },
  verifyCode: {
    required: true,
    trigger: ["blur", "input"],
    message: globalProxy?.$t("signIn.inputVerifyCodePlaceholder"),
  },
});

const signInFormRef: any = $ref<null>(null);

let isPwd: boolean = $ref(true);

let submitBtnIsLoading = $ref<boolean>(false);

let isRememberPassword: Boolean = $ref(false);

const submitSignInBtn = (e: Event) => {
  e.preventDefault();
  signInFormRef.validate().then((valid: any) => {
    if (valid) {
      // 是的，模型是正确的
      submitBtnIsLoading = true;
      userStore.userSignInHandler(adminFormData).then(() => {
        router.push("/");
        submitBtnIsLoading = false;
      });
    } else {
      // 哦，不，用户至少
      // 填写了一个无效值
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
  background-image: url("/src/assets/images/signIn/signIn-background-1.jpg");
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
    height: 34.375rem;
    border-top: 2px solid rgb(99 91 236 / 50%);
    border-left: 2px solid rgb(99 91 236 / 50%);
    border-radius: 10px;
    background: rgb(255 255 255 / 10%);
    box-shadow: 0 0 10px rgb(99 91 236 / 50%);
    backdrop-filter: blur(5px);

    .wrapper-signIn {
      position: relative;
      width: 100%;

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

        .form-item {
          margin-bottom: 0.625rem;
        }

        .form-verify-code {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          height: 100%;
          flex-direction: row;

          .code-input {
            width: calc(100% - 6.25rem - 10px);
          }

          .code-img {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 6.25rem;
            height: 3.5rem;
            cursor: pointer;
            flex-direction: row;

            img {
              width: 100%;
              height: 100%;
              border-radius: 0.125rem;
            }
          }
        }

        .form-driver {
          margin: 10px auto;
          width: 90%;
          height: 1px;
          border: 1px solid #f5f6fa0f;
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
