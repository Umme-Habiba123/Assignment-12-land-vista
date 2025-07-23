// src/pages/Forbidden.jsx
import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            color: "#333",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: "20px",
            textAlign: "center",
        }}>
            <h1 style={{ fontSize: "6rem", marginBottom: "0" }}>403</h1>
            <h2 style={{ marginTop: "0", marginBottom: "20px" }}>Access Forbidden</h2>
            <p style={{ maxWidth: "400px", marginBottom: "30px", fontSize: "1.2rem" }}>
                Sorry, you do not have permission to access this resource or page.
                If you have arrived here by mistake, please click the button below to return to the home page.
            </p>
            <Link to="/" style={{
                textDecoration: "none",
                backgroundColor: "#007bff",
                color: "white",
                padding: "12px 30px",
                borderRadius: "5px",
                fontWeight: "600",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "background-color 0.3s ease",
            }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#007bff"}
            >
                Back to Home
            </Link>
        </div>
    );
};

export default Forbidden;
