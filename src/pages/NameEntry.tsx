import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/hooks/useAudio';

const NameEntry = () => {
  const navigate = useNavigate();
  const { setPlayerName } = useGame();
  const { playSfxClick, playDialogueBox } = useAudio();
  const [name, setName] = useState('');
  const [dialogueText, setDialogueText] = useState('');
  const [showDialogue, setShowDialogue] = useState(false);
  const fullText = 'What is your name?';

  useEffect(() => {
    setShowDialogue(true);
    playDialogueBox();
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDialogueText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [playDialogueBox]);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleLetterClick = (letter: string) => {
    playSfxClick();
    if (name.length < 12) {
      setName(name + letter);
    }
  };

  const handleBackspace = () => {
    playSfxClick();
    setName(name.slice(0, -1));
  };

  const handleContinue = () => {
    if (name.length > 0) {
      playSfxClick();
      setPlayerName(name);
      navigate('/ship-selection');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-space-deep to-space-purple flex flex-col items-center justify-center overflow-hidden p-8">
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
        {showDialogue && (
          <div className="bg-space-panel border border-space-border rounded-lg p-6 animate-fade-in">
            <p className="text-space-text text-xl">{dialogueText}</p>
          </div>
        )}

        <div className="bg-space-panel border border-space-border rounded-lg p-8 space-y-6">
          <div className="h-16 flex items-center justify-center border-2 border-space-accent rounded-lg">
            <span className="text-3xl font-mono text-space-text tracking-widest">{name || '_'}</span>
          </div>

          <div className="grid grid-cols-9 gap-2">
            {letters.map((letter) => (
              <Button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                variant="space"
                size="sm"
                disabled={name.length >= 12}
              >
                {letter}
              </Button>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleBackspace} variant="space" className="w-32">
              Backspace
            </Button>
            <Button onClick={handleContinue} variant="space" className="w-32" disabled={name.length === 0}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameEntry;
