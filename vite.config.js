import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/TechMaster-Academy-Project/", // غيّرها لاسم الريبو بتاعك بالظبط
  plugins: [react()],
});
