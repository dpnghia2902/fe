import "./Container.css";

interface Props {
  children: React.ReactNode;
  width?: string;
  height?: string;
  maxWidth?: string;
  padding?: string;
}

export default function Container({
  children,
  width = "100%",
  height = "auto",
  maxWidth = "1200px",
  padding = "16px",
}: Props) {
  return (
    <div
      className="container"
      style={{
        "--width": width,
        "--height": height,
        "--maxWidth": maxWidth,
        "--padding": padding,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
