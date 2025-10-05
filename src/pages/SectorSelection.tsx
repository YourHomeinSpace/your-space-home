import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/hooks/useAudio';
import { sectors, dialogues } from '@/data/gameData';

const SectorSelection = () => {
  const navigate = useNavigate();
  const { playerName, setSelectedSectors } = useGame();
  const { playSfxClick, playDialogueBox } = useAudio();
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showDialogue, setShowDialogue] = useState(true);
  const [dialogueText, setDialogueText] = useState('');

  useEffect(() => {
    const text = dialogues.sectors.lines[0].replace('[Player Name]', playerName);
    playDialogueBox();
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDialogueText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowDialogue(false), 2000);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [playerName]);

  const handleSelectItem = (sector: string, item: string) => {
    playSfxClick();
    setSelections(prev => ({ ...prev, [sector]: item }));
  };

  const handleContinue = () => {
    playSfxClick();
    setSelectedSectors(selections);
    navigate('/before-mission');
  };

  const allSectorsSelected = Object.keys(selections).length === Object.keys(sectors).length;

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
        {showDialogue && (
          <Card className="bg-space-panel border-space-border p-6 animate-fade-in">
            <p className="text-space-text text-lg">{dialogueText}</p>
          </Card>
        )}

        <div className="space-y-6">
          {Object.entries(sectors).map(([sectorName, sectorData]) => (
            <Card key={sectorName} className="bg-space-panel border-space-border p-6">
              <h3 className="text-2xl font-bold text-space-text mb-4">{sectorName}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(sectorData.items).map(([itemName, itemData]) => (
                  <button
                    key={itemName}
                    onClick={() => handleSelectItem(sectorName, itemName)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selections[sectorName] === itemName
                        ? 'border-space-accent bg-space-accent/20 shadow-[0_0_20px_rgba(77,208,225,0.3)]'
                        : 'border-space-border bg-space-deep hover:border-space-accent/50'
                    }`}
                  >
                    <h4 className="text-space-text font-semibold mb-2">{itemName}</h4>
                    <p className="text-space-muted text-sm">{itemData.description}</p>
                    <p className="text-space-accent text-xs mt-2">+{itemData.sanity} Sanity</p>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pb-8">
          <Button
            onClick={handleContinue}
            variant="space"
            size="lg"
            disabled={!allSectorsSelected}
            className="w-64"
          >
            Continue to Mission
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectorSelection;
