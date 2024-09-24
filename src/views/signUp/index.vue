<template>
  <div class="signUp-container">
    <div class="content-box">
      <div class="box-right">
        <div class="right-signUp">
          <p class="signUp-title">{{ $t("signUp.title") }}</p>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="signUp-theme" @click="changeCurrentThemeBtn">
                <n-icon>
                  <icon-mdi:theme-light-dark></icon-mdi:theme-light-dark>
                </n-icon>
              </n-button>
            </template>
            <span>{{ $t("signUp.theme") }}</span>
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button tertiary circle class="signUp-language" @click="changeCurrentLanguageBtn">
                <n-icon>
                  <icon-mdi:language></icon-mdi:language>
                </n-icon>
              </n-button>
            </template>
            <span>{{ $t("signUp.language") }}</span>
          </n-tooltip>
          <div class="signUp-form">
            <n-form
              ref="signUpForm"
              :model="signUpFormData"
              :rules="signUpFormRules"
              label-placement="left"
              label-width="auto"
              size="large"
              require-mark-placement="left"
            >
              <n-form-item path="username">
                <n-input
                  v-model:value="signUpFormData.username"
                  size="large"
                  round
                  clearable
                  :placeholder="$t('signUp.inputUsernamePlaceholder')"
                >
                  <template #prefix>
                    <n-icon>
                      <icon-mdi:user-circle></icon-mdi:user-circle>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="signUpFormData.password"
                  type="password"
                  size="large"
                  clearable
                  round
                  show-password-on="mousedown"
                  :placeholder="$t('signUp.inputPasswordPlaceholder')"
                >
                  <template #prefix>
                    <n-icon>
                      <icon-mdi:password></icon-mdi:password>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-divider></n-divider>
              <div class="form-tool">
                <n-checkbox class="tool-remember-password" :label="$t('signUp.rememberPassword')" value="success">
                </n-checkbox>
                <a class="tool-forget-password" href="#">{{ $t("signUp.forgetPassword") }}</a>
              </div>
              <n-button class="form-submit" :loading="submitBtnIsLoading" type="primary" round @click="submitSignUpBtn">
                {{ $t("signUp.signUpBtn") }}
              </n-button>
            </n-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormInst } from "naive-ui";
import { userSignUp } from "@/api/signIn/index";
import useUserStore from "@/store/module/user";
import useAppStore from "@/store/module/app";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Md5 } from "ts-md5";
import { aesUtil } from "@/utils/common/security";

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
let verifyCodeImg = $ref<string>("");
let verifyImgLoading = $ref<boolean>(false);

onMounted(() => {
  isLoading = true;
  setTimeout(() => {
    isLoading = false;
  }, 2000);
});

// 切换当前主题
const changeCurrentThemeBtn = (): void => {
  useAppStore().setTheme();
};

let currentLanguage = "zh_CN";

// 切换当前语言
const changeCurrentLanguageBtn = (): void => {
  currentLanguage = currentLanguage === "zh_CN" ? "en_US" : "zh_CN";
  locale.value = currentLanguage;
  useAppStore().setLanguage(currentLanguage);
};

const clickCodeImgBtn = () => {};

const signUpFormData = reactive({
  username: "",
  password: "",
});

const signUpFormRules = reactive({
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: globalProxy?.$t("signUp.inputUsernamePlaceholder"),
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: globalProxy?.$t("signUp.inputPasswordPlaceholder"),
  },
});

const signUpForm: any = $ref<FormInst | null>(null);

let submitBtnIsLoading = $ref<boolean>(false);

const submitSignUpBtn = (e: MouseEvent) => {
  e.preventDefault();
  signUpForm.validate((valid: any) => {
    if (!valid) {
      const signUpForm = JSON.parse(JSON.stringify(signUpFormData));
      // 定义MD5对象
      const md5: any = new Md5();
      md5.appendAsciiStr(signUpForm.password);
      const md5Password = md5.end();
      const aesPassword = aesUtil.encrypt(md5Password);
      signUpForm.password = aesPassword;
      submitBtnIsLoading = true;
      userSignUp(signUpForm).then((res: Ires) => {
        if (res && res.code === 200) {
          submitBtnIsLoading = false;
        }
      });
    } else {
      // console.log('验证失败');
    }
  });
  setTimeout(() => {
    submitBtnIsLoading = false;
    // signUpForm.resetValidation();
  }, 1000);
};
</script>

<style lang="scss" scoped>
.signUp-container {
  width: 100vw;
  height: 100vh;
  background-image: url("/src/assets/images/signIn/signIn-background-1.jpg");
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
      .right-signUp {
        .signUp-title {
          padding: 30px;
          font-size: 30px;
          font-weight: 600;
          text-align: center;
        }
        .signUp-theme {
          position: absolute;
          top: 0;
          right: 0;
        }
        .signUp-language {
          position: absolute;
          top: 30px;
          right: 0;
        }
        .signUp-form {
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
