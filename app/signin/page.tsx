"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Navbar from "@/components/navbar";
import { app } from "../../firebaseConfig";
import { AuthProvider } from "@/context/auth";
// Blue brand colors
const BRAND_PRIMARY = "#2563eb"; // Blue-600
const BRAND_ACCENT = "#3b82f6";  // Blue-500


const auth = getAuth(app);

const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
};

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmail(email, password);
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Sign in failed");
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            await signInWithGoogle();
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Google sign in failed");
        }
    };

    return (
        <> 
        <AuthProvider>
        <Navbar />
        </AuthProvider>
        <title>Sign In - AndroVehicleTrack</title>\
        <meta name="description" content="Sign in to AndroVehicleTrack to manage your electric vehicle charging stations." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        


            <div
                style={{
                    minHeight: "100vh",
                    background: `#000013`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        maxWidth: 400,
                        width: "100%",
                        background: "#fff",
                        padding: 32,
                        borderRadius: 16,
                        boxShadow: "0 4px 24px rgba(59,130,246,0.10)",
                        border: `1px solid ${BRAND_ACCENT}22`,
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            color: BRAND_PRIMARY,
                            marginBottom: 24,
                            fontWeight: 700,
                            letterSpacing: 1,
                            fontSize: 28,
                        }}
                    >
                        Sign In
                    </h2>
                    <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: 12,
                                borderRadius: 8,
                                border: `1px solid ${BRAND_ACCENT}55`,
                                outline: "none",
                                fontSize: 16,
                                background: "#f0f9ff",
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: 12,
                                borderRadius: 8,
                                border: `1px solid ${BRAND_ACCENT}55`,
                                outline: "none",
                                fontSize: 16,
                                background: "#f0f9ff",
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: 12,
                                background: BRAND_PRIMARY,
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                fontWeight: 600,
                                fontSize: 16,
                                cursor: "pointer",
                                transition: "background 0.2s",
                            }}
                        >
                            Sign In
                        </button>
                        {error && (
                            <div style={{ color: "#ef4444", textAlign: "center", marginTop: 4, fontSize: 14 }}>
                                {error}
                            </div>
                        )}
                    </form>
                    <div style={{ textAlign: "center", margin: "18px 0 8px", color: "#64748b", fontSize: 15 }}>
                        or
                    </div>
                    <button
                        onClick={handleGoogleSignIn}
                        style={{
                            padding: 12,
                            background: "#fff",
                            color: BRAND_PRIMARY,
                            border: `1.5px solid ${BRAND_ACCENT}`,
                            borderRadius: 8,
                            width: "100%",
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            boxShadow: "0 2px 8px rgba(59,130,246,0.06)",
                            transition: "border 0.2s",
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 48 48" style={{ marginRight: 8 }}>
                            <g>
                                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.5 29.5 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
                                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.7 16.1 19.5 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.5 29.5 2 24 2 15.6 2 8.2 7.7 6.3 14.7z" />
                                <path fill="#FBBC05" d="M24 44c5.5 0 10.5-1.8 14.4-4.9l-6.6-5.4C29.9 37 24 37 24 37c-5.9 0-10.7-3.1-13.7-7.6l-7 5.4C8.2 40.3 15.6 44 24 44z" />
                                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 6.5-11.7 6.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.5 29.5 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
                            </g>
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </>
    );
}
