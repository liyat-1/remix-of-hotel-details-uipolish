import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export type EditField = { label: string; value: string; hint?: string };
export type EditTarget = {
  title: string;
  fields: EditField[];
  onSave?: (values: Record<string, string>) => void;
} | null;

export function EditDrawer({
  target,
  onOpenChange,
}: {
  target: EditTarget;
  onOpenChange: (open: boolean) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!target) return;
    setValues(Object.fromEntries(target.fields.map((f) => [f.label, f.value])));
  }, [target]);

  const dirty =
    !!target && target.fields.some((f) => (values[f.label] ?? f.value) !== f.value);

  const save = () => {
    if (!target) return;
    target.onSave?.(values);
    toast.success("Changes saved", { description: `${target.title} updated` });
    onOpenChange(false);
  };

  return (
    <Sheet open={!!target} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="text-lg">Edit {target?.title}</SheetTitle>
          <SheetDescription>
            Changes apply to this hotel record as soon as you save.
          </SheetDescription>
        </SheetHeader>
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            {target?.fields.map((f) => (
              <div key={f.label} className="space-y-1.5">
                <Label htmlFor={f.label} className="text-xs text-muted-foreground">
                  {f.label}
                </Label>
                <Input
                  id={f.label}
                  value={values[f.label] ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [f.label]: e.target.value }))
                  }
                />
                {f.hint ? <p className="text-xs text-muted-foreground">{f.hint}</p> : null}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
            <span className="mr-auto text-xs text-muted-foreground">
              {dirty ? "Unsaved changes" : "No changes yet"}
            </span>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!dirty}>
              Save changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
