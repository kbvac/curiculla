import { AuthLanding } from "@/components/auth/AuthLanding";
import { DashboardPreview } from "@/components/auth/DashboardPreview";
import { isGoogleConfigured } from "@/components/auth/Brand";

export const metadata = { title: "Connexion" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F8F6] lg:flex-row">
      {/* Left — auth, ~43% */}
      <div className="flex flex-1 items-center justify-center lg:w-[43%] lg:flex-none">
        <AuthLanding googleReady={isGoogleConfigured} error={error} />
      </div>

      {/* Right — product preview, ~57% */}
      <div className="relative flex-1 border-t border-[#E1E1DD] lg:w-[57%] lg:flex-none lg:border-l lg:border-t-0">
        <DashboardPreview />
      </div>
    </div>
  );
}
