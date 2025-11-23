import React, { useState, useEffect } from "react";
import {
  SiSpotify,
  SiApplemusic,
  SiYoutubemusic,
  SiSoundcloud,
  SiBeatport,
} from "react-icons/si";

// Reusable track card component that accepts track data as props
// Usage:
// <TrackCard
//   track={{
//     coverSrc: "https://...",
//     title: "Song Title",
//     artists: "Artist Name",
//     platforms: {
//       spotify: "https://open.spotify.com/track/...",
//       appleMusic: "https://music.apple.com/...",
//       youtubeMusic: "https://music.youtube.com/..."
//     }
//   }}
// />

export default function TrackCard({ track, onPlay }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const handlePlayClick = (e) => {
    if (onPlay) onPlay(e, track);
    setOpen(true);
  };

  // Animate in on open
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [open]);

  // After fade-out/scale-out finishes, unmount the modal
  useEffect(() => {
    if (!visible && open) {
      const id = setTimeout(() => setOpen(false), 200);
      return () => clearTimeout(id);
    }
  }, [visible, open]);

  const Row = ({ label, href, icon }) => {
    const disabled = !href;
    return (
      <div className="flex items-center justify-between border-b  px-4 py-3 last:border-b-0">
        <span className="flex items-center gap-3 text-[15px] font-medium text-black">
          {icon}
          <span className="sr-only">{label}</span>
        </span>
        {disabled ? (
          <button
            type="button"
            disabled
            className="button cursor-not-allowed rounded-full border border-black/20 px-4 py-1 text-sm text-black/40"
            aria-disabled="true"
          >
            Play
          </button>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/30 px-4 py-1 text-sm text-black transition hover:bg-black/5"
          >
            Play
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center gap-4 rounded-xl bg-black/30 p-3 shadow-md backdrop-blur-sm">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
          <img
            src={track.coverSrc}
            alt={track.title ? `${track.title} cover art` : "cover art"}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_128/sample.jpg";
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-white">
            {track.title}
          </div>
          <div className="truncate text-xs text-white/70">{track.artists}</div>
        </div>

        <button
          type="button"
          onClick={handlePlayClick}
          className=" rounded-full border px-4 py-1 text-sm transition"
          aria-label={track.title ? `Play ${track.title}` : "Play"}
        >
          Play
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`absolute inset-0 transition-opacity duration-400 ${
              visible ? "opacity-100" : "opacity-100"
            }`}
            onClick={() => setVisible(false)}
          />
          <div
            className={`relative z-10 w-[min(92vw,520px)] overflow-hidden rounded-2xl shadow-2xl transition-transform duration-400 ease-out ${
              visible ? "scale-100 translate-y-0" : "scale-95 translate-y-2"
            }`}
          >
            <div className="flex items-center gap-3 bg-[#000000dc] px-4 py-4">
              <div className="h-12 w-12 overflow-hidden rounded-lg">
                <img
                  src={track.coverSrc}
                  alt={track.title ? `${track.title} cover art` : "cover art"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_128/sample.jpg";
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold text-white">
                  {track.title}
                </div>
                <div className="truncate text-xs text-white/70">
                  {track.artists}
                </div>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="button ml-auto py-1 text-xs text-white/80 hover:bg-white/10"
              >
              Close
              </button>
            </div>

            <div className="divide-y divide-black/30 bg-white">
              <Row
                icon={<SiSpotify className="text-[#1DB954]" size={20} />}
                label="Spotify"
                href={track.platforms?.spotify}
              />
              <Row
                icon={<SiApplemusic className="text-black" size={20} />}
                label="Apple Music"
                href={track.platforms?.appleMusic}
              />
              <Row
                icon={<SiYoutubemusic className="text-[#FF0000]" size={20} />}
                label="YouTube Music"
                href={track.platforms?.youtubeMusic}
              />
              <Row
                icon={<SiSoundcloud className="text-[#FF5500]" size={20} />}
                label="SoundCloud"
                href={track.platforms?.soundcloud}
              />
              <Row
                icon={<SiBeatport className="text-[#FF5500]" size={20} />}
                label="Beatport"
                href={track.platforms?.beatport}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

TrackCard.defaultProps = {
  track: {
    coverSrc:
      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_128/sample.jpg",
    title: "",
    artists: "",
    platforms: {
      spotify: "",
      appleMusic: "",
      youtubeMusic: "",
    },
  },
  onPlay: () => {},
};
