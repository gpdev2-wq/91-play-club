interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Icon({ name, className = '', filled, size, onClick, style: extraStyle }: IconProps) {
  const style: React.CSSProperties = { ...extraStyle };
  if (filled) style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  if (size) style.fontSize = size;

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {name}
    </span>
  );
}
