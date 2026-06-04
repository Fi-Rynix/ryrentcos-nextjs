"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/customer/landing-page");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Branding (sticky, no scroll) */}
      <div className="hidden lg:flex lg:w-[45%] lg:sticky lg:top-0 lg:h-screen lg:items-center lg:justify-center bg-brand-red">
        <Image
          src="/logo/ryrentcos.png"
          alt="RyRentCos"
          width={350}
          height={53}
          className="object-contain"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-[55%] items-center justify-center bg-stone-200 p-6">
        <div className="w-full max-w-[360px] flex flex-col items-center gap-6">
          {/* Tab Switcher */}
          <div className="flex w-full items-center justify-center">
            <div className="inline-flex rounded-full border border-brand-red bg-white p-1">
              <button
                type="button"
                onClick={() => setIsLoginMode(true)}
                className={`h-8 px-6 rounded-[20px] text-xs font-bold transition-all ${
                  isLoginMode
                    ? "bg-brand-red text-white"
                    : "bg-transparent text-brand-red hover:bg-brand-red/10"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLoginMode(false)}
                className={`h-8 px-6 rounded-[20px] text-xs font-bold transition-all ${
                  !isLoginMode
                    ? "bg-brand-red text-white"
                    : "bg-transparent text-brand-red hover:bg-brand-red/10"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-black">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username"
                className="h-11 w-full rounded-[25px] border border-brand-red bg-white px-5 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-red-soft"
              />
            </div>

            {/* Email - Only for Register */}
            {!isLoginMode && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-black">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="h-11 w-full rounded-[25px] border border-brand-red bg-white px-5 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-red-soft"
                />
              </div>
            )}

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="h-11 w-full rounded-[25px] border border-brand-red bg-white px-5 pr-10 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-red-soft"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/50"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    ) : (
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password - Only for Register */}
            {!isLoginMode && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-black">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your Password"
                    className="h-11 w-full rounded-[25px] border border-brand-red bg-white px-5 pr-10 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-red-soft"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showConfirmPassword ? (
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                      ) : (
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password - Only for Login */}
            {isLoginMode && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2"
                >
                  <div className={`flex h-4 w-4 items-center justify-center border border-black/50 ${rememberMe ? "bg-brand-red" : "bg-white"}`}>
                    {rememberMe && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5L4 8L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-black">Remember me</span>
                </button>
                <a href="#" className="text-[10px] font-bold text-black hover:underline">
                  Forgot Password ?
                </a>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-400/30" />
              <span className="text-[10px] text-zinc-500">or</span>
              <div className="h-px flex-1 bg-zinc-400/30" />
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-zinc-800"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M19.8684 10.2281C19.8693 9.54663 19.8113 8.8664 19.695 8.19482H10.1992V12.046H15.638C15.5267 12.6611 15.2911 13.2475 14.9455 13.7697C14.5999 14.292 14.1513 14.7393 13.6269 15.0848V17.5846H16.8728C18.7734 15.8444 19.8684 13.271 19.8684 10.2281Z" fill="#4285F4" />
                <path d="M10.1997 20C12.9169 20 15.2049 19.1139 16.8733 17.5862L13.6274 15.0864C12.7239 15.6947 11.5604 16.0419 10.1997 16.0419C7.57328 16.0419 5.34408 14.2836 4.54693 11.9143H1.20312V14.4906C2.0412 16.1467 3.32629 17.5389 4.91494 18.5118C6.50358 19.4847 8.33324 19.9999 10.1997 20Z" fill="#34A853" />
                <path d="M4.54686 11.914C4.12543 10.6724 4.12543 9.32793 4.54686 8.08639V5.51013H1.20305C0.498032 6.90333 0.130859 8.44096 0.130859 10.0002C0.130859 11.5594 0.498032 13.097 1.20305 14.4902L4.54686 11.914Z" fill="#FBBC04" />
                <path d="M10.1997 3.95879C11.6356 3.93549 13.0231 4.47429 14.0623 5.45872L16.9362 2.60469C15.1139 0.904883 12.6996 -0.0283412 10.1997 0.000656061C8.33324 0.000740536 6.50358 0.515984 4.91494 1.48886C3.32629 2.46174 2.0412 3.85397 1.20312 5.5101L4.54693 8.08636C5.34408 5.71704 7.57328 3.95879 10.1997 3.95879Z" fill="#EA4335" />
              </svg>
              <span className="text-xs text-white">Continue with Google</span>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="h-10 w-full rounded-[25px] bg-brand-red text-sm font-bold text-white transition-colors hover:bg-brand-red-soft"
            >
              {isLoginMode ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}