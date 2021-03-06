import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const CategoryAddNew = lazy(() => import("./module/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const CategoryUpdate = lazy(() => import("./module/category/CategoryUpdate"));
const DashboardLayout = lazy(() =>
  import("./module/dashboard/DashboardLayout")
);
const PostAddNew = lazy(() => import("./module/post/PostAddNew"));
const PostManage = lazy(() => import("./module/post/PostManage"));
const PostUpdate = lazy(() => import("./module/post/PostUpdate"));
const UserAddNew = lazy(() => import("./module/user/UserAddNew"));
const UserEdit = lazy(() => import("./module/user/UserEdit"));
const UserManage = lazy(() => import("./module/user/UserManage"));
const UserProfile = lazy(() => import("./module/user/UserProfile"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));

function App() {
  return (
    <div>
      <Suspense fallback={<></>}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/post"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/edit-post/:postId"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/edit-category/:docId"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/edit-user/:userId"
                element={<UserEdit></UserEdit>}
              ></Route>
              <Route
                path="/profile/:userId"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </div>
  );
}

export default App;
