import {
  LayoutDashboard, Building2, Megaphone, Users, Heart, CreditCard, Wallet, BarChart3, Mail, Settings,
  GraduationCap, Trophy, UserCheck, Send, Bell, Flag, UserCircle, Compass, LifeBuoy, Boxes,
} from "lucide-react";

export const adminNav = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Schools", to: "/admin/schools", icon: Building2 },
  { label: "Campaigns", to: "/admin/campaigns", icon: Megaphone },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Donations", to: "/admin/donations", icon: Heart },
  { label: "Transactions", to: "/admin/transactions", icon: CreditCard },
  { label: "Payouts", to: "/admin/payouts", icon: Wallet },
  { label: "Reports", to: "/admin/reports", icon: BarChart3 },
  { label: "Contact Inquiries", to: "/admin/inquiries", icon: Mail },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const schoolNav = [
  { label: "Overview", to: "/school/dashboard", icon: LayoutDashboard },
  { label: "My School", to: "/school/my-school", icon: GraduationCap },
  { label: "Campaigns", to: "/school/campaigns", icon: Megaphone },
  { label: "Teams", to: "/school/teams", icon: Trophy },
  { label: "Participants", to: "/school/participants", icon: UserCheck },
  { label: "Donations", to: "/school/donations", icon: Heart },
  { label: "Reports", to: "/school/reports", icon: BarChart3 },
  { label: "Invitations", to: "/school/invitations", icon: Send },
  { label: "Notifications", to: "/school/notifications", icon: Bell },
  { label: "Settings", to: "/school/settings", icon: Settings },
];

export const participantNav = [
  { label: "Overview", to: "/participant/dashboard", icon: LayoutDashboard },
  { label: "My Fundraiser", to: "/fundraiser/maya-ellis", icon: Flag },
  { label: "My Team", to: "/team/northgate-track", icon: Trophy },
  { label: "Explore Campaigns", to: "/campaigns", icon: Compass },
];

export const donorNav = [
  { label: "Overview", to: "/donor/dashboard", icon: LayoutDashboard },
  { label: "Profile Settings", to: "/donor/profile", icon: UserCircle },
  { label: "Explore Campaigns", to: "/campaigns", icon: Compass },
];

export const areaConfig = {
  admin: { nav: adminNav, label: "Admin workspace", user: { name: "Alex Moreau", role: "Platform admin", initials: "AM" } },
  school: { nav: schoolNav, label: "Northgate High School", user: { name: "Diane Reyes", role: "School admin", initials: "DR" } },
  participant: { nav: participantNav, label: "Maya Ellis", user: { name: "Maya Ellis", role: "Team captain", initials: "ME" } },
  donor: { nav: donorNav, label: "Jordan Avery", user: { name: "Jordan Avery", role: "Donor", initials: "JA" } },
};

export const extraIcons = { Boxes, LifeBuoy };