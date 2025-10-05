import { useEffect, useRef } from 'react';

export const useAudio = () => {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxClickRef = useRef<HTMLAudioElement | null>(null);
  const dialogueBoxRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Import audio files
    import('@/assets/bgMusic.mp3').then(module => {
      bgMusicRef.current = new Audio(module.default);
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.5;
    });

    import('@/assets/sfxClick.mp3').then(module => {
      sfxClickRef.current = new Audio(module.default);
      sfxClickRef.current.volume = 0.7;
    });

    import('@/assets/dialogue-box.mp3').then(module => {
      dialogueBoxRef.current = new Audio(module.default);
      dialogueBoxRef.current.volume = 0.6;
    });
  }, []);

  const playBgMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const stopBgMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
  };

  const playSfxClick = () => {
    if (sfxClickRef.current) {
      sfxClickRef.current.currentTime = 0;
      sfxClickRef.current.play().catch(e => console.log('SFX play failed:', e));
    }
  };

  const playDialogueBox = () => {
    if (dialogueBoxRef.current) {
      dialogueBoxRef.current.currentTime = 0;
      dialogueBoxRef.current.play().catch(e => console.log('Dialogue play failed:', e));
    }
  };

  const setBgMusicVolume = (volume: number) => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = volume / 100;
    }
  };

  const setSfxVolume = (volume: number) => {
    if (sfxClickRef.current) {
      sfxClickRef.current.volume = volume / 100;
    }
    if (dialogueBoxRef.current) {
      dialogueBoxRef.current.volume = volume / 100;
    }
  };

  return {
    playBgMusic,
    stopBgMusic,
    playSfxClick,
    playDialogueBox,
    setBgMusicVolume,
    setSfxVolume,
  };
};
