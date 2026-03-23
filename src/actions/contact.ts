"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = (formData.get("name") as string ?? "").trim();
  const email = (formData.get("email") as string ?? "").trim().toLowerCase();
  const service = (formData.get("service") as string ?? "").trim();
  const message = (formData.get("message") as string ?? "").trim();

  if (!name) {
    return { status: "error", message: "Zadajte vaše meno a priezvisko." };
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Zadajte platnú pracovnú emailovú adresu." };
  }
  if (!service) {
    return { status: "error", message: "Vyberte si službu, o ktorú máte záujem." };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.from("leads").insert({
      email,
      name,
      service,
      message: message || null,
      source: "website_contact",
    });

    if (error) {
      console.error("[contact] Supabase error:", error.message, error.code);

      if (error.code === "23505") {
        return {
          status: "success",
          message: "Ďakujeme! Váš dopyt sme evidovali. Ozveme sa čoskoro.",
        };
      }

      return {
        status: "error",
        message: "Nastala chyba pri odosielaní. Skúste to prosím znovu.",
      };
    }

    return {
      status: "success",
      message: "Ďakujeme! Váš dopyt sme prijali. Ozveme sa do 24 hodín.",
    };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return {
      status: "error",
      message: "Nastala nečakaná chyba. Skúste to prosím znovu.",
    };
  }
}
