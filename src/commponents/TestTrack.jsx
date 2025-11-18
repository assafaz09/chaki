import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import {
  SiSpotify,
  SiApplemusic,
  SiYoutubemusic,
  SiSoundcloud,
  SiBeatport,
} from "react-icons/si";

const STREAMING_LINKS = [
  {
    label: "Spotify",
    icon: SiSpotify,
    url: "https://open.spotify.com/track/1TvbM3eWXpAsj7FOmC0fP7",
    color: "#1DB954",
  },
  {
    label: "Apple Music",
    icon: SiApplemusic,
    url: "https://music.apple.com/il/album/lacosita/1838472762",
    color: "",
  },
  {
    label: "YouTube",
    icon: SiYoutubemusic,
    url: "https://youtu.be/xugPUIMirH0",
    color: "#FF0000",
  },
  {
    label: "SoundCloud",
    icon: SiSoundcloud,
    url: "https://on.soundcloud.com/GeOk24GNGdJBsDN2jT",
    color: "#FF5500",
  },
  {
    label: "Beatport",
    icon: SiBeatport,
    url: "https://www.beatport.com/release/lacosita/5363299",
    color: "#00FF66",
  },
];

export default function TestTrack() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ }}>
      <Card sx={{ display: "flex", bgcolor: "rgba(15,42,58,0.85)", color: "#fff",height:"130px"}}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, height:"100px" }}>
          <CardContent  sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              LACOSITA
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              chaki
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setMenuOpen((prev) => !prev)}
              sx={{
                font:"icon",
                mt: 2,
                borderColor: "rgba(255,255,255,0.5)",
                color: "#fff",
                letterSpacing: "0.1em",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              PLAY
            </Button>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 120 }}
          image="https://res.cloudinary.com/dpgnqgyxe/image/upload/v1759058600/LACOSITA_owmjsw.jpg"
          alt="Live from space album cover"
        />
      </Card>

      <Collapse  in={menuOpen} timeout="auto" unmountOnExit>
        <Box
          sx={{
            
            mt: 2,
            display: "grid",
            gap: 1,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          {STREAMING_LINKS.map(({ label, icon: Icon, url, color }) => (
            <Button
              key={label}
              component="a"
              href={url}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              startIcon={<Icon size={18} color={color} />}
              sx={{
                justifyContent: "flex-start",
                gap: 1,
                bgcolor: "rgba(255,255,255,0.1)",
                color: "black",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

