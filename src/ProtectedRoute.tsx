import { Navigate } from "react-router-dom";
import { useAuthMe } from "@/hooks/use-auth";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { data, isLoading } = useAuthMe();

  // 🔄 STILL CHECKING AUTH
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking session...
      </div>
    );
  }

  // ❌ NOT LOGGED IN
  if (!data?.user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ LOGGED IN
  return children;
}
