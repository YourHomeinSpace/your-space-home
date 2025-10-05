import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAudio } from '@/hooks/useAudio';
import { missions } from '@/data/gameData';

const MissionSelect = () => {
  const navigate = useNavigate();
  const { playSfxClick } = useAudio();

  const handleSelectMission = () => {
    playSfxClick();
    navigate('/mission');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-space-deep to-space-purple overflow-auto">
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

      <div className="relative z-10 container mx-auto p-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-space-text">Mission Control</h2>
          <p className="text-space-muted">Use WASD or arrow keys to navigate</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <Card key={mission.id} className="bg-space-panel border-space-border p-6 space-y-4 hover:border-space-accent transition-colors">
              <h3 className="text-2xl font-bold text-space-text">{mission.name}</h3>
              <p className="text-space-muted">{mission.description}</p>
              <p className="text-space-accent text-sm">Duration: {mission.duration} days</p>
              <Button onClick={handleSelectMission} variant="space" className="w-full">
                Select Mission
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionSelect;
