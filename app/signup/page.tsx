'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import Navbar from '@/components/navbar';
import { createClient } from '@supabase/supabase-js';
import { AuthProvider } from "@/context/auth";
import {
    
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

// Firebase config from env
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Supabase config from env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize Firebase and Supabase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveUserToSupabase = async (uid: string, name: string, email: string) => {
        await supabase.from('users').insert([{ uid, name, email }]);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
            await updateProfile(userCred.user, { displayName: form.name });
            await saveUserToSupabase(userCred.user.uid, form.name, form.email);
            router.push('/signin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await saveUserToSupabase(user.uid, user.displayName || '', user.email || '');
            router.push('/signin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Brand colors
    const brandPrimary = 'bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#38bdf8]'; // blue gradient
    const brandAccent = 'bg-[#38bdf8]'; // cyan-400

    return (
    <AuthProvider>
        
        <>
        <title>Sign Up - AndroTechlist</title>
        <meta name="description" content="Create your account on AndroVehicleTrack to explore the latest in technology and gadgets." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <Navbar />
        <div className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-[#000013] `}>
            {/* 3D/Blob Background */}
            <div className="absolute inset-0 -z-10">
                <svg width="100%" height="100%" viewBox="0 0 800 600" className="w-full h-full">
                    <defs>
                        <radialGradient id="bg-gradient" cx="50%" cy="50%" r="80%">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.8" />
                        </radialGradient>
                    </defs>
                    <ellipse cx="400" cy="300" rx="400" ry="300" fill="url(#bg-gradient)" />
                    <ellipse cx="650" cy="100" rx="120" ry="80" fill="#2563eb" opacity="0.25" />
                    <ellipse cx="150" cy="500" rx="140" ry="90" fill="#38bdf8" opacity="0.18" />
                </svg>
            </div>
            <div className="max-w-md w-full mx-auto mt-10 p-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md border border-blue-100">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-2" style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)' }}>
                        <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="16" fill="#fff" />
                            <path d="M10 22v-8l6-4 6 4v8" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M14 22v-4h4v4" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-blue-900 mb-1">Create your account</h2>
                    <p className="text-blue-700 text-sm">Join Andro_Vehicle_Track and explore the future!</p>
                </div>
                <form onSubmit={handleSignup} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none bg-blue-50 placeholder-blue-400 text-blue-900"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none bg-blue-50 placeholder-blue-400 text-blue-900"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none bg-blue-50 placeholder-blue-400 text-blue-900"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 transition-all shadow-md"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="my-5 flex items-center">
                    <div className="flex-1 h-px bg-blue-200" />
                    <span className="mx-3 text-blue-400 font-semibold text-xs">OR</span>
                    <div className="flex-1 h-px bg-blue-200" />
                </div>
                <button
                    onClick={handleGoogleSignup}
                    disabled={loading}
                    className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 shadow"
                >
                    <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block">
                        <g>
                            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 19.5-21 0-1.4-.1-2.7-.3-4z"/>
                            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.6 16.1 19.5 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.3 3.8-17 9.7z"/>
                            <path fill="#FBBC05" d="M24 45c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.7 36.9 27 38 24 38c-6.1 0-10.7-2.9-13.7-7.1l-7 5.4C6.7 41.2 14.7 45 24 45z"/>
                            <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.3 3.8-17 9.7z"/>
                        </g>
                    </svg>
                    {loading ? 'Processing...' : 'Sign Up with Google'}
                </button>
                {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
                <div className="mt-6 text-center text-blue-700">
                    Already have an account?{' '}
                    <a href="/signin" className="text-cyan-600 underline font-semibold hover:text-blue-600">
                        Sign In
                    </a>
                </div>
            </div>
        </div>
        </>
        </AuthProvider>
    );
}