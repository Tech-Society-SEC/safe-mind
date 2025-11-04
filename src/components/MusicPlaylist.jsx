import { useState } from "react";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Play, Pause, SkipForward, SkipBack, Heart, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const playlists = [
  {
    id: 1,
    name: "Calm & Relaxing",
    description: "Peaceful tracks for meditation and relaxation",
    songs: [
      { title: "Weightless", artist: "Marconi Union", duration: "8:08", loved: true },
      { title: "Clair de Lune", artist: "Claude Debussy", duration: "4:20", loved: false },
      { title: "Samsara", artist: "Audiomachine", duration: "3:45", loved: true },
    ],
  },
  {
    id: 2,
    name: "Uplifting & Energizing",
    description: "Positive vibes to boost your mood",
    songs: [
      { title: "Here Comes the Sun", artist: "The Beatles", duration: "3:05", loved: true },
      { title: "Good Vibrations", artist: "The Beach Boys", duration: "3:36", loved: false },
      { title: "I Can See Clearly Now", artist: "Johnny Nash", duration: "2:48", loved: true },
    ],
  },
  {
    id: 3,
    name: "Focus & Productivity",
    description: "Background music for concentration",
    songs: [
      { title: "Ludovico Einaudi - Nuvole Bianche", artist: "Ludovico Einaudi", duration: "5:57", loved: false },
      { title: "Brain.fm Focus", artist: "Brain.fm", duration: "10:00", loved: true },
      { title: "Forest Sounds", artist: "Nature Sounds", duration: "15:00", loved: false },
    ],
  },
];

export default function MusicPlaylist() {
  const [activePlaylist, setActivePlaylist] = useState(0);
  const [playingSong, setPlayingSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const togglePlay = (songTitle) => {
    setPlayingSong(playingSong === songTitle ? null : songTitle);
  };

  const filteredSongs = playlists[activePlaylist].songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Music for Wellness</h2>
        <p className="text-muted-foreground">
          Curated playlists to support your emotional wellbeing
        </p>
      </div>

      {/* Playlist Tabs */}
      <div className="flex flex-wrap gap-2">
        {playlists.map((playlist, index) => (
          <Button
            key={playlist.id}
            variant={activePlaylist === index ? "default" : "outline"}
            className={cn(
              "transition-all duration-300",
              activePlaylist === index
                ? "bg-gradient-accent text-accent-foreground shadow-glow"
                : "border-border/50 hover:border-accent-strong/50"
            )}
            onClick={() => setActivePlaylist(index)}
          >
            {playlist.name}
          </Button>
        ))}
      </div>

      {/* Current Playlist */}
      <Card className="p-6 bg-gradient-calm border-0 shadow-soft">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {playlists[activePlaylist].name}
          </h3>
          <p className="text-muted-foreground mb-4">
            {playlists[activePlaylist].description}
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search songs..."
              className="pl-10 border-border/50 focus:ring-accent-strong focus:border-accent-strong"
            />
          </div>
        </div>

        {/* Song List */}
        <div className="space-y-2">
          {filteredSongs.map((song, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 border border-transparent hover:border-border/30",
                playingSong === song.title && "bg-accent/20 border-accent-strong/30"
              )}
            >
              {/* Play/Pause Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
                onClick={() => togglePlay(song.title)}
              >
                {playingSong === song.title ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{song.title}</h4>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
              </div>

              {/* Duration */}
              <span className="text-sm text-muted-foreground">{song.duration}</span>

              {/* Love Button */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  song.loved
                    ? "text-secondary-accent hover:text-secondary-accent/80"
                    : "text-muted-foreground hover:text-secondary-accent"
                )}
              >
                <Heart className={cn("h-4 w-4", song.loved && "fill-current")} />
              </Button>
            </div>
          ))}
        </div>

        {/* Player Controls */}
        {playingSong && (
          <div className="mt-6 p-4 bg-card rounded-lg border border-border/50 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Now Playing</h4>
                <p className="text-sm text-muted-foreground">{playingSong}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => togglePlay(playingSong)}
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Playlist Button */}
        <Button
          variant="outline"
          className="w-full mt-4 border-primary/20 text-primary hover:bg-primary/5"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Playlist
        </Button>
      </Card>
    </div>
  );
}
