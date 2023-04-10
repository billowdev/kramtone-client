import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  isAuthenticatedSelector,
  isAuthenticatingSelector,
  userRoleSelector
} from "@/store/slices/auth.slice";
import { isClient } from "@/common/utils/utils";

// eslint-disable-next-line react/display-name
const withAuth = (WrappedComponent: React.FC) => (props: any) => {
  // this hoc only supports client side rendering.
  if (isClient()) {
    const router = useRouter();
    const { route } = router;
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const isAuthenticating = useSelector(isAuthenticatingSelector);
    const userRole = useSelector(userRoleSelector);
 
    // is fetching session (eg. show spinner)
    if (isAuthenticating) {
      return null;
    }

    // If user is not logged in, return login component
    if (route !== "/auth/signin" && route !== "/auth/signup") {
      if (!isAuthenticated) {
        router.push(`/auth/signin`);
        return null;
      } 

      if (route.startsWith("/panel/admin") && userRole !== "admin") {
        router.push(`/404`);
        return null;
      }

 


      // else if (route == "/") {
      //   router.push(`/home`); // default page after login when call root path
      //   return null;
      // }

       // If user is trying to access /panel/admin, validate user role
     

      // if(route === "/panel/admin" && userRole !== "admin") {
      //   router.push(`/404`);
      //   return null;
      // } else if (userRole === "admin") {
      //   router.push(`/panel/admin`);
      //   return null;
      // } else {
      //   router.push(`/`);
      //   return null;
      // }

    } else {
      if (isAuthenticated) {

      


        router.push(`/panel`);
        return null;
      }
    }

    // If user is logged in, return original component
    return <WrappedComponent {...props} />;
  }

  return null;
};

export default withAuth;
