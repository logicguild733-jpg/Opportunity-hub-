import { useQuery } from "@tanstack/react-query";
import { supabase } from "./lib/supabase"; // ✅ make sure path is correct

export interface LeadUsage {
  plan: string;
  unlock_limit: number | null;
}

export interface LeadsResponse {
  leads: any[];
  usage: LeadUsage;
  message?: string;
}

export function useLeads() {
  return useQuery<LeadsResponse>({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .limit(20);

      if (error) {
        console.error(error);
        throw new Error("Failed to fetch leads");
      }

      return {
        leads: data || [],
        usage: {
          plan: "free",
          unlock_limit: 10,
        },
      };
    },
  });
}

export function useAllLeads() {
  return useQuery<LeadsResponse>({
    queryKey: ["all-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*");

      if (error) throw new Error("Failed to fetch all leads");

      return {
        leads: data || [],
        usage: {
          plan: "admin",
          unlock_limit: null,
        },
      };
    },
  });
}

export function useLeadUsage() {
  return useQuery<LeadUsage>({
    queryKey: ["lead-usage"],
    queryFn: async () => {
      return {
        plan: "free",
        unlock_limit: 10,
      };
    },
  });
}

export function useLeadSuggestions() {
  return useQuery({
    queryKey: ["lead-suggestions"],
    queryFn: async () => {
      return {
        suggestions: [],
        skill: "",
        location: null,
        message: "Coming soon",
      };
    },
  });
}
