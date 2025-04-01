import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet";
import { FileText, Mail, BookOpen, Menu } from "lucide-react";
import { WritingType } from "../data/types";

interface MobileNavigationProps {
  selectedType: WritingType;
  setSelectedType: (type: WritingType) => void;
}

export default function MobileNavigation({
  selectedType,
  setSelectedType
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  
  const types = [
    { id: "essay" as WritingType, label: "Essays", icon: FileText },
    { id: "letter" as WritingType, label: "Letters", icon: Mail },
    { id: "story" as WritingType, label: "Stories", icon: BookOpen }
  ];
  
  return (
    <div className="block md:hidden border-b sticky top-0 bg-background z-10">
      <div className="flex items-center p-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            {/* The SheetContent component expects children as a prop */}
            <div className="py-4">
              <h2 className="font-semibold text-lg mb-4">Writing Practice</h2>
              <div className="space-y-1">
                {types.map(type => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      setSelectedType(type.id);
                      setOpen(false);
                    }}
                  >
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="ml-4">
          <h1 className="font-medium">Writing Practice</h1>
          <p className="text-sm text-muted-foreground capitalize">{selectedType}s</p>
        </div>
      </div>
    </div>
  );
}