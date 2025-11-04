import { useState, useEffect } from "react";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ username: false, email: false, password: false });

  // Load saved settings from localStorage (demo purpose)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("safeMindUser"));
    if (saved) {
      setUsername(saved.username);
      setEmail(saved.email);
      setPassword(saved.password);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true });
    if (!username || !email || !password) return;

    // Save settings locally (replace with backend API in real app)
    localStorage.setItem("safeMindUser", JSON.stringify({ username, email, password }));
    alert("Settings saved successfully!");
  };

  const usernameError = touched.username && !username ? "Username is required" : "";
  const emailError = touched.email && !email ? "Email is required" : "";
  const passwordError = touched.password && !password ? "Password is required" : "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#d0e7ff] via-[#eaf3ff] to-[#c5dcff] p-4">
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-xl border border-[#a6c8ff] rounded-3xl shadow-xl text-center transition-transform hover:scale-[1.02]">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-center items-center mb-3">
            <div className="bg-[#6aa5ff] text-white p-4 rounded-full shadow-md animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 .552-.448 1-1 1H5v6a2 2 0 002 2h10a2 2 0 002-2v-6h-6c-.552 0-1-.448-1-1V5h-4v6z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#1a365d]">Account Settings</h2>
          <p className="text-[#3b5b87]/80 text-sm mt-1">Manage your SafeMind profile</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <Label htmlFor="username" className="text-[#1a365d] font-medium">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
              className={`mt-2 border border-[#a4c8ff]/60 rounded-2xl focus:ring-2 focus:ring-[#6aa5ff] focus:border-[#6aa5ff] transition-colors ${usernameError ? "border-red-400" : ""}`}
            />
            {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-[#1a365d] font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              className={`mt-2 border border-[#a4c8ff]/60 rounded-2xl focus:ring-2 focus:ring-[#6aa5ff] focus:border-[#6aa5ff] transition-colors ${emailError ? "border-red-400" : ""}`}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="text-[#1a365d] font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              className={`mt-2 border border-[#a4c8ff]/60 rounded-2xl focus:ring-2 focus:ring-[#6aa5ff] focus:border-[#6aa5ff] transition-colors ${passwordError ? "border-red-400" : ""}`}
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#6aa5ff] hover:bg-[#5894ff] text-white font-semibold py-3 rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Save Settings
          </Button>
        </form>

        {/* Footer */}
        <div className="text-xs text-[#4a6fa1]/80 mt-8">
          SafeMind © 2025 — All Rights Reserved
        </div>
      </Card>
    </div>
  );
}
