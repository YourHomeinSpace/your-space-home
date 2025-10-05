import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { events as gameEvents } from '@/data/gameData';

const Mission = () => {
  const navigate = useNavigate();
  const { selectedSectors, sanity, setSanity, missionDay, setMissionDay, addEvent } = useGame();
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [dayProgress, setDayProgress] = useState(0);
  const [permanentConditions, setPermanentConditions] = useState<string[]>([]);

  useEffect(() => {
    if (missionDay <= 4) {
      const timer = setTimeout(() => {
        processDay();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => navigate('/report'), 2000);
    }
  }, [missionDay]);

  const processDay = () => {
    const possibleEvents = gameEvents.filter(event => {
      const hasRequiredSectors = event.requiredSectors.some(sector => 
        Object.keys(selectedSectors).includes(sector)
      );
      return !hasRequiredSectors || event.requiredSectors.length === 0;
    });

    if (possibleEvents.length > 0) {
      const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
      setCurrentEvent(randomEvent.name);
      addEvent(randomEvent.name);
      
      let newSanity = sanity - randomEvent.sanityLoss;
      
      if (randomEvent.perDay && randomEvent.condition) {
        setPermanentConditions(prev => [...prev, randomEvent.condition!]);
        for (let day = missionDay + 1; day <= 4; day++) {
          newSanity -= randomEvent.sanityLoss;
        }
      }
      
      setSanity(Math.max(0, newSanity));
    }

    setDayProgress(100);
    setTimeout(() => {
      setMissionDay(missionDay + 1);
      setDayProgress(0);
      setCurrentEvent(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-space-deep to-space-purple flex items-center justify-center overflow-hidden p-8">
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

      <div className="z-10 w-full max-w-4xl space-y-8">
        <Card className="bg-space-panel border-space-border p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-space-text mb-2">Day {missionDay} / 4</h2>
            <Progress value={dayProgress} className="w-full" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-space-text text-xl">Sanity Level</span>
              <span className="text-space-accent text-2xl font-bold">{Math.round(sanity)}%</span>
            </div>
            <Progress value={sanity} className="h-4" />
          </div>

          {currentEvent && (
            <div className="bg-space-deep border border-space-border rounded-lg p-6 animate-fade-in">
              <h3 className="text-space-accent text-xl font-bold mb-2">Event!</h3>
              <p className="text-space-text">{currentEvent}</p>
            </div>
          )}

          {permanentConditions.length > 0 && (
            <div className="bg-space-deep border border-space-border rounded-lg p-6">
              <h3 className="text-space-accent text-lg font-bold mb-2">Active Conditions</h3>
              {permanentConditions.map((condition, i) => (
                <p key={i} className="text-space-muted text-sm">{condition}</p>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Mission;
