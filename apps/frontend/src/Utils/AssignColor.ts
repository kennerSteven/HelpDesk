import { COLORS } from "../Components/Common/colors";

export default function projectColor(color?: string) {
    if (color === "RED") {
      return COLORS.RED.bgClass;
    }
    if (color === "BLUE") {
      return COLORS.BLUE.bgClass;
    }
    if (color === "YELLOW") {
      return COLORS.YELLOW.bgClass;
    }
    if (color === "GREEN") {
      return COLORS.GREEN.bgClass;
    }
    if (color === "PURPLE") {
      return COLORS.PURPLE.bgClass;
    }
    return "bg-slate-200";
  }
