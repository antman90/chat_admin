<script setup lang="ts">
import { login } from "../ts/api";
import { adminToken, wsName } from "../ts/cookie";
import { useRoute, useRouter } from "vue-router";
import { siteName } from "../ts/config";
import { useUserStore } from "../store/user";

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();
const redirect = route.query.redirect || "/";

const userName = ref("");
const password = ref("");
const loginFn = () => {
  login({ userName: userName.value, password: password.value }).then((res) => {
    if (!res) return;
    adminToken.set(res.token, res.expires);
    wsName.set(res.wsName, res.expires);
    userStore.updateWsName(res.wsName);
    router.push({ path: redirect.toString() });
  });
};
</script>

<template>
  <div class="m-login-wrap">
    <div class="m-login">
      <h1 class="m-login-title">{{ siteName }}</h1>
      <div class="m-login-input-wrap">
        <input type="text" v-model="userName" placeholder="ID를 입력하세요." />
        <input
          type="password"
          v-model="password"
          placeholder="비밀번호를 입력하세요."
          @keyup.enter="loginFn"
        />
        <el-button type="primary" @click="loginFn">로그인</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.m-login-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--themeColor);
}

.m-login {
  position: absolute;
  width: 400px;
  left: 50%;
  top: 30%;
  margin-left: -200px;
}

.m-login-title {
  font-size: 30px;
  color: #fff;
  text-align: center;
}

.m-login-input-wrap {
  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding: 20px;

  input {
    width: 100%;
    height: 34px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    text-indent: 0.5em;
  }

  button {
    width: 100%;
    height: 34px;
    background-color: var(--themeColor);
    color: #fff;
  }
}
</style>
