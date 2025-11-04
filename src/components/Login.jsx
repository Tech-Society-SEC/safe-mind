import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";


export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Replace with real authentication
    console.log("Logging in with:", { email, password });
    setError("");
    if (onLogin) onLogin({ email });

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-calm p-4">
      <Card className="w-full max-w-md p-6 bg-gradient-calm border-0 shadow-soft">
        <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Please login to continue
        </p>

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Login
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          Don’t have an account? <Link to="/signin" className="text-primary font-medium">
    Sign In
  </Link>
        </p>
      </Card>
    </div>
  );
}


