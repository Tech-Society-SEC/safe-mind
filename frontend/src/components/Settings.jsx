import { useState } from "react";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ username: true, email: true, password: true });

    if (!username || !email || !password) return;

    // Replace with actual settings save logic
    console.log("Settings saved:", { username, email, password });
  };

  // Validation messages
  const usernameError = touched.username && !username ? "Username is required" : false;
  const emailError = touched.email && !email ? "Email is required" : false;
  const passwordError = touched.password && !password ? "Password is required" : false;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-calm p-4">
      <Card className="w-full max-w-md p-6 bg-gradient-calm border-0 shadow-soft">
        <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              label="Username"
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
              error={usernameError}
              className="border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              error={emailError}
              className="border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              error={passwordError}
              className="border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Save Settings
          </Button>
        </form>
      </Card>
    </div>
  );
}
