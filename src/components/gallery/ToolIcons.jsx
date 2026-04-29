import { TOOL_ICON_MAP } from "./toolIconMap";

export default function ToolIcons({ tools }) {
  const toolList = (() => {
    if (!tools) return [];
    if (Array.isArray(tools)) return tools;
    return String(tools)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  })();

  if (!toolList.length) return null;

  return (
    <div className="gallery-tool-icons" aria-label="Tools">
      {toolList.map((tool) => {
        const iconSrc = TOOL_ICON_MAP[tool];
        return (
          <span key={tool} className="gallery-tool-icon" title={tool}>
            {iconSrc ? <img src={iconSrc} alt={tool} /> : <span>{tool}</span>}
          </span>
        );
      })}
    </div>
  );
}

