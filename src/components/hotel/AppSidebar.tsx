import {
  BarChart3,
  Bell,
  Building2,
  CalendarRange,
  CreditCard,
  FileText,
  Gauge,
  Home,
  LineChart,
  MessageSquare,
  ScrollText,
  Settings2,
  ShieldCheck,
  Upload,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Item = { label: string; icon: React.ComponentType<{ className?: string }> };

const groups: { title: string; items: Item[] }[] = [
  { title: "", items: [{ label: "Home", icon: Home }] },
  {
    title: "Reports",
    items: [
      { label: "Return on investment", icon: LineChart },
      { label: "Messaging performance", icon: BarChart3 },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Billing and payments", icon: CreditCard },
      { label: "User management", icon: Users },
      { label: "Compliance", icon: ShieldCheck },
      { label: "Hotel details", icon: Building2 },
      { label: "Configure notifications", icon: Bell },
    ],
  },
  {
    title: "Admin",
    items: [
      { label: "Add guest data", icon: Upload },
      { label: "Hotel setup", icon: Settings2 },
      { label: "Usage stats", icon: Gauge },
      { label: "Occupancy", icon: CalendarRange },
      { label: "Monthly revenue", icon: FileText },
      { label: "Monthly OTA conversions", icon: MessageSquare },
      { label: "Contracts", icon: ScrollText },
    ],
  },
];

export function AppSidebar({ active = "Hotel details" }: { active?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden shrink-0 p-3 pr-0 transition-[width] duration-300 lg:block",
        collapsed ? "w-[86px]" : "w-[248px]",
      )}
    >
      <div className="sticky top-3 flex h-[calc(100vh-24px)] flex-col rounded-xl border border-sidebar-border bg-sidebar shadow-[var(--shadow-card)]">
        <div className={cn("flex h-[64px] items-center", collapsed ? "justify-center px-3" : "px-4")}>
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-[13px] font-extrabold text-primary-foreground">
              M
            </span>
            {!collapsed ? (
              <div className="min-w-0">
                <div className="truncate text-[14px] font-extrabold tracking-tight text-sidebar-foreground">MarinaView</div>
              </div>
            ) : null}
          </div>
          {!collapsed ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 rounded-full"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse navigation"
              title="Collapse navigation"
            >
              <PanelLeftClose className="size-4" />
            </Button>
          ) : null}
        </div>
        {collapsed ? (
          <div className="flex justify-center py-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full"
              onClick={() => setCollapsed(false)}
              aria-label="Expand navigation"
              title="Expand navigation"
            >
              <PanelLeftOpen className="size-4" />
            </Button>
          </div>
        ) : null}
        <nav className={cn("flex-1 overflow-y-auto pb-6", collapsed ? "px-3" : "px-3 pt-2")}>
          {groups.map((g) => (
             <div key={g.title || "main"} className="mb-5">
               {!collapsed && g.title ? (
                <div className="px-3 pb-2 text-[10px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                  {g.title}
                </div>
              ) : null}
              <ul className="space-y-1">
                {g.items.map((it) => {
                  const isActive = it.label === active;
                  return (
                    <li key={it.label}>
                      <button
                        type="button"
                        aria-current={isActive ? "page" : undefined}
                        aria-label={collapsed ? it.label : undefined}
                        title={collapsed ? it.label : undefined}
                        className={cn(
                          "group relative flex w-full items-center rounded-lg text-left text-[12.5px] transition-all duration-200",
                          collapsed ? "h-10 justify-center px-0" : "gap-3 px-3 py-2.5",
                          isActive
                            ? "bg-primary font-semibold text-primary-foreground shadow-[var(--shadow-card)]"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        <it.icon className="size-4 shrink-0" />
                        {!collapsed ? <span className="truncate">{it.label}</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className={cn("m-3 rounded-lg bg-surface-muted p-2", collapsed ? "flex justify-center" : "")}> 
          <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "px-1 py-1")}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-lime-foreground">LT</span>

            {!collapsed ? (
              <div className="min-w-0">
                <div className="truncate text-[12px] font-semibold text-foreground">Lakshay Tyagi</div>
                <div className="truncate text-[11px] text-muted-foreground">Customer success</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
