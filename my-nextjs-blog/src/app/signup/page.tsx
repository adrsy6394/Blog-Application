import SignupForm from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-500 tracking-tight">BlogApp</h1>
      </div>
      <SignupForm />
    </div>
  );
}
