import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import { PokemonProvider } from "./context/PokemonContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <PokemonProvider>
            <RouterProvider router={router} />
        </PokemonProvider>
    </React.StrictMode>
);
