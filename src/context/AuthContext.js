import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { auth, db } from "../firebase/firebaseConfig";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["userId", "userInfo"]);

  useEffect(() => {
    if (user) {
      setCookie(
        "userId",
        {
          id: user?.uid,
        },
        { path: "/" }
      );
    }
  }, [user]);

  useEffect(() => {
    async function fetchUser() {
      if (cookies.userId) {
        const docRef = doc(db, "users", cookies?.userId?.id);
        const singleDoc = await getDoc(docRef);
        const data = singleDoc.data();
        setCookie(
          "userInfo",
          {
            email: data?.email,
            password: data?.password,
          },
          { path: "/" }
        );
      }
    }
    fetchUser();
  }, [cookies?.userId?.id]);

  useEffect(() => {
    if (cookies?.userInfo?.email) {
      async function logIn() {
        try {
          await signInWithEmailAndPassword(
            auth,
            cookies.userInfo.email,
            cookies.userInfo.password
          );
          onAuthStateChanged(auth, (user) => {
            setUser(user);
          });
          //   console.log(user);
        } catch (error) {
          console.log(error);
        }
      }
      logIn();
    }
  }, [cookies?.userInfo?.email, cookies?.userInfo?.password]);
  const value = [user, setUser];

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") throw new Error("log");
  return context;
}

export { AuthProvider, useAuth };
