import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowUpRight,

  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  KeyRound,
  Loader2,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Stethoscope,
  Bell,
  HelpCircle,
  Search,
  Building,
  Building2,
  BedDouble,
  MapPin,
  Clock3,
  Users,
  Activity,
  Plug,
  Rocket,
  CreditCard,
  Scale,
  Link2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  scenarios,
  scenarioLabels,
  type Scenario,
  type Health,
  type Hotel,
} from "@/lib/hotel-data";
import { StatusDot, StatusPill, CopyButton } from "@/components/hotel/primitives";
import { EditDrawer, type EditTarget, type EditField } from "@/components/hotel/EditDrawer";
import { AppSidebar } from "@/components/hotel/AppSidebar";
import propertyImage from "@/assets/hotel-property.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maritime Hotel #921 · Hotel Workspace" },
      {
        name: "description",
        content:
          "Internal hotel workspace: property identity, operational health, PMS and booking engine connections, people, legal and billing, service status and references.",
      },
      { property: "og:title", content: "Maritime Hotel #921 · Hotel Workspace" },
      {
        property: "og:description",
        content:
          "One coherent workspace for a single hotel: identity, health, connections, people, legal & billing, service and links.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HotelWorkspace,
});

/* ---------------------------------------------------------------- */
/* small building blocks                                             */
/* ---------------------------------------------------------------- */

const healthWord: Record<Health, string> = {
  healthy: "Healthy",
  warning: "Attention",
  failed: "Error",
  neutral: "Not configured",
};

function Section({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[150px] pt-3">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 className="text-[14px] font-bold tracking-tight text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function SubTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 text-[11px] font-semibold tracking-[0.11em] text-muted-foreground uppercase">
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  action,
}: {
  label: string;
  value: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-[7px]">
      <span className="min-w-0 truncate pt-px text-[12.5px] text-muted-foreground">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5 text-right text-[13.5px] font-medium text-foreground">
        {value}
        {action}
      </span>
    </div>
  );
}

function Surface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border/70 bg-surface p-5 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-float)]", className)}>
      {children}
    </div>
  );
}

function Muted({ children }: { children: ReactNode }) {
  return <span className="text-[13px] text-muted-foreground">{children}</span>;
}

/* ---- colourful building blocks ---- */

type Tint = "sky" | "violet" | "peach" | "mint" | "sand" | "lime";

const tintBg: Record<Tint, string> = {
  sky: "bg-surface",
  violet: "bg-surface",
  peach: "bg-surface",
  mint: "bg-surface",
  sand: "bg-surface",
  lime: "bg-surface",
};

const tintInk: Record<Tint, string> = {
  sky: "text-primary",
  violet: "text-primary",
  peach: "text-primary",
  mint: "text-primary",
  sand: "text-primary",
  lime: "text-primary",
};

function ActionTile({
  icon: Icon,
  title,
  desc,
  tint,
  className,
  ...rest
}: {
  icon: typeof Pencil;
  title: string;
  desc: string;
  tint: Tint;
} & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "group flex h-full w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 text-left shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-primary/40 hover:bg-accent/60",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent",
          tintInk[tint],
        )}
      >
        <Icon className="size-4.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold text-foreground">{title}</span>
        <span className="block truncate text-[11.5px] text-muted-foreground">{desc}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

/** Flat white card with an icon header row. */
function CardShell({
  icon: Icon,
  title,
  subtitle,
  tint = "sand",
  action,
  children,
  className,
}: {
  icon?: typeof Pencil;
  title: string;
  subtitle?: string;
  tint?: Tint;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        {Icon ? (
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent",
              tintInk[tint],
            )}
          >
            <Icon className="size-4" />
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-semibold text-foreground">{title}</div>
          {subtitle ? (
            <div className="truncate text-[11.5px] text-muted-foreground">{subtitle}</div>
          ) : null}
        </div>
        {action}
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-4">{children}</div>
    </div>
  );
}

function PillRow({
  label,
  value,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-surface-muted px-3 py-2",
        className,
      )}
    >
      <span className="min-w-0 truncate text-[12.5px] text-muted-foreground">{label}</span>
      <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}




function initials(name: string) {
  return name
    .split(/[\s.@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ name, size = 36 }: { name: string; index?: number; size?: number }) {
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-lg bg-accent text-[12px] font-semibold text-primary"
    >
      {initials(name)}
    </span>
  );
}


function countBy(groups: { features: { status: Health }[] }[]) {
  const c = { healthy: 0, warning: 0, failed: 0, neutral: 0 };
  groups.forEach((g) => g.features.forEach((f) => (c[f.status] += 1)));
  return c;
}


/* ---------------------------------------------------------------- */
/* page                                                              */
/* ---------------------------------------------------------------- */

const sectionNav = [
  { id: "quick", label: "Actions" },
  { id: "snapshot", label: "Health" },

  { id: "identity", label: "Identity" },
  { id: "people", label: "People" },
  { id: "legal", label: "Legal & billing" },
  { id: "service", label: "Service" },
  { id: "links", label: "Links" },
];

const tagLibrary = ["Priority", "Enterprise", "Marriott", "VIP", "Cruiseport", "Churn risk"];

