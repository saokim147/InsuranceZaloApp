import "@/css/tailwind.scss";
import "zmp-ui/zaui.css";

// Your stylesheet

import { createRoot } from "react-dom/client";
import appConfig from "../app-config.json";
import InsuranceApp from "./components/app";
if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig as any;
}

const root = createRoot(document.getElementById("app")!);
root.render(InsuranceApp());
