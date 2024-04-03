import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.css";

const container = document.getElementById('root');
const root = createRoot(container!); // TypeScript 사용 시 createRoot(container!)로 적용
root.render(<App />);




