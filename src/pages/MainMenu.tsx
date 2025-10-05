import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/hooks/useAudio';

const MainMenu = () => {
  const navigate = useNavigate();
  const { playBgMusic, playSfxClick } = useAudio();

  useEffect(() => {
    playBgMusic();
  }, [playBgMusic]);

  const handlePlay = () => {
    playSfxClick();
    navigate('/name-entry');
  };

  const handleSettings = () => {
    playSfxClick();
    navigate('/settings');
  };

  const handleQuit = () => {
    playSfxClick();
    window.close();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-space-deep to-space-purple flex flex-col items-center justify-center overflow-hidden">
      <div className="stars-container absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="z-10 text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-space-text animate-fade-in">Your Home in Space</h1>
          <p className="text-xl text-space-muted animate-fade-in">A small, calm experience about the wonders of the cosmos.</p>
        </div>
        
        <div className="flex flex-col gap-6 items-center">
          <Button onClick={handlePlay} variant="space" size="lg" className="w-48">
            Play
          </Button>
          <Button onClick={handleSettings} variant="space" size="lg" className="w-48">
            Settings
          </Button>
          <Button onClick={handleQuit} variant="space" size="lg" className="w-48">
            Quit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
