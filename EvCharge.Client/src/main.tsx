import { createRoot } from "react-dom/client";
import { App } from "./components/adhoc/App";
import "@/assets/styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
