import { useState } from "react";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Switch } from "@/components/UI/switch";
import { Textarea } from "@/components/UI/textarea";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Trash2,
  Moon,
  Sun,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", title: "Profile", icon: User, description: "Manage your personal information" },
  { id: "notifications", title: "Notifications", icon: Bell, description: "Control how and when you receive notifications" },
  { id: "privacy", title: "Privacy & Security", icon: Shield, description: "Manage your privacy settings and data" },
  { id: "appearance", title: "Appearance", icon: Palette, description: "Customize the look and feel" }
];

export function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [settings, setSettings] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    bio: "Using WellnessChat to support my mental health journey.",
    dailyReminders: true,
    moodTrackingReminders: true,
    emergencyAlerts: true,
    emailNotifications: false,
    soundEnabled: true,
    dataSharing: false,
    analyticsEnabled: true,
    locationSharing: false,
    darkMode: false,
    fontSize: "medium",
    reducedMotion: false
  });

  const updateSetting = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const exportData = () => console.log("Exporting user data...");
  const deleteAccount = () => console.log("Account deletion requested...");

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={settings.name}
            onChange={(e) => updateSetting("name", e.target.value)}
            className="border-border/50 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={settings.email}
            onChange={(e) => updateSetting("email", e.target.value)}
            className="border-border/50 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={settings.bio}
          onChange={(e) => updateSetting("bio", e.target.value)}
          placeholder="Tell us a bit about yourself..."
          className="min-h-[100px] border-border/50 focus:ring-primary focus:border-primary resize-none"
        />
      </div>
      <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
        Save Profile Changes
      </Button>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-4">
      {[
        { key: "dailyReminders", label: "Daily Check-in Reminders", desc: "Get reminded to track your mood daily" },
        { key: "moodTrackingReminders", label: "Mood Tracking Reminders", desc: "Gentle reminders to log your feelings" },
        { key: "emergencyAlerts", label: "Emergency Alerts", desc: "Important crisis support notifications" },
        { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
      ].map(item => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{item.label}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
          <Switch
            checked={settings[item.key]}
            onCheckedChange={(checked) => updateSetting(item.key, checked)}
          />
        </div>
      ))}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
        <div className="flex-1 flex items-center">
          {settings.soundEnabled ? (
            <Volume2 className="h-4 w-4 mr-3 text-primary" />
          ) : (
            <VolumeX className="h-4 w-4 mr-3 text-muted-foreground" />
          )}
          <div>
            <h4 className="font-medium text-foreground">Sound Effects</h4>
            <p className="text-sm text-muted-foreground">Enable notification sounds</p>
          </div>
        </div>
        <Switch
          checked={settings.soundEnabled}
          onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
        />
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-4">
      {[
        { key: "dataSharing", label: "Data Sharing", desc: "Share anonymized data to improve the service" },
        { key: "analyticsEnabled", label: "Analytics", desc: "Help us improve with usage analytics" },
        { key: "locationSharing", label: "Location Sharing", desc: "Share location for emergency services" }
      ].map(item => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{item.label}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
          <Switch
            checked={settings[item.key]}
            onCheckedChange={(checked) => updateSetting(item.key, checked)}
          />
        </div>
      ))}
      <div className="border-t border-border pt-6 flex space-x-4">
        <Button variant="outline" onClick={exportData} className="border-primary/20 text-primary hover:bg-primary/5">
          <Download className="h-4 w-4 mr-2" /> Export My Data
        </Button>
        <Button variant="destructive" onClick={deleteAccount} className="bg-destructive hover:bg-destructive/90">
          <Trash2 className="h-4 w-4 mr-2" /> Delete Account
        </Button>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
        <div className="flex-1 flex items-center">
          {settings.darkMode ? <Moon className="h-4 w-4 mr-3 text-primary" /> : <Sun className="h-4 w-4 mr-3 text-yellow-500" />}
          <div>
            <h4 className="font-medium text-foreground">Dark Mode</h4>
            <p className="text-sm text-muted-foreground">Use dark theme for better visibility</p>
          </div>
        </div>
        <Switch checked={settings.darkMode} onCheckedChange={(checked) => updateSetting("darkMode", checked)} />
      </div>
      <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
        <h4 className="font-medium text-foreground mb-2">Font Size</h4>
        <select
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={settings.fontSize}
          onChange={(e) => updateSetting("fontSize", e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra-large">Extra Large</option>
        </select>
      </div>
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30">
        <div className="flex-1">
          <h4 className="font-medium text-foreground">Reduced Motion</h4>
          <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
        </div>
        <Switch checked={settings.reducedMotion} onCheckedChange={(checked) => updateSetting("reducedMotion", checked)} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case "profile": return renderProfileSection();
      case "notifications": return renderNotificationsSection();
      case "privacy": return renderPrivacySection();
      case "appearance": return renderAppearanceSection();
      default: return renderProfileSection();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">Customize your SafeMind experience</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 p-6 bg-card border-border/50 shadow-soft h-fit">
          <nav className="space-y-2">
            {settingsSections.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-auto p-4 transition-all duration-300",
                    isActive && "bg-primary/10 text-primary shadow-soft border border-primary/20"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-muted-foreground")} />
                  <div className="text-left">
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{section.description}</div>
                  </div>
                </Button>
              )
            })}
          </nav>
        </Card>
        <Card className="lg:col-span-3 p-6 bg-gradient-calm border-0 shadow-soft">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              {settingsSections.find(s => s.id === activeSection)?.title}
            </h3>
            <p className="text-muted-foreground mt-1">
              {settingsSections.find(s => s.id === activeSection)?.description}
            </p>
          </div>
          {renderContent()}
        </Card>
      </div>
    </div>
  );
}