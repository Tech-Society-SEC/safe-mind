import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Play, Pause, Heart, Search, Plus, Music } from "lucide-react";
import { cn } from "@/lib/utils";

// --- 🎵 Default emotion-based playlists with hardcoded songs ---
const defaultPlaylists = [
  {
    id: 1,
    name: "Calm & Relaxing",
    moodType: "Calm",
    description: "Peaceful tracks for meditation and relaxation",
    songs: [
      { title: "Weightless", artist: "Marconi Union", url: "https://www.youtube.com/watch?v=UfcAVejslrU", loved: true },
      { title: "Clair de Lune", artist: "Claude Debussy", url: "https://www.youtube.com/watch?v=CvFH_6DNRCY", loved: false },
      { title: "Samsara", artist: "Audiomachine", url: "https://www.youtube.com/watch?v=3ZVqUeIY9cE", loved: true },
    ],
  },
  {
    id: 2,
    name: "Uplifting & Energizing",
    moodType: "Happy",
    description: "Positive vibes to boost your mood",
    songs: [
      { title: "Here Comes the Sun", artist: "The Beatles", url: "https://www.youtube.com/watch?v=KQetemT1sWc", loved: true },
      { title: "Good Vibrations", artist: "The Beach Boys", url: "https://www.youtube.com/watch?v=mdt0SOqPJcg", loved: false },
      { title: "I Can See Clearly Now", artist: "Johnny Nash", url: "https://www.youtube.com/watch?v=NkwJ-g0iJ6w", loved: true },
    ],
  },
  {
    id: 3,
    name: "Focus & Productivity",
    moodType: "Focused",
    description: "Background music for concentration",
    songs: [
      { title: "Nuvole Bianche", artist: "Ludovico Einaudi", url: "https://www.youtube.com/watch?v=kcihcYEOeic", loved: false },
      { title: "Brain.fm Focus", artist: "Brain.fm", url: "https://www.youtube.com/watch?v=xjX6m4xwu3g", loved: true },
      { title: "Forest Sounds", artist: "Nature Sounds", url: "https://www.youtube.com/watch?v=OdIJ2x3nxzQ", loved: false },
    ],
  },
  {
    id: 4,
    name: "Anger Release",
    moodType: "Angry",
    description: "High-energy tracks to let off steam",
    songs: [
      { title: "In the End", artist: "Linkin Park", url: "https://www.youtube.com/watch?v=eVTXPUF4Oz4", loved: false },
      { title: "Believer", artist: "Imagine Dragons", url: "https://www.youtube.com/watch?v=7wtfhZwyrcc", loved: true },
      { title: "Lose Yourself", artist: "Eminem", url: "https://www.youtube.com/watch?v=_Yhyp-_hX2s", loved: false },
    ],
  },
];

