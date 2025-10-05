import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/hooks/useAudio';
import { useEffect } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const { musicVolume, setMusicVolume, sfxVolume, setSfxVolume } = useGame();
  const { playSfxClick, setBgMusicVolume, setSfxVolume: setAudioSfxVolume } = useAudio();

  useEffect(() => {
    setBgMusicVolume(musicVolume);
    setAudioSfxVolume(sfxVolume);
  }, [musicVolume, sfxVolume, setBgMusicVolume, setAudioSfxVolume]);

  const handleBack = () => {
    playSfxClick();
    navigate('/menu');
  };

  const handleMusicVolumeChange = (value: number[]) => {
    setMusicVolume(value[0]);
  };

  const handleSfxVolumeChange = (value: number[]) => {
    setSfxVolume(value[0]);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-space-deep to-space-purple flex items-center justify-center overflow-hidden">
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

      <div className="z-10 w-full max-w-2xl p-8">
        <Card className="bg-space-panel border-space-border p-8 space-y-8">
          <h2 className="text-4xl font-bold text-space-text text-center">Settings</h2>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xl text-space-text">Music</label>
                <span className="text-space-accent font-mono">{musicVolume}%</span>
              </div>
              <Slider
                value={[musicVolume]}
                onValueChange={handleMusicVolumeChange}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xl text-space-text">Sound Effects</label>
                <span className="text-space-accent font-mono">{sfxVolume}%</span>
              </div>
              <Slider
                value={[sfxVolume]}
                onValueChange={handleSfxVolumeChange}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Button onClick={handleBack} variant="space" className="w-full" size="lg">
            Back to Menu
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
