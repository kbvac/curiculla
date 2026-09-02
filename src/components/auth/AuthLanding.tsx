"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthButtons } from "./AuthButtons";
import { BrandMark, BRAND_NAME } from "./Brand";

type View = "buttons" | "login" | "signup";

type Props = {
  googleReady: boolean;
  initialView?: View;
  error?: string;
};

export function AuthLanding({ googleReady, initialView = "buttons", error }: Props) {
  const router = useRouter();
  const [view, setView] = useState<View>(initialView);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const submit = async (endpoint: "/api/auth/login" | "/api/auth/register") => {
    setLoading(true);
    setFormError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          endpoint === "/api/auth/register"
            ? { name, email, password }
            : { email, password },
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Une erreur est survenue");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setFormError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "h-[52px] w-full rounded-[10px] border border-[#E1E1DD] bg-white px-4 text-[15px] text-[#111111] outline-none placeholder:text-[#A0A09A] focus:border-[#12B76A]";

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-center px-6 py-12">
      {/* Brand */}
      <div className="flex flex-col items-center text-center">
        <BrandMark size={32} />
        <p className="mt-3 text-lg font-semibold tracking-tight text-[#111111]">
          {BRAND_NAME}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#707070]">
          Le cursus officiel des universités, cours par cours, semaine par semaine —
          avec les meilleurs enregistrements du monde.
        </p>
      </div>

      {/* Errors */}
      {(error || formError) && (
        <div className="mt-6 w-full rounded-[10px] border border-[#E1E1DD] bg-white px-4 py-3 text-sm text-[#111111]">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#12B76A]" />
          {formError ||
            (error === "google_unconfigured"
              ? "Connexion Google non configurée."
              : "Connexion Google échouée. Réessaie.")}
        </div>
      )}

      <div className="mt-8 w-full">
        {view === "buttons" && (
          <>
            <AuthButtons
              googleReady={googleReady}
              onLogin={() => setView("login")}
              onSignup={() => setView("signup")}
            />
            <p className="mt-6 text-center text-sm text-[#707070]">
              Pas encore de compte ?{" "}
              <button
                onClick={() => setView("signup")}
                className="font-medium text-[#111111] underline underline-offset-2"
              >
                Sign up
              </button>
            </p>
          </>
        )}

        {view === "login" && (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputCls}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={inputCls}
            />
            <button
              onClick={() => submit("/api/auth/login")}
              disabled={loading || !email || !password}
              className="flex h-[52px] w-full items-center justify-center rounded-[10px] bg-[#111111] text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? "…" : "Se connecter"}
            </button>
            <button
              onClick={() => setView("buttons")}
              className="w-full pt-1 text-center text-sm text-[#707070] hover:text-[#111111]"
            >
              ← Retour
            </button>
          </div>
        )}

        {view === "signup" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={inputCls}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputCls}
            />
            <input
              type="password"
              placeholder="Mot de passe (8 caractères min.)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className={inputCls}
            />
            <button
              onClick={() => submit("/api/auth/register")}
              disabled={loading || !email || !password || !name}
              className="flex h-[52px] w-full items-center justify-center rounded-[10px] bg-[#111111] text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? "…" : "Créer mon compte"}
            </button>
            <button
              onClick={() => setView("buttons")}
              className="w-full pt-1 text-center text-sm text-[#707070] hover:text-[#111111]"
            >
              ← Retour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
