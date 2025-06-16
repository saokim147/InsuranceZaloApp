import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [
      zaloMiniApp(),
      react(),
      {
        name: "override-config",
        config: () => ({
          build: {
            target: "esnext",
          },
        }),
      },
    ],
    esbuild: {
      target: "esnext",
    },
    optimizeDeps: {
      include: [
        "maplibre-gl",
        "prop-types",
        "react-transition-group",
        "use-sync-external-store",
        "use-sync-external-store/with-selector",
      ],
    },

    build: {
      assetsInlineLimit: 0,
      commonjsOptions: {
        include: [/node_modules/],
        requireReturnsDefault: "auto",
      },
    },
    resolve: {
      alias: {
        "@": "/src",
        react: "react",
        "react-dom": "react-dom",
        "prop-types": "prop-types",
        "use-sync-external-store/with-selector":
          "use-sync-external-store/shim/with-selector",
      },
    },
  });
};
