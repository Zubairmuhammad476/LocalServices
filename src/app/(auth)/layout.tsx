// Auth pages use their own full-screen layout (no SiteNav)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