function HotelWorkspace() {
  const [scenario, setScenario] = useState<Scenario>("live");
  const [store, setStore] = useState<Record<Scenario, Hotel>>(scenarios);
  const [edit, setEdit] = useState<EditTarget>(null);
  const [detail, setDetail] = useState<null | "features" | "jobs" | "onboarding">(null);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [tagQuery, setTagQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("snapshot");

  const hotel = store[scenario];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 220);
      let current = sectionNav[0]?.id ?? "snapshot";
      for (const s of sectionNav) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 190) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const patch = (fn: (h: Hotel) => Hotel) =>
    setStore((s) => ({ ...s, [scenario]: fn(s[scenario]) }));

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openEdit = (
    title: string,
    fields: EditField[],
    onSave?: (values: Record<string, string>) => void,
  ) => setEdit(onSave ? { title, fields, onSave } : { title, fields });

  /* ---------------- derived ---------------- */

  const attention = hotel.health.total - hotel.health.healthy;

  const lifecycle = useMemo(() => {
    if (hotel.service.status === "Churned")
      return {
        status: "neutral" as Health,
        label: "Service ended",
        sub: `Churned ${hotel.service.churnDate ?? "—"}`,
      };
    if (hotel.onboarding)
      return {
        status: "warning" as Health,
        label: "Onboarding",
        sub: hotel.onboarding.stage,
      };
    if (hotel.service.status === "Not started")
      return { status: "warning" as Health, label: "Onboarding", sub: "Not started" };
    if (attention > 0)
      return {
        status: (attention > hotel.health.total / 2 ? "failed" : "warning") as Health,
        label: "Attention required",
        sub: `${attention} item${attention > 1 ? "s" : ""} need attention`,
      };
    return {
      status: "healthy" as Health,
      label: "Active",
      sub: `Service started ${hotel.service.startedOn}`,
    };
  }, [hotel, attention]);

  const location = useMemo(() => {
    const addr = hotel.legal?.billingAddress;
    if (!addr) return null;
    const parts = addr.split(",").map((p) => p.trim());
    const city = parts[1];
    const state = parts[2]?.split(" ")[0];
    return city && state ? `${city}, ${state}` : null;
  }, [hotel.legal]);

  const topFeatures = hotel.health.groups[0]?.features.slice(0, 3) ?? [];

  /* ---------------- actions ---------------- */

  const runStatusCheck = () => {
    if (checking) return;
    setChecking(true);
    setCheckResult(null);
    window.setTimeout(() => {
      setChecking(false);
      setCheckResult(
        attention === 0
          ? "Hotel status is healthy"
          : `Attention required · ${attention} issue${attention > 1 ? "s" : ""} found`,
      );
    }, 1100);
  };

  const getOtp = () => setOtp(String(Math.floor(100000 + Math.random() * 900000)));

  const addTag = (tag: string) => {
    if (hotel.service.tags.includes(tag)) return;
    patch((h) => ({ ...h, service: { ...h.service, tags: [...h.service.tags, tag] } }));
    toast.success("Tag added", { description: tag });
  };

  const removeTag = (tag: string) =>
    patch((h) => ({
      ...h,
      service: { ...h.service, tags: h.service.tags.filter((t) => t !== tag) },
    }));

  const editHotel = () =>
    openEdit(
      "hotel",
      [
        { label: "Hotel name", value: hotel.name },
        { label: "Group", value: hotel.identity.group },
        { label: "Rooms", value: hotel.identity.rooms },
        { label: "Check-in", value: hotel.identity.checkIn },
        { label: "Check-out", value: hotel.identity.checkOut },
        { label: "Hotel ID", value: hotel.identity.hotelId, hint: "PMS property code" },
      ],
      (v) =>
        patch((h) => ({
          ...h,
          name: v["Hotel name"] ?? h.name,
          identity: {
            ...h.identity,
            group: v["Group"] ?? h.identity.group,
            rooms: v["Rooms"] ?? h.identity.rooms,
            checkIn: v["Check-in"] ?? h.identity.checkIn,
            checkOut: v["Check-out"] ?? h.identity.checkOut,
            hotelId: v["Hotel ID"] ?? h.identity.hotelId,
          },
        })),
    );

  const editTeam = () =>
    openEdit(
      "account team",
      [
        { label: "CSM", value: hotel.people.csm },
        { label: "Sales agent", value: hotel.people.salesAgent },
        { label: "Referrer", value: hotel.people.referrer },
      ],
      (v) =>
        patch((h) => ({
          ...h,
          people: {
            ...h.people,
            csm: v["CSM"] ?? h.people.csm,
            salesAgent: v["Sales agent"] ?? h.people.salesAgent,
            referrer: v["Referrer"] ?? h.people.referrer,
          },
        })),
    );

  const editLegal = () => {
    if (!hotel.legal) {
      openEdit("legal information", [
        { label: "Legal name", value: "" },
        { label: "Doing business as", value: "" },
        { label: "Support email", value: "" },
      ]);
      return;
    }
    const l = hotel.legal;
    openEdit(
      "legal information",
      [
        { label: "Legal name", value: l.legalName },
        { label: "Doing business as", value: l.dba },
        { label: "Support email", value: l.supportEmail },
        { label: "EIN", value: l.ein },
        { label: "TCR brand ID", value: l.tcrBrandId },
        { label: "TCR campaign ID", value: l.tcrCampaignId },
      ],
      (v) =>
        patch((h) =>
          h.legal
            ? {
                ...h,
                legal: {
                  ...h.legal,
                  legalName: v["Legal name"] ?? h.legal.legalName,
                  dba: v["Doing business as"] ?? h.legal.dba,
                  supportEmail: v["Support email"] ?? h.legal.supportEmail,
                  ein: v["EIN"] ?? h.legal.ein,
                  tcrBrandId: v["TCR brand ID"] ?? h.legal.tcrBrandId,
                  tcrCampaignId: v["TCR campaign ID"] ?? h.legal.tcrCampaignId,
                },
              }
            : h,
        ),
    );
  };

  const editBilling = () => {
    if (!hotel.legal) return;
    const l = hotel.legal;
    openEdit(
      "billing information",
      [
        { label: "Billing address", value: l.billingAddress },
        { label: "Invoice address", value: l.invoiceAddress },
      ],
      (v) =>
        patch((h) =>
          h.legal
            ? {
                ...h,
                legal: {
                  ...h.legal,
                  billingAddress: v["Billing address"] ?? h.legal.billingAddress,
                  invoiceAddress: v["Invoice address"] ?? h.legal.invoiceAddress,
                },
              }
            : h,
        ),
    );
  };

  const editService = () =>
    openEdit(
      "service & account",
      [
        { label: "Service started", value: hotel.service.startedOn },
        { label: "Churn date", value: hotel.service.churnDate ?? "" },
        { label: "Configuration stage", value: hotel.service.configurationStage },
      ],
      (v) =>
        patch((h) => ({
          ...h,
          service: {
            ...h.service,
            startedOn: v["Service started"] ?? h.service.startedOn,
            churnDate: v["Churn date"] ? v["Churn date"] : null,
            configurationStage: v["Configuration stage"] ?? h.service.configurationStage,
          },
        })),
    );

  /* ---------------- render ---------------- */

  const headerActions = (compact?: boolean) => (
    <div className="flex shrink-0 items-center gap-2">
      <Button size={compact ? "sm" : "default"} onClick={editHotel}>
        <Pencil className="size-4" /> Edit hotel
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="More hotel actions">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Hotel utilities</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => setDetail("features")}>
            View all features
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDetail("jobs")}>View PMS jobs</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => goTo("links")}>Links & references</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => goTo("service")}>
            Management company change
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-background">
      <AppSidebar />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex h-[68px] items-center gap-3 bg-background/85 px-4 backdrop-blur-xl md:px-6">
          <div className="hidden h-10 w-[420px] items-center gap-2 rounded-lg border border-border/70 bg-surface px-4 text-muted-foreground shadow-[var(--shadow-card)] md:flex">
            <Search className="size-4" />
            <span className="text-[12.5px]">Search hotels, IDs, or anything…</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
             <Button className="rounded-full md:hidden" variant="ghost" size="icon" aria-label="Search" title="Search">
              <Search className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative size-10 rounded-full border border-border/70 bg-surface shadow-[var(--shadow-card)]" aria-label="Notifications" title="Notifications">
              <Bell className="size-4" />
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-lime" />
            </Button>
            <div className="hidden items-center gap-2.5 rounded-full border border-border/70 bg-surface py-1.5 pr-4 pl-1.5 shadow-[var(--shadow-card)] sm:flex">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">LT</span>
              <span className="text-[12px] font-semibold text-foreground">Lakshay Tyagi</span>
              <span className="text-[10px] leading-tight text-muted-foreground">{hotel.localTime}<br />{hotel.timezone}</span>
            </div>
          </div>
        </header>


        {/* sticky hotel context bar */}
        <div
          className={cn(
            "sticky top-[68px] z-30 px-4 transition-all duration-300 md:px-6",
            scrolled ? "h-16 opacity-100" : "pointer-events-none h-0 overflow-hidden opacity-0",
          )}
        >
          <div className="mx-auto flex h-14 max-w-[1540px] items-center gap-3 rounded-xl border border-border/70 bg-surface/90 px-3 shadow-[var(--shadow-card)] backdrop-blur-xl">
            <img
              src={propertyImage}
              alt=""
              width={1024}
              height={768}
              className="size-9 rounded-full object-cover"
            />

            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold text-foreground">
                {hotel.name} <span className="text-muted-foreground">{hotel.displayId}</span>
              </div>
            </div>
            <StatusDot
              status={attention === 0 ? "healthy" : "warning"}
              label={`${hotel.health.healthy}/${hotel.health.total} healthy`}
            />
            <div className="ml-auto">{headerActions(true)}</div>
          </div>
        </div>

           <div className="mx-auto max-w-[1540px] px-4 pt-3 pb-12 md:px-5">
          {/* account status controller */}
          <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border/70 bg-surface p-1.5 shadow-[var(--shadow-card)]">
            <span className="px-3 text-[10.5px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
              Account status
            </span>
            {scenarioLabels.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenario(s.id)}
                className={cn(
                  "rounded-md px-4 py-1.5 text-[12.5px] font-semibold transition-all duration-200",
                  scenario === s.id
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>


          {/* ---------------- hotel header ---------------- */}
          <header className="grid min-h-[280px] overflow-hidden rounded-xl bg-foreground p-2 shadow-[var(--shadow-float)] lg:grid-cols-[38%_62%]">
            <div className="relative min-h-[240px] overflow-hidden rounded-lg">
              <img
                src={propertyImage}
                alt={`Exterior of ${hotel.name}`}
                width={1024}
                height={768}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-primary-foreground">
                <span className="rounded-full bg-foreground/60 px-3 py-1.5 text-[11px] font-medium backdrop-blur-md">1 / 5</span>
                <Button size="sm" className="h-9 rounded-md bg-surface px-4 text-[12px] font-semibold text-foreground hover:bg-surface/90">View gallery</Button>
              </div>
            </div>
            <div className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-lg p-6 text-primary-foreground md:p-7">
              <img src={propertyImage} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-[2px]" />
              <div className="absolute inset-0 bg-foreground/85" />
              <div className="relative pt-12 lg:pt-0">
                <div className="min-w-0 max-w-[760px]">
                  <div className="mb-3 flex items-center gap-2 pr-36 sm:pr-44">
                    <StatusPill status={lifecycle.status} label={lifecycle.label.toUpperCase()} />
                    <span className="rounded-full bg-primary-foreground/10 px-2.5 py-1 text-[11px] font-medium">Property {hotel.displayId}</span>
                  </div>
                  <h1 className="max-w-3xl text-[30px] leading-[1.08] font-extrabold tracking-tight text-primary-foreground lg:text-[34px]">
                    {hotel.name}
                  </h1>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { Icon: Building, text: hotel.identity.parentChain },
                      { Icon: Building2, text: hotel.identity.group },
                      { Icon: BedDouble, text: `${hotel.identity.rooms} rooms` },
                      { Icon: MapPin, text: location ?? "—" },
                    ].map(({ Icon, text }) => (
                      <span key={text} className="flex items-center gap-1.5 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 text-[11.5px] font-medium text-primary-foreground/90">
                        <Icon className="size-3.5" />
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 text-foreground">{headerActions()}</div>
              </div>
              <div className="relative mt-6 flex flex-wrap items-end gap-5">
                <div className="grid grid-cols-3 gap-6">
                  {[["Hotel ID", hotel.identity.hotelId], ["Timezone", hotel.timezone], ["Local time", hotel.localTime]].map(([label, value]) => (
                    <span key={label} className="min-w-[90px]">
                      <span className="block text-[10px] tracking-[0.1em] text-primary-foreground/55 uppercase">{label}</span>
                      <span className="mt-1 block text-[13px] font-bold text-primary-foreground">{value}</span>
                    </span>
                  ))}
                </div>
                <span className="ml-auto rounded-md bg-lime px-4 py-2 text-[11.5px] font-bold text-lime-foreground"><span className="mr-1.5 inline-block size-2 rounded-full bg-lime-foreground/70" />{lifecycle.sub}</span>
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden max-w-full items-center gap-1.5 truncate text-[12px] font-semibold text-primary-foreground hover:underline"
                >
                  <span className="truncate">{hotel.websiteLabel}</span>
                  <ArrowUpRight className="size-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </header>

          {/* ---------------- in-page nav ---------------- */}
          <nav
            className={cn(
               "sticky z-20 mt-3 mb-1 rounded-lg border border-border/70 bg-surface/90 p-1.5 shadow-[var(--shadow-card)] backdrop-blur-xl",
              scrolled ? "top-[136px]" : "top-[78px]",
            )}
          >
            <div className="flex flex-wrap items-center gap-1">
              {sectionNav.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(s.id)}
                  className={cn(
                    "rounded-md px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                    active === s.id
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </nav>


          {/* ---------------- quick actions ---------------- */}
          <Section id="quick" title="Quick actions">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <ActionTile
                icon={Pencil}
                tint="sky"
                title="Edit hotel"
                desc="Update property information"
                onClick={editHotel}
              />
              <Popover onOpenChange={(o) => !o && setOtp(null)}>
                <PopoverTrigger asChild>
                  <ActionTile
                    icon={KeyRound}
                    tint="violet"
                    title="Get last OTP"
                    desc="Retrieve latest access code"
                    onClick={getOtp}
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-60 rounded-lg">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase">Last OTP</div>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <span className="font-mono text-[22px] font-semibold text-foreground">{otp ?? "······"}</span>
                    {otp ? <CopyButton value={otp} /> : null}
                  </div>
                  <p className="mt-2 text-[12px] text-muted-foreground">Expires in 5 minutes.</p>
                </PopoverContent>
              </Popover>
              <Popover onOpenChange={(o) => o && runStatusCheck()}>
                <PopoverTrigger asChild>
                  <ActionTile
                    icon={Stethoscope}
                    tint="mint"
                    title="Check hotel status"
                    desc="Run a current health check"
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-72 rounded-lg">
                  {checking ? (
                    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" /> Checking hotel status…
                    </div>
                  ) : (
                    <StatusDot
                      status={attention === 0 ? "healthy" : "warning"}
                      label={checkResult ?? "Ready to check"}
                    />
                  )}
                </PopoverContent>
              </Popover>
              <ActionTile
                icon={Mail}
                tint="peach"
                title="Hotel emails"
                desc="Open property contacts"
                onClick={() => goTo("people")}
              />
            </div>
          </Section>

          {/* ---------------- operational snapshot ---------------- */}
          <Section
            id="snapshot"
            title="Operational snapshot"
            action={
              attention > 0 ? (
                <button
                  type="button"
                  onClick={() => setDetail("features")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-3 py-1.5 text-[12.5px] font-semibold text-warning transition-transform hover:-translate-y-0.5"
                >
                  {attention} item{attention > 1 ? "s" : ""} need attention
                  <ChevronRight className="size-3.5" />
                </button>
              ) : null
            }
          >
            <div className="grid gap-3 xl:grid-cols-3">
              {/* hotel health — donut on top, list below */}
              <CardShell
                icon={Activity}
                tint="lime"
                title="Hotel health"
                subtitle={`${hotel.health.healthy} of ${hotel.health.total} features healthy`}
                action={
                  <span className="hidden rounded-full bg-surface px-3 py-1.5 text-[11.5px] font-bold text-foreground shadow-[var(--shadow-card)] sm:inline-flex">
                    {Math.round((hotel.health.healthy / Math.max(hotel.health.total, 1)) * 100)}% healthy
                  </span>
                }
              >
                <div className="flex h-full flex-col items-center gap-4">
                  <div
                    className="grid size-[112px] shrink-0 place-items-center rounded-full p-3"
                    style={{
                      background: `conic-gradient(var(--color-success) 0 ${
                        (hotel.health.healthy / Math.max(hotel.health.total, 1)) * 100
                      }%, var(--color-warning) ${
                        (hotel.health.healthy / Math.max(hotel.health.total, 1)) * 100
                      }% ${
                        (1 - (countBy(hotel.health.groups).failed / Math.max(hotel.health.total, 1))) * 100
                      }%, var(--color-danger) 0)`,
                    }}
                  >
                    <div className="grid size-full place-items-center rounded-full bg-surface text-center">
                      <span>
                        <span className="block text-[26px] leading-none font-extrabold tracking-tight text-foreground">
                          {hotel.health.healthy}
                          <span className="text-[15px] text-muted-foreground">/{hotel.health.total}</span>
                        </span>
                        <span className="mt-1 block text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                          Healthy
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap justify-center gap-2">
                    {(
                      [
                        ["healthy", "Healthy", "bg-success-soft text-success"],
                        ["warning", "Attention", "bg-warning-soft text-warning"],
                        ["failed", "Errors", "bg-danger-soft text-danger"],
                      ] as const
                    ).map(([key, label, cls]) => (
                      <span
                        key={key}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-bold",
                          cls,
                        )}
                      >
                        {countBy(hotel.health.groups)[key]} {label}
                      </span>
                    ))}
                  </div>

                  <div className="grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-1">
                    {topFeatures.length === 0 ? (
                      <Muted>No feature data yet.</Muted>
                    ) : (
                      topFeatures.map((f) => (
                        <PillRow
                          key={f.name}
                          label={f.name}
                          value={<StatusDot status={f.status} label={healthWord[f.status]} />}
                        />
                      ))
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-lg"
                    onClick={() => setDetail("features")}
                  >
                    View all feature statuses
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </CardShell>

              {/* connections + onboarding */}
              <div className="grid gap-3 lg:grid-cols-2 xl:contents">

                <CardShell
                  icon={Plug}
                  tint="sky"
                  title="Connections"
                  subtitle={`${hotel.sync.pms} · ${hotel.sync.bookingEngine}`}
                >
                  <div className="flex h-full flex-col gap-2">
                    <PillRow
                      label={`PMS · ${hotel.sync.pms}`}
                      value={
                        <StatusDot
                          status={hotel.sync.pmsStatus.status}
                          label={hotel.sync.pmsStatus.label}
                        />
                      }
                    />
                    <PillRow
                      label={`Booking engine · ${hotel.sync.bookingEngine}`}
                      value={
                        <StatusDot status={hotel.sync.beSync.status} label={hotel.sync.beSync.label} />
                      }
                    />
                    <PillRow label="Last BE sync" value={hotel.sync.lastBeSync} />
                    <PillRow
                      label="Proxy"
                      value={
                        <StatusDot status={hotel.sync.proxy.status} label={hotel.sync.proxy.label} />
                      }
                    />
                    <PillRow
                      label="PMS jobs"
                      value={
                        hotel.sync.jobs.length ? (
                          `${hotel.sync.jobs.length} configured`
                        ) : (
                          <Muted>None configured</Muted>
                        )
                      }
                    />

                    {hotel.sync.beSync.status !== "healthy" ? (
                      <div className="rounded-lg bg-warning-soft p-4">
                        <div className="flex items-center gap-2 text-[13.5px] font-bold text-warning">
                          <AlertTriangle className="size-4 shrink-0" />
                          BE sync {hotel.sync.beSync.label.toLowerCase()}
                        </div>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground/65">
                          Last successful sync: {hotel.sync.lastBeSync.toLowerCase() === "not synced" ? "never" : hotel.sync.lastBeSync}. Bookings and availability are affected.
                        </p>
                        <Popover onOpenChange={(o) => o && runStatusCheck()}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 rounded-xl bg-surface shadow-[var(--shadow-card)]"
                            >
                              {checking ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Stethoscope className="size-4" />
                              )}
                              Check status
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-72 rounded-lg">
                            {checking ? (
                              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                                <Loader2 className="size-4 animate-spin" /> Checking hotel status…
                              </div>
                            ) : (
                              <StatusDot
                                status={attention === 0 ? "healthy" : "warning"}
                                label={checkResult ?? "Ready to check"}
                              />
                            )}
                          </PopoverContent>
                        </Popover>
                      </div>
                    ) : null}


                    <div className="mt-auto grid gap-2 pt-2 sm:grid-cols-2">
                      <Popover onOpenChange={(o) => o && runStatusCheck()}>
                        <PopoverTrigger asChild>
                          <Button className="w-full rounded-lg">
                            {checking ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Stethoscope className="size-4" />
                            )}
                            Check hotel status
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-72 rounded-lg">
                          {checking ? (
                            <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                              <Loader2 className="size-4 animate-spin" /> Checking hotel status…
                            </div>
                          ) : (
                            <StatusDot
                              status={attention === 0 ? "healthy" : "warning"}
                              label={checkResult ?? "Ready to check"}
                            />
                          )}
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="outline"
                        className="w-full rounded-lg"
                        disabled={!hotel.sync.jobs.length}
                        onClick={() => setDetail("jobs")}
                      >
                        View jobs
                      </Button>
                    </div>
                  </div>
                </CardShell>

                <CardShell
                  icon={Rocket}
                  tint="violet"
                  title="Onboarding"
                  subtitle={hotel.onboarding?.stage ?? "Initial payment stage"}
                  action={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-md"
                      onClick={() => setDetail("onboarding")}
                    >
                      View all
                    </Button>
                  }
                >
                  <div className="flex h-full flex-col gap-2">
                    {(
                      hotel.onboarding?.mandatory ?? [
                        { label: "Campaign registry", state: "complete" as const },
                        { label: "PMS sync", state: "action" as const, action: "Set up" },
                        { label: "BE sync", state: "action" as const, action: "Set up" },
                        { label: "Proxy", state: "complete" as const },
                      ]
                    )
                      .slice(0, 5)
                      .map((m) => (
                        <PillRow
                          key={m.label}
                          label={m.label}
                          value={
                            m.state === "complete" ? (
                              <StatusDot status="healthy" label="Done" />
                            ) : (
                              <button
                                type="button"
                                onClick={() => toast("Opening setup", { description: m.label })}
                                className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11.5px] font-bold text-primary-foreground"
                              >
                                {("action" in m && m.action) || "Set up"}
                                <ChevronRight className="size-3" />
                              </button>
                            )
                          }
                        />
                      ))}
                  </div>
                </CardShell>
              </div>
            </div>
          </Section>

          {/* ---------------- identity ---------------- */}
          <Section id="identity" title="Identity">
            <CardShell
              icon={Building2}
              tint="sand"
              title="Property identity"
              subtitle={`${hotel.identity.parentChain} · ${hotel.identity.rooms} rooms`}
              action={
                <Button size="sm" className="rounded-md" onClick={editHotel}>
                  <Pencil className="size-3.5" /> Edit
                </Button>
              }
            >
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                <PillRow label="Group" value={hotel.identity.group} />
                <PillRow
                  label="Rooms"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="size-3.5 text-muted-foreground" />
                      {hotel.identity.rooms}
                    </span>
                  }
                />
                <PillRow
                  label="Hotel ID"
                  value={
                    <>
                      <span className="font-mono">{hotel.identity.hotelId}</span>
                      <CopyButton value={hotel.identity.hotelId} compact />
                    </>
                  }
                />
                <PillRow
                  label="Check-in"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5 text-muted-foreground" />
                      {hotel.identity.checkIn}
                    </span>
                  }
                />
                <PillRow
                  label="Check-out"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5 text-muted-foreground" />
                      {hotel.identity.checkOut}
                    </span>
                  }
                />
                <PillRow label="Booking engine" value={hotel.identity.bookingEngine} />
                <PillRow label="PMS" value={hotel.identity.pms} />
                <PillRow label="Parent chain" value={hotel.identity.parentChain} />
                <PillRow label="Chain" value={hotel.identity.chain} />
                <PillRow label="Added on" value={hotel.identity.addedOn} />
              </div>
            </CardShell>
          </Section>

          {/* ---------------- people ---------------- */}
          <Section id="people" title="People">
            <div className="grid gap-3 lg:grid-cols-2">
              <CardShell
                icon={Users}
                tint="mint"
                title="Account team"
                subtitle="Who looks after this property"
                action={
                  <Button size="sm" className="rounded-md" onClick={editTeam}>
                    <Pencil className="size-3.5" /> Edit
                  </Button>
                }
              >
                <div className="grid gap-2">
                  {[
                    { role: "Customer success", name: hotel.people.csm },
                    { role: "Sales agent", name: hotel.people.salesAgent },
                    { role: "Referrer", name: hotel.people.referrer },
                  ].map((p, i) => (
                    <div
                      key={p.role}
                      className="group flex items-center gap-3 rounded-lg bg-surface-muted p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                    >
                      <Avatar name={p.name} index={i} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] font-bold text-foreground">{p.name}</div>
                        <div className="truncate text-[11.5px] text-muted-foreground">{p.role}</div>
                      </div>
                      <span className="flex size-8 items-center justify-center rounded-full bg-surface text-muted-foreground opacity-0 shadow-[var(--shadow-card)] transition-opacity group-hover:opacity-100">
                        <ChevronRight className="size-4" />
                      </span>
                    </div>
                  ))}
                </div>
              </CardShell>

              <CardShell
                icon={Mail}
                tint="peach"
                title="Hotel emails"
                subtitle={`${hotel.people.emails.length} contact${hotel.people.emails.length === 1 ? "" : "s"} on file`}
                action={
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-md"
                    onClick={() =>
                      openEdit("hotel contact", [
                        { label: "Name", value: "" },
                        { label: "Role", value: "" },
                        { label: "Email", value: "" },
                      ])
                    }
                  >
                    <Plus className="size-3.5" /> Add
                  </Button>
                }
              >
                {hotel.people.emails.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
                    <Muted>No hotel emails added yet.</Muted>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {hotel.people.emails.map((e, i) => (
                      <div
                        key={e.email}
                        className="flex items-center gap-3 rounded-lg bg-surface-muted p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                      >
                        <Avatar name={e.name} index={i + 2} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-bold text-foreground">{e.name}</div>
                          <a
                            href={`mailto:${e.email}`}
                            className="block truncate text-[11.5px] text-muted-foreground hover:text-foreground hover:underline"
                          >
                            {e.email}
                          </a>
                        </div>
                        <span className="hidden shrink-0 rounded-full bg-surface px-2.5 py-1 text-[10.5px] font-semibold text-muted-foreground shadow-[var(--shadow-card)] sm:inline-flex">
                          {e.role}
                        </span>
                        <CopyButton value={e.email} compact />
                      </div>
                    ))}
                  </div>
                )}
              </CardShell>
            </div>
          </Section>

          {/* ---------------- legal & billing ---------------- */}
          <Section id="legal" title="Legal & billing">
            <div className="grid gap-3 lg:grid-cols-2">
              <CardShell
                icon={Scale}
                tint="violet"
                title="Legal"
                subtitle={hotel.legal?.legalName ?? "Not configured"}
                action={
                  <Button size="sm" className="rounded-md" onClick={editLegal}>
                    <Pencil className="size-3.5" /> Edit
                  </Button>
                }
              >
                {hotel.legal ? (
                  <div className="grid gap-2">
                    <PillRow label="Legal name" value={hotel.legal.legalName} />
                    <PillRow label="Doing business as" value={hotel.legal.dba} />
                    <PillRow
                      label="Support email"
                      value={
                        <>
                          <a
                            href={`mailto:${hotel.legal.supportEmail}`}
                            className="max-w-[180px] truncate hover:underline"
                          >
                            {hotel.legal.supportEmail}
                          </a>
                          <CopyButton value={hotel.legal.supportEmail} compact />
                        </>
                      }
                    />
                    <div className="grid gap-2 sm:grid-cols-3">
                      <PillRow label="EIN" value={<span className="font-mono">{hotel.legal.ein}</span>} />
                      <PillRow
                        label="TCR brand"
                        value={<span className="font-mono">{hotel.legal.tcrBrandId}</span>}
                      />
                      <PillRow
                        label="TCR campaign"
                        value={<span className="font-mono">{hotel.legal.tcrCampaignId}</span>}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
                    <Muted>Legal information not configured.</Muted>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="rounded-md" onClick={editLegal}>
                        Add legal details
                      </Button>
                    </div>
                  </div>
                )}
              </CardShell>

              <CardShell
                icon={CreditCard}
                tint="sky"
                title="Billing"
                subtitle="Addresses, plan and payment settings"
                action={
                  hotel.legal ? (
                    <Button size="sm" className="rounded-md" onClick={editBilling}>
                      <Pencil className="size-3.5" /> Edit
                    </Button>
                  ) : null
                }
              >
                <div className="grid gap-2">
                  {hotel.legal ? (
                    <>
                      <div className="rounded-lg bg-surface-muted px-3.5 py-2.5">
                        <div className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                          Billing address
                        </div>
                        <div className="mt-0.5 text-[13px] font-semibold text-foreground">
                          {hotel.legal.billingAddress}
                        </div>
                      </div>
                      <div className="rounded-lg bg-surface-muted px-3.5 py-2.5">
                        <div className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                          Invoice address
                        </div>
                        <div className="mt-0.5 text-[13px] font-semibold text-foreground">
                          {hotel.legal.invoiceAddress}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Muted>Not configured.</Muted>
                  )}

                  {hotel.settings
                    .filter((s) =>
                      [
                        "Plan & Billing",
                        "Billing details",
                        "Billing tax details",
                        "ACH authorization",
                        "Rate codes",
                      ].includes(s.title),
                    )
                    .map((s) => (
                      <button
                        key={s.title}
                        type="button"
                        onClick={() =>
                          openEdit(
                            s.title.toLowerCase(),
                            s.rows.map((r) => ({ label: r.label, value: r.value })),
                          )
                        }
                        className="group flex items-center justify-between gap-4 rounded-lg bg-surface-muted px-3.5 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                      >
                        <span className="truncate text-[12.5px] font-medium text-muted-foreground">
                          {s.title}
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-bold text-foreground">
                          View details
                          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </button>
                    ))}
                </div>
              </CardShell>
            </div>
          </Section>

          {/* ---------------- service & account ---------------- */}
          <Section id="service" title="Service & account">
            <div className="grid gap-3 lg:grid-cols-2">
              <CardShell
                icon={ShieldCheck}
                tint="lime"
                title="Service"
                subtitle={lifecycle.sub}
                action={
                  <Button size="sm" className="rounded-md" onClick={editService}>
                    <Pencil className="size-3.5" /> Edit
                  </Button>
                }
              >
                <div className="grid gap-2">
                  <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-muted px-3.5 py-3">
                    <StatusPill status={lifecycle.status} label={lifecycle.label.toUpperCase()} />
                    <span className="text-[12px] text-muted-foreground">{lifecycle.sub}</span>
                  </div>
                  <PillRow label="Service started" value={hotel.service.startedOn} />
                  <PillRow label="Churn date" value={hotel.service.churnDate ?? "—"} />
                  <PillRow label="Configuration stage" value={hotel.service.configurationStage} />
                  <button
                    type="button"
                    onClick={() =>
                      toast("Management company change", {
                        description: "Opening the transfer workflow.",
                      })
                    }
                    className="group flex items-center justify-between gap-4 rounded-lg bg-tint-sand px-3.5 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                  >
                    <span className="text-[12.5px] font-medium text-foreground/70">
                      Management company
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-foreground">
                      Start change
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>
              </CardShell>

              <CardShell
                icon={Sparkles}
                tint="peach"
                title="Account"
                subtitle={`Added ${hotel.service.addedOn}`}
              >
                <div className="grid gap-2">
                  <PillRow label="Basic account" value={hotel.service.configurationStage} />
                  <PillRow label="Added on" value={hotel.service.addedOn} />
                  <PillRow
                    label="Set by"
                    value={`${hotel.service.setBy} · ${hotel.service.setOn}`}
                  />
                  <div className="rounded-lg bg-surface-muted px-3.5 py-3">
                    <div className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                      Tags
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {hotel.service.tags.length === 0 ? (
                        <Muted>No tags added yet.</Muted>
                      ) : (
                        hotel.service.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 rounded-md bg-accent px-2.5 py-1 text-[12px] font-semibold text-primary"
                          >

                            {t}
                            <button
                              type="button"
                              onClick={() => removeTag(t)}
                              aria-label={`Remove ${t}`}
                              className="opacity-60 hover:opacity-100"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-md border border-dashed border-border px-3 py-1 text-[12px] font-semibold text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="size-3" /> Add tag
                          </button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-56 space-y-2 rounded-lg">
                          <Input
                            value={tagQuery}
                            onChange={(e) => setTagQuery(e.target.value)}
                            placeholder="Search tags…"
                            className="h-8"
                          />
                          <div className="space-y-1.5">
                            {tagLibrary
                              .filter((t) => t.toLowerCase().includes(tagQuery.toLowerCase()))
                              .map((t) => (
                                <label
                                  key={t}
                                  className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-[13px] hover:bg-muted"
                                >
                                  <Checkbox
                                    checked={hotel.service.tags.includes(t)}
                                    onCheckedChange={(c) => (c ? addTag(t) : removeTag(t))}
                                  />
                                  {t}
                                </label>
                              ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </CardShell>
            </div>
          </Section>

          {/* ---------------- links ---------------- */}
          <Section id="links" title="Links & references">
            <Surface className="rounded-xl">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Hotel",
                    tint: "sky" as Tint,
                    icon: Link2,
                    items: hotel.links
                      .filter((l) => l.label !== "Hotline")
                      .map((l) => ({
                        label: l.label,
                        href: l.label === "Website" ? hotel.website : l.href,
                        external: l.label === "Website",
                      })),
                  },
                  {
                    title: "Contact",
                    tint: "peach" as Tint,
                    icon: Phone,
                    items: [
                      { label: "(954) 533-7846", href: "tel:+19545337846", external: false },
                      { label: "Hotline · front desk", href: "#hotline", external: false },
                    ],
                  },
                  {
                    title: "Product",
                    tint: "violet" as Tint,
                    icon: ExternalLink,
                    items: [
                      {
                        label: `Booking engine · ${hotel.identity.bookingEngine}`,
                        href: hotel.website,
                        external: true,
                      },
                      { label: "Guest landing page", href: "#guest-landing", external: false },
                    ],
                  },
                  {
                    title: "Messaging",
                    tint: "mint" as Tint,
                    icon: Mail,
                    items: [
                      { label: "Proxy · (954) 408-4642", href: "#proxy", external: false },
                      { label: "Hosted messaging · Not started", href: "#hosted", external: false },
                    ],
                  },
                ].map((col) => (
                  <div key={col.title}>
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className={cn(
                          "flex size-8 items-center justify-center rounded-xl",
                          tintBg[col.tint],
                          tintInk[col.tint],
                        )}
                      >
                        <col.icon className="size-4" />
                      </span>
                      <span className="text-[12.5px] font-bold text-foreground">{col.title}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {col.items.map((l) => (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            target={l.external ? "_blank" : undefined}
                            rel="noreferrer"
                            className="flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-[13px] text-foreground transition-colors hover:bg-surface-muted"
                          >
                            <span className="truncate">{l.label}</span>
                            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Surface>
          </Section>
        </div>
      </div>

      {/* ---------------- drawers ---------------- */}
      <EditDrawer target={edit} onOpenChange={(o) => !o && setEdit(null)} />

      <Sheet open={detail !== null} onOpenChange={(o) => !o && setDetail(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader className="border-b border-border px-6 py-5">
            <SheetTitle>
              {detail === "features"
                ? "Feature status"
                : detail === "jobs"
                  ? "PMS sync jobs"
                  : "Onboarding steps"}
            </SheetTitle>
            <SheetDescription>
              {detail === "features"
                ? `${hotel.health.healthy} / ${hotel.health.total} healthy`
                : detail === "jobs"
                  ? `Last run ${hotel.localTime} · ${hotel.sync.pms}`
                  : hotel.onboarding?.stage}
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 py-5">
            {detail === "features" ? (
              <div className="space-y-5">
                {hotel.health.groups.map((g) => (
                  <div key={g.label}>
                    <SubTitle>{g.label}</SubTitle>
                    <div className="divide-y divide-border">
                      {g.features.map((f) => (
                        <Row
                          key={f.name}
                          label={f.name}
                          value={<StatusDot status={f.status} label={healthWord[f.status]} />}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {detail === "jobs" ? (
              hotel.sync.jobs.length ? (
                <div className="divide-y divide-border">
                  {hotel.sync.jobs.map((j) => (
                    <Row
                      key={j.name}
                      label={j.name}
                      value={<StatusDot status={j.status} label={healthWord[j.status]} />}
                    />
                  ))}
                </div>
              ) : (
                <Muted>No PMS jobs are configured for this hotel yet.</Muted>
              )
            ) : null}

            {detail === "onboarding" && hotel.onboarding ? (
              <div className="space-y-6">
                <div>
                  <SubTitle>Mandatory steps</SubTitle>
                  <div className="divide-y divide-border">
                    {hotel.onboarding.mandatory.map((m) => (
                      <Row
                        key={m.label}
                        label={m.label}
                        value={
                          m.state === "complete" ? (
                            <StatusDot status="healthy" label="Done" />
                          ) : (
                            <span className="text-[13px] font-semibold text-primary">
                              {m.action ?? "Set up"}
                            </span>
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <SubTitle>Optional</SubTitle>
                  <div className="divide-y divide-border">
                    {hotel.onboarding.optional.map((o) => (
                      <Row key={o.label} label={o.label} value={o.value} />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
