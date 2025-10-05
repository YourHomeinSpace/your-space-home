import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/hooks/useAudio';
import { ships, dialogues } from '@/data/gameData';

const ShipSelection = () => {
  const navigate = useNavigate();
  const { playerName, setSelectedShip } = useGame();
  const { playSfxClick, playDialogueBox } = useAudio();
  const [showDialogue, setShowDialogue] = useState(true);
  const [dialogueText, setDialogueText] = useState('');
  const [currentDialogue, setCurrentDialogue] = useState<string[]>([]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [askedAbout, setAskedAbout] = useState<string[]>([]);

  useEffect(() => {
    const text = dialogues.welcome.lines[0].replace('[Player Name]', playerName);
    animateText(text);
  }, [playerName]);

  const animateText = (text: string) => {
    playDialogueBox();
    let index = 0;
    setDialogueText('');
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDialogueText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setShowOptions(true);
      }
    }, 30);
  };

  const handleAskAbout = (ship: string) => {
    playSfxClick();
    setShowOptions(false);
    setAskedAbout([...askedAbout, ship]);
    
    const dialogue = ship === 'rectangle' ? dialogues.rectangle : 
                     ship === 'triangle' ? dialogues.triangle : dialogues.square;
    setCurrentDialogue(dialogue.lines);
    setDialogueIndex(0);
    animateText(dialogue.lines[0]);
  };

  const handleNoThanks = () => {
    playSfxClick();
    setShowDialogue(false);
  };

  const handleNextDialogue = () => {
    playSfxClick();
    if (dialogueIndex < currentDialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
      animateText(currentDialogue[dialogueIndex + 1]);
    } else {
      setShowOptions(true);
      const text = dialogues.welcome.lines[0].replace('[Player Name]', playerName);
      animateText(text);
    }
  };

  const handleSelectShip = (shipKey: string) => {
    playSfxClick();
    setSelectedShip(shipKey);
    navigate('/sector-selection');
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
        {showDialogue && (
          <div className="animate-fade-in">
            <Card className="bg-space-panel border-space-border p-6">
              <p className="text-space-text text-lg mb-4">{dialogueText}</p>
              {showOptions && currentDialogue.length === 0 && (
                <div className="flex flex-col gap-2">
                  {!askedAbout.includes('rectangle') && (
                    <Button onClick={() => handleAskAbout('rectangle')} variant="space">
                      Talk about the Rectangle
                    </Button>
                  )}
                  {!askedAbout.includes('triangle') && (
                    <Button onClick={() => handleAskAbout('triangle')} variant="space">
                      Talk about the Triangle
                    </Button>
                  )}
                  {!askedAbout.includes('square') && (
                    <Button onClick={() => handleAskAbout('square')} variant="space">
                      Talk about the Square
                    </Button>
                  )}
                  <Button onClick={handleNoThanks} variant="space">
                    No, thanks
                  </Button>
                </div>
              )}
              {currentDialogue.length > 0 && !showOptions && (
                <Button onClick={handleNextDialogue} variant="space">
                  Continue
                </Button>
              )}
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(ships).map(([key, ship]) => (
            <Card key={key} className="bg-space-panel border-space-border p-6 space-y-4 hover:border-space-accent transition-colors">
              <div className="h-48 bg-space-deep rounded-lg flex items-center justify-center border border-space-border">
                <span className="text-6xl text-space-accent">{ship.name === 'Rectangle' ? '▭' : ship.name === 'Triangle' ? '▲' : '■'}</span>
              </div>
              <h3 className="text-2xl font-bold text-space-text">{ship.name}</h3>
              <p className="text-sm text-space-muted">{ship.model}</p>
              <p className="text-space-text text-sm">{ship.description}</p>
              <div className="space-y-1 text-sm text-space-muted">
                <p>Capacity: {ship.capacity} people</p>
                <p>Max Weight: {ship.maxWeight}kg</p>
              </div>
              <Button onClick={() => handleSelectShip(key)} variant="space" className="w-full">
                Select {ship.name}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipSelection;
