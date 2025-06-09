"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";
import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
// Make sure the firebaseConfig file exists and exports 'app'
import { app } from "../firebaseConfig"; // Adjust the path if your firebaseConfig is in a different directory

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);

      if (firebaseUser) {
        const { uid, email } = firebaseUser;

        // Try fetching user profile from Supabase
        const { data, error } = await supabase
          .from("users")
          .select("id, name, email")
          .eq("uid", uid)
          .single();

        if (!error && data) {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
          });
        } else {
          // If not found, fall back to Firebase email
          setUser({
            id: uid,
            name: null,
            email: email ?? "No Email",
          });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
