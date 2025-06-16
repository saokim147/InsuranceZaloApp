import "@/css/tailwind.scss";
import "@/css/zmp.scss";
import "@/css/app.scss";
import { createRoot } from "react-dom/client";
import InsuranceApp from "./components/app";
import "./i8n";
const root = createRoot(document.getElementById("app")!);
root.render(InsuranceApp());
