import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import { useLogin } from "@/hooks/use-auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login.mutateAsync(data);
      toast.success("Welcome back!");

      const role = (result as any)?.user?.role;
      const email = (result as any)?.user?.email;

      if (role === "admin" || email === "logicguild733@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to log in");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 border-r">
        <div className="mx-auto w-full max-w-sm lg:w-96">

          <div className="flex items-center gap-2 text-2xl font-bold mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
              <Briefcase size={22} />
            </div>
            Opportunity Hub
          </div>

          <h2 className="text-3xl font-bold">
            Sign in to your account
          </h2>

          <p className="mt-2 text-gray-500">
            Access is invite-only.
          </p>

          <div className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="w-full border p-2 rounded"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-1 text-sm">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full border p-2 rounded"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded flex items-center justify-center gap-2"
                disabled={login.isPending}
              >
                {login.isPending ? "Signing in..." : "Sign in"}
                {!login.isPending && <ArrowRight size={18} />}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
