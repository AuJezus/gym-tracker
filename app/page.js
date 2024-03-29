import AuthForm from "@/components/auth-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="row max-w-xl mx-auto mt-12">
      <div className="col-6">
        <h1 className="header">Supabase Auth + Storage</h1>
        <p>
          Experience our Auth and Storage through a simple profile management
          example. Create a user profile and upload an avatar image. Fast,
          simple, secure.
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}
