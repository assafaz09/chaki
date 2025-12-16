import { useState } from "react";
import { SiTiktok, SiInstagram, SiSoundcloud, SiSpotify } from "react-icons/si";
import "./App.css";
import TrackCard from "./commponents/TrackCard";
import Gallery from "./commponents/Gallery";
import LetsTalk from "./commponents/LetsTalk";
import Press from "./commponents/Press";
import AnimatedSection from "./commponents/AnimatedSection";
import LoadingScreen from "./commponents/LoadingScreen";
import Footer from "./commponents/Footer";
import InfiniteCarousel from "./commponents/InfiniteCarousel";
import HorizontalVideoCarousel from "./commponents/HorizontalVideoCarousel";
import ScrollSlider from "./commponents/ScrollSlider";
import Moments from "./commponents/Moments";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <div>
        {/* Scroll Slider */}
        <ScrollSlider />

        <div className="home relative min-h-screen animate-fadeIn ">
          <AnimatedSection direction="scale" delay={1}>
            <div
              style={{
                position: "relative",
                width: "fit-content",
                margin: "0 auto",
              }}
            >
              <img
                src="https://res.cloudinary.com/dpgnqgyxe/image/upload/v1764669071/chaki-main-removebg-preview_yc1dtz.png"
                alt="chaki"
                style={{
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                  zIndex: 1,
                  position: "relative",
                  opacity: 0.25,

                  // --- התוספת החדשה ---
                  // יצירת גרדיאנט אנכי: שחור למעלה (נראה) -> שקוף למטה (נעלם)
                  // אנחנו מוסיפים גם את גרסת ה-Webkit עבור תמיכה בדפדפנים כמו כרום וספארי
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 50%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 50%, transparent 100%)",
                  // --------------------
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "48%",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
              {/* אפקט מוברש/דוהה מלמטה, ללא פס – משתלב לגמרי ברקע עם fade רחב יותר */}
            </div>
            <div
              className=""
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: "75%", // עלה ל-32% מהתמונה
                zIndex: 3,
                width: "100%",
                pointerEvents: "none",
              }}
            >
              <h1 className="shadow-dance-text">CHAKI</h1>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={200}>
            <div
              className="flex flex-row justify-center gap-10 mt-10px"
              style={{ position: "relative", zIndex: 4 }}
            >
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/_onlychaki_/"
                className="text-black"
              >
                <SiInstagram size={28} className="text-black" />
              </a>
              <a
                aria-label="TikTok"
                href="https://www.tiktok.com/@noam_zada?_t=ZS-8y1jaflWN9s&_r=1"
                className="text-black"
              >
                <SiTiktok size={28} className="text-black" />
              </a>
              <a
                aria-label="SoundCloud"
                href="https://soundcloud.com/chaki-901233941"
                className="text-black"
              >
                <SiSoundcloud size={28} className="text-black" />
              </a>
              <a
                aria-label="Spotify"
                href="https://open.spotify.com/artist/0mGKtM0f3dBqrrz9m9aZHR"
                className="text-black"
              >
                <SiSpotify size={28} className="text-black" />
              </a>
            </div>
          </AnimatedSection>

          {/* Dynamic Scroll Down Icon */}
          <AnimatedSection direction="up" delay={400}>
            <div className="flex justify-center mt-8">
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <svg
                  className="w-8 h-8 text-white/90 drop-shadow-[0_0_4px_black]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l8 8-8 8-8-8 8-8zm0 2.83L6.83 10 12 15.17 17.17 10 12 4.83z" />
                </svg>
                <div className="w-2 h-2 bg-white/90 rounded-full drop-shadow-[0_0_4px_black]"></div>
              </div>
            </div>
          </AnimatedSection>

          {/* Track Cards Section */}
          <AnimatedSection direction="up" delay={0}>
            <div className="mt-8 space-y-4 px-4">
              <h2 className=" text-3xl drop-shadow-[0_0_8px_black]">
                Latest Releases
              </h2>

              <TrackCard
                track={{
                  coverSrc:
                    "https://res.cloudinary.com/dpgnqgyxe/image/upload/v1759058600/LACOSITA_owmjsw.jpg",
                  title: "LACOSITA",
                  artists: "CHAKI",
                  platforms: {
                    spotify:
                      "https://open.spotify.com/track/1TvbM3eWXpAsj7FOmC0fP7?si=n-Ur_VpfTFajfCz2-eAkhg&context=spotify%3Aalbum%3A0UiuUN4359mCE1kYnAzkCH",
                    appleMusic:
                      "https://music.apple.com/il/album/lacosita/1838472762?i=1838472764&l=he",
                    youtubeMusic:
                      "https://youtu.be/xugPUIMirH0?si=vT9IJfpj0XUkJIQZ",
                    soundcloud: "https://on.soundcloud.com/GeOk24GNGdJBsDN2jT",
                    beatport:
                      "https://www.beatport.com/release/lacosita/5363299",
                  },
                }}
              />

              <TrackCard
                track={{
                  coverSrc:
                    "https://res.cloudinary.com/dpgnqgyxe/image/upload/v1761043498/WhatsApp_Image_2025-10-20_at_21.39.41_sqw5v7.jpg",
                  title: " DRUMLINE",
                  artists: "CHAKI, Cafe de anatolia ",
                  platforms: {
                    spotify:
                      "https://open.spotify.com/album/4gKWRg7ZAiRhd6v29foX4n?si=W9MANCDaRmqXGi2mJBSOeQ",
                    appleMusic:
                      "https://music.apple.com/il/album/drumline-single/1839479856?l=he",
                    youtubeMusic:
                      "https://youtu.be/s7_3CSB8rQQ?si=o5GTTgGWYgmYTy6D",
                    soundcloud: "https://on.soundcloud.com/KYoJjFWfxZziRhw5jK",
                    beatport:
                      "https://beatport.com/release/drumline/5382961?utm_source=ios&utm_content=release&utm_medium=share",
                  },
                }}
              />
              <TrackCard
                track={{
                  coverSrc:
                    "https://res.cloudinary.com/dpgnqgyxe/image/upload/v1765392456/IMG_4623_yhypck.jpg",
                  title: " Bb trickz - super REMIX",
                  artists: "CHAKI ",
                  platforms: {
                    soundcloud: "https://on.soundcloud.com/08Pgl6ktCbEsrkPaef",
                  },
                  comingSoonPlatforms: [
                    "spotify",
                    "appleMusic",
                    "youtubeMusic",
                    "beatport",
                  ],
                }}
              />
            </div>
          </AnimatedSection>

          {/* Gallery Section */}
          <AnimatedSection direction="up" delay={0}>
            <div className="mt-12 ">
              <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] p-6 [text-shadow:0_0_16px_black,0_0_24px_black]">
                Press
              </h2>
              <br />
              <InfiniteCarousel
                images={[
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448652/IMG_2982_f4actr.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448628/IMG_6872_xp0l5p.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448644/IMG_6878_haqugn.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448637/IMG_6882_hwon3z.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448648/IMG_2992_nmahzj.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448627/IMG_6875_xr41w5.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448655/IMG_2991_eumyny.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758448633/IMG_7660_bjew3t.jpg",
                ]}
                speed={20}
                pauseOnHover={true}
              />
            </div>
            <br />
            <br />
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0}>
            <div className="mt-12 p-10 ">
              <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black] mb-6 text-center">
                Moments
              </h2>
              <Moments
                videos={[
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1759147216/IMG_2077_cazoag.mp4", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1764662144/IMG_3996_c1mbbr.mov", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450840/IMG_9012_c9u9si.mov", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450471/IMG_9552_fl1n0f.mov", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450455/IMG_0862_ujhivq.mov",
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450447/IMG_0547_zpcuus.mov",
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450439/IMG_1242_qnusj3.mov",
                ]}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0}>
            <div className="mt-12 ">
              <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black]">
                New module
              </h2>
              <br />
              <InfiniteCarousel
                images={[
                  // "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451316/IMG_3028_zk3pud.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451313/IMG_2967_urtled.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/v1758451310/IMG_3034_gansdx.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451302/IMG_6888_flfivn.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451298/IMG_2961_r63yar.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451296/IMG_6914_mztdfj.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451330/IMG_3042_d7khnr.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451320/IMG_3041_vvryao.jpg",
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto:good,dpr_auto,w_1200,c_fill,g_auto/v1758451327/IMG_3045_i8pqv4.jpg",
                ]}
                speed={30}
                pauseOnHover={true}
              />
            </div>
            <br />
            <br />
          </AnimatedSection>

          {/* Horizontal Video Section */}
          <AnimatedSection direction="up" delay={0}>
            <div className="mt-12 p-9">
              <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black] mb-6 text-center">
                Live Set
              </h2>
              <HorizontalVideoCarousel
                videos={[
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1760965666/IMG_3692_1_sgymcd.mov", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1760965866/IMG_3693_cxo5z0.mov", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1760965758/IMG_3689_f9uzmb.mov", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1760966100/Untitled_video_-_Made_with_Clipchamp_3_ccvfcn.mp4", // החלף עם כתובת הסרטון שלך
                  "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1760967244/IMG_3697_3_vqzfdm.mov",
                ]}
              />
            </div>
          </AnimatedSection>

          {/* Contact Form Section */}
          <AnimatedSection direction="up" delay={0}>
            <div className="mt-12">
              <LetsTalk />
            </div>
          </AnimatedSection>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