export default function MusicPlaylist() {
  const [playlists, setPlaylists] = useState(defaultPlaylists);
  const [activePlaylist, setActivePlaylist] = useState(0);
  const [playingSong, setPlayingSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPlaylist, setShowAddPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongUrl, setNewSongUrl] = useState("");
  const [recommendedPlaylist, setRecommendedPlaylist] = useState(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("userPlaylists");
    const savedMoodEntries = localStorage.getItem("moodEntries");

    if (savedPlaylists) {
      setPlaylists([...defaultPlaylists, ...JSON.parse(savedPlaylists)]);
    }

    if (savedMoodEntries) {
      const moods = JSON.parse(savedMoodEntries);
      if (moods.length > 0) {
        const latestMood = moods[0].mood.toLowerCase();
        const match = defaultPlaylists.find((p) =>
          p.moodType.toLowerCase().includes(latestMood)
        );
        if (match) setRecommendedPlaylist(match);
      }
    }
  }, []);

  // 💾 Save only user playlists to localStorage
  useEffect(() => {
    const userPlaylists = playlists.filter((p) => p.id > 4);
    localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));
  }, [playlists]);

  const togglePlay = (songTitle) => {
    setPlayingSong(playingSong === songTitle ? null : songTitle);
  };

  const addNewPlaylist = () => {
    if (!newPlaylistName.trim()) return alert("Enter a playlist name");
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      description: "Custom playlist",
      songs: [],
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName("");
    setShowAddPlaylist(false);
    alert("Playlist created successfully!");
  };

  const addSongToActivePlaylist = () => {
    if (!newSongTitle || !newSongArtist || !newSongUrl)
      return alert("Enter song title, artist, and URL");
    const updated = [...playlists];
    updated[activePlaylist].songs.push({
      title: newSongTitle,
      artist: newSongArtist,
      url: newSongUrl,
      loved: false,
    });
    setPlaylists(updated);
    setNewSongTitle("");
    setNewSongArtist("");
    setNewSongUrl("");
  };

  const filteredSongs = playlists[activePlaylist]?.songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Music for Wellness</h2>
        <p className="text-muted-foreground">
          Emotion-based playlists and your personal creations 🎧
        </p>
      </div>

      {/* 💭 Mood Recommendation */}
      {recommendedPlaylist && (
        <Card className="p-4 border border-accent-strong/30 bg-accent/10">
          <div className="flex items-center space-x-3 mb-2">
            <Music className="text-accent" />
            <h3 className="font-semibold text-lg">
              Recommended for your mood:{" "}
              <span className="text-accent">{recommendedPlaylist.name}</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {recommendedPlaylist.description}
          </p>
        </Card>
      )}

      {/* Playlist Tabs */}
      <div className="flex flex-wrap gap-2">
        {playlists.map((playlist, index) => (
          <Button
            key={playlist.id}
            variant={activePlaylist === index ? "default" : "outline"}
            onClick={() => setActivePlaylist(index)}
          >
            {playlist.name}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => setShowAddPlaylist(true)}
          className="border-dashed border-primary/50 text-primary"
        >
          <Plus className="h-4 w-4 mr-2" /> New Playlist
        </Button>
      </div>

      {/* Add Playlist Modal */}
      {showAddPlaylist && (
        <Card className="p-4 border border-border bg-card shadow-md">
          <h4 className="font-medium mb-2">Create New Playlist</h4>
          <Input
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="mb-2"
          />
          <Button onClick={addNewPlaylist} className="w-full">
            Save Playlist
          </Button>
        </Card>
      )}

      {/* Current Playlist */}
      <Card className="p-6 bg-gradient-calm border-0 shadow-soft">
        <h3 className="text-xl font-semibold mb-2">
          {playlists[activePlaylist]?.name}
        </h3>
        <p className="text-muted-foreground mb-4">
          {playlists[activePlaylist]?.description}
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs..."
            className="pl-10"
          />
        </div>

        {/* Song List */}
        <div className="space-y-4">
          {filteredSongs?.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No songs yet. Add your favorites below 👇
            </p>
          ) : (
            filteredSongs.map((song, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 rounded-lg transition-all hover:bg-muted/50 border border-transparent hover:border-border/30",
                  playingSong === song.title && "bg-accent/20 border-accent-strong/30"
                )}
              >
                <div className="flex items-center space-x-4 w-full">
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
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{song.title}</h4>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <Heart
                    className={cn(
                      "h-4 w-4 cursor-pointer",
                      song.loved ? "text-red-500 fill-red-500" : "text-muted-foreground"
                    )}
                  />
                </div>

                {/* 🎵 ReactPlayer appears only when song is playing */}
                {playingSong === song.title && song.url && (
                  <div className="w-full mt-2">
                    <ReactPlayer url={song.url} controls width="100%" height="50px" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Only show Add Song for user-created playlists */}
        {activePlaylist > 3 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Song title"
              value={newSongTitle}
              onChange={(e) => setNewSongTitle(e.target.value)}
            />
            <Input
              placeholder="Artist"
              value={newSongArtist}
              onChange={(e) => setNewSongArtist(e.target.value)}
            />
            <Input
              placeholder="YouTube/Spotify URL"
              value={newSongUrl}
              onChange={(e) => setNewSongUrl(e.target.value)}
            />
            <Button onClick={addSongToActivePlaylist}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
