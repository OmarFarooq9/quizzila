import { useCallback, useRef, useState } from "react";

type SoundType = "click" | "correct" | "wrong" | "complete";

const SOUND_URLS: Record<SoundType, string> = {
  click: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  correct: "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3",
  wrong: "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3",
  complete: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3",
};

export const useSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    correct: null,
    wrong: null,
    complete: null,
  });

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMuted) return;

      if (!audioRefs.current[type]) {
        audioRefs.current[type] = new Audio(SOUND_URLS[type]);
        audioRefs.current[type]!.volume = 0.3;
      }

      const audio = audioRefs.current[type]!;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return { playSound, isMuted, toggleMute };
};
