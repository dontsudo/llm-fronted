import { createRouter, createWebHistory } from "vue-router";
import LandingLayout from "@/layouts/LandingLayout.vue";
import Landing from "@/views/Landing.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthSignIn from "@/views/AuthSignIn.vue";
import AuthSignUp from "@/views/AuthSignUp.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import AppSetting from "@/views/AppSetting.vue";
import ProjectLayout from "@/layouts/ProjectLayout.vue";
import ProjectMain from "@/views/ProjectMain.vue";
import ProjectPrompt from "@/views/ProjectPrompt.vue";
import ProjectTable from "@/views/ProjectTable.vue";
import ProjectSetting from "@/views/ProjectSetting.vue";
import LibraryMain from "@/views/LibraryMain.vue";
import NotFound from "@/views/NotFound.vue";
import { getUserProfile } from "@/services/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LandingLayout,
      children: [
        {
          path: "",
          component: Landing,
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "sign-in",
          component: AuthSignIn,
        },
        {
          path: "sign-up",
          component: AuthSignUp,
        },
      ],
    },
    {
      path: "/app",
      component: AppLayout,
      children: [
        {
          path: "",
          redirect: "/app/dashboard",
        },
        {
          path: "dashboard",
          component: ProjectMain,
        },
        {
          path: "projects/:id",
          component: ProjectLayout,
          children: [
            {
              path: "",
              redirect: "prompt",
            },
            {
              path: "prompt",
              component: ProjectPrompt,
            },
            {
              path: "table",
              component: ProjectTable,
            },
            {
              path: "setting",
              component: ProjectSetting,
            },
          ],
        },
        {
          path: "library",
          children: [
            {
              path: "",
              component: LibraryMain,
            },
          ],
        },
        {
          path: "setting",
          component: AppSetting,
        },
        {
          // not found handler
          path: "/:pathMatch(.*)*",
          component: NotFound,
        },
      ],
    },
  ],
});

const checkUserProfile = async () => {
  try {
    await getUserProfile();
    return true; // 사용자가 로그인한 상태
  } catch (error) {
    return false; // 사용자가 로그인하지 않은 상태
  }
};

router.beforeEach(async (to) => {
  const isUserLoggedIn = await checkUserProfile();
  if (to.path.startsWith("/app") && !isUserLoggedIn) {
    // '/app' 경로에 대해 사용자가 로그인하지 않았을 경우
    return "/auth/sign-in";
  } else if (to.path.startsWith("/auth") && isUserLoggedIn) {
    // '/auth' 경로에 대해 사용자가 이미 로그인한 경우
    return "/app/dashboard";
  }
  // 그 외의 경우, 특별한 리다이렉트 없이 라우트 진행
});

export default router;
