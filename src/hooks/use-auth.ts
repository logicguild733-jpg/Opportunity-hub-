import { supabase } from "@/lib/supabase";

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const { data: result, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      return result;
    },
  });
}
