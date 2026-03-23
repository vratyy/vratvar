"use server";

import { createClient } from "@/lib/supabase/server";

export type LeadActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  _prevState: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return {
      status: "error",
      message: "Zadajte platnú emailovú adresu.",
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("leads")
      .insert({ email, source: "website_cta" });

    if (error) {
      console.error("[leads] Supabase error:", error.message, error.code);

      if (error.code === "23505") {
        return {
          status: "success",
          message: "Ďakujeme! Váš email už máme evidovaný. Ozveme sa vám čoskoro.",
        };
      }

      return {
        status: "error",
        message: "Nastala chyba. Skúste to prosím znovu.",
      };
    }

    return {
      status: "success",
      message: "Ďakujeme! Ozveme sa vám čoskoro.",
    };
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return {
      status: "error",
      message: "Nastala chyba. Skúste to prosím znovu.",
    };
  }
}
