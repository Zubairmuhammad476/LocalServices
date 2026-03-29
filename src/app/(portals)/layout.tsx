export default function PortalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Portals have their own nav inside each portal page
  // This layout just renders children with no extra wrapper
  return <>{children}</>;
}
