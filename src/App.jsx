import { useState } from "react";
import { SiTiktok, SiInstagram, SiSoundcloud } from "react-icons/si";
import "./App.css";
import TrackCard from "./commponents/TrackCard";
import Gallery from "./commponents/Gallery";
import Tiktok from "./commponents/Tiktok";
import LetsTalk from "./commponents/LetsTalk";
import Press from "./commponents/Press";
import AnimatedSection from "./commponents/AnimatedSection";
import LoadingScreen from "./commponents/LoadingScreen";

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
      <div className="relative min-h-screen animate-fadeIn">
        <AnimatedSection direction="scale" delay={0}>
          <div className="relative inline-block mx-auto">
            <img
              className=" 
              mx-auto 
                 [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
                 [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_100%)]
                 [mask-repeat:no-repeat] [mask-size:100%_100%]
                 [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%] top-0 
               w-[clamp(350px,40vw,400px)] 
               mt-4"
              src="https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_auto,dpr_auto/v1758105243/%D7%A2%D7%99%D7%A6%D7%95%D7%91_%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_8_zhoon8.png"
              alt="chaki main pic"
              loading="eager"
              fetchPriority="high"
            />
            <h1
              style={{ fontSize: "35px" }}
              className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black]"
            >
              CHAKI
            </h1>
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={200}>
          <div className="flex flex-row justify-center gap-5 mt-10px">
            <a
              aria-label="Instagram"
              href="https://instagram.com/your"
              className="text-black"
            >
              <SiInstagram size={28} className="text-black" />
            </a>
            <a
              aria-label="TikTok"
              href="https://tiktok.com/@your"
              className="text-black"
            >
              <SiTiktok size={28} className="text-black" />
            </a>
            <a
              aria-label="SoundCloud"
              href="https://soundcloud.com/your"
              className="text-black"
            >
              <SiSoundcloud size={28} className="text-black" />
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
            <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black]">
              Latest Releases
            </h2>
            <TrackCard
              track={{
                coverSrc:
                  "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_300,c_fill/v1758105243/%D7%A2%D7%99%D7%A6%D7%95%D7%91_%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_8_zhoon8.png",
                title: "",
                artists: "CHAKI",
                platforms: {
                  spotify: "https://open.spotify.com/track/example1",
                  appleMusic: "https://music.apple.com/example1",
                  youtubeMusic: "https://music.youtube.com/watch?v=example1",
                },
              }}
            />
            <TrackCard
              track={{
                coverSrc:
                  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_128/sample.jpg",
                title: "Another Track",
                artists: "CHAKI",
                platforms: {
                  spotify: "https://open.spotify.com/track/example2",
                  appleMusic: "",
                  youtubeMusic: "https://music.youtube.com/watch?v=example2",
                },
              }}
            />
          </div>
        </AnimatedSection>

        {/* Gallery Section */}
        <AnimatedSection direction="up" delay={0}>
          <div className="mt-12 ">
            <Gallery
              images={[
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448652/IMG_2982_f4actr.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448628/IMG_6872_xp0l5p.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448644/IMG_6878_haqugn.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448637/IMG_6882_hwon3z.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448648/IMG_2992_nmahzj.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448627/IMG_6875_xr41w5.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448655/IMG_2991_eumyny.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758448633/IMG_7660_bjew3t.jpg",
              ]}
            />
          </div>
        </AnimatedSection>

        {/* TikTok Videos Section */}
        <AnimatedSection direction="up" delay={0}>
          <div className="mt-12">
            <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black]">
              Moments
            </h2>
            <br />

            <Tiktok
              videos={[
                "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450447/IMG_0547_zpcuus.mov",
                "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450455/IMG_0862_ujhivq.mov",
                "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450465/IMG_9009_mj3x6i.mov",
                "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450471/IMG_9552_fl1n0f.mov",
                "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450439/IMG_1242_qnusj3.mov",
                "https://res.cloudinary.com/dpgnqgyxe/video/upload/v1758450840/IMG_9012_c9u9si.mov",
                "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_40mb.mp4",
                "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_50mb.mp4",
              ]}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0}>
          <div className="mt-12 ">
            <Press
              images={[
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451316/IMG_3028_zk3pud.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451313/IMG_2967_urtled.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451302/IMG_6888_flfivn.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451298/IMG_2961_r63yar.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451296/IMG_6914_mztdfj.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451330/IMG_3042_d7khnr.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451320/IMG_3041_vvryao.jpg",
                "https://res.cloudinary.com/dpgnqgyxe/image/upload/f_auto,q_auto,w_400,c_fill/v1758451327/IMG_3045_i8pqv4.jpg",
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
    </>
  );
}

export default App;
