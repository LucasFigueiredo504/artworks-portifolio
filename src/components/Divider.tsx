import divider from "../assets/divider.svg";

export const Divider = ({ flip = false }: { flip?: boolean }) => (
  <div
    className="w-full"
    style={{
      height: "80px",
      margin: "-35px 0",
      backgroundImage: `url(${divider})`,
      backgroundRepeat: "repeat-x",
      backgroundSize: "auto 100%",
      backgroundPosition: "center",
      filter: "brightness(0)",
      transform: flip ? "scaleY(-1)" : undefined,
    }}
  />
);
