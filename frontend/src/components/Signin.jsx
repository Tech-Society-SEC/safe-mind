import { useState } from "react";
import { Card } from "@/components/UI/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";

export default function Signin({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Replace with real signup logic
    console.log("Signing up with:", { name, email, password });
    setError("");
    if (onSignup) onSignup({ name, email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-calm p-4">
      <Card className="w-full max-w-md p-6 bg-gradient-calm border-0 shadow-soft">
        <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Create Account</h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Sign up to start your wellness journey
        </p>

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          Already have an account?  <Link to="/login" className="text-primary font-medium ml-1">
          Login
        </Link>
        </p>
      </Card>
    </div>
  );
}


