// /app/protected/layout.tsx

import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/useAuth";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
}