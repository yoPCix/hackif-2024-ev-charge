import { createRoot } from "react-dom/client";
import { App } from "./components/adhoc/App";
import "@/assets/styles/index.css";
import "@ids/style-scaffolding";

createRoot(document.getElementById("root")!).render(<App />);
