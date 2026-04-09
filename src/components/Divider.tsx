import divider from "../assets/divider.svg";

export const Divider = ({
  flip = false,
  color = false,
}: {
  flip?: boolean;
  color?: boolean;
}) => (
  <div
    className="w-full"
    style={{
      height: "80px",
      margin: "-40px 0",
      backgroundImage: `url(${divider})`,
      backgroundRepeat: "repeat-x",
      backgroundSize: "auto 100%",
      backgroundPosition: "center",
      filter: color ? undefined : "brightness(0)",
      transform: flip ? "scaleY(-1)" : undefined,
    }}
  />
);
