import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { adminToken } from "../ts/cookie";
import { getPageTitle } from "../ts/util";

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

const getToken = (): string => {
  return adminToken.get();
};

router.beforeEach((to, from, next) => {
  // set page title
  const title: any = to.meta.title || "";
  document.title = getPageTitle(title);
  // path auth
  if (to.meta.auth) {
    const hasToken = getToken();
    if (!hasToken) {
      next(`/login?redirect=${to.path}`);
    }
  }
  next();
});

router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

export default router;
