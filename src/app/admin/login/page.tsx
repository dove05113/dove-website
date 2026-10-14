"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { auth } from "@/lib/firebase-auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/admin");
    } catch (error) {
      console.error(error);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-8 sm:px-6 font-montserrat">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
              <LockKeyhole size={19} strokeWidth={2} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Dove Print Solutions
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
              Welcome back.
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to manage your website content and services.
            </p>
          </div>

          {/* Login form */}
          <div className="border border-gray-200 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="h-12 w-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-12 w-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-950 focus:bg-white"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 bg-gray-950 px-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Authorized administrators only.
          </p>
        </div>
      </div>
    </main>
  );
}