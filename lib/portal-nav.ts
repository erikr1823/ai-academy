export const portalNavLinks = [
  { label: "Dashboard", href: "/dashboard", key: "dashboard" },
  { label: "Courses", href: "/courses", key: "courses" },
  { label: "Roadmap", href: "/roadmap", key: "roadmap" },
  { label: "Certificates", href: "/certificates", key: "certificates" },
  { label: "Profile", href: "/profile", key: "profile" },
] as const;

export type PortalNavKey = (typeof portalNavLinks)[number]["key"];
