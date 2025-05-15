'use client';

import AuthForm from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";
import { AuthPostSignUp, authSignUpBody } from "@/services";
import { useUI } from "@/context/UIContext";
import { catchException, setUser } from "@/helper";
export default function SignUpPage() {
  const { showLoading, setLoading, showAlert } = useUI();
  const router = useRouter();
  const handleSignUp = async (data: authSignUpBody) => {
    try {
      await showLoading(async ()=> {
        const resp = await AuthPostSignUp(data);
        if(resp.token)
          setUser(resp)
      });
      showAlert({
        type: "success",
        message:
          "User registered successfully! You will be redirected to the dashboard",
      });

      router.push("/dashboard");
    } catch (error) {
      const message = catchException(error);
      showAlert({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthForm
      title="Sign Up"
      Submit={handleSignUp}
      linkText="Already have an account? Log in"
      linkHref="/signin"
      isSignUp={true}
    />
  );
}
