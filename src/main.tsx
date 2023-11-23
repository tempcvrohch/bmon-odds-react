import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router.js';
import type { SerializedStyles } from "@emotion/serialize";

declare module "react" {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        css?: SerializedStyles;
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
