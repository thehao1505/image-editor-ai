import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/features/editor/components/color-picker";

interface FillColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorSidebarProps) => {

  const value = editor?.getActiveFillColor() || FILL_COLOR;

  const onClose = () => {
    onChangeActiveTool("select");
  }

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader 
        title="Fill color"
        description="Add fill color to your elements"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange}/>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose}/>
    </aside>
  )
};