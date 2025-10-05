import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/hooks/useAudio';
import { dialogues } from '@/data/gameData';

const BeforeMission = () => {
  const navigate = useNavigate();
  const { playerName } = useGame();
  const { playSfxClick, playDialogueBox } = useAudio();
  const [dialogueText, setDialogueText] = useState('');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    animateText(dialogues.beforeMission.lines[0]);
  }, []);

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
        if (dialogueIndex === 0) {
          setTimeout(() => handleNext(), 1000);
        } else {
          setShowOptions(true);
        }
      }
    }, 15);
  };

  const handleNext = () => {
    if (dialogueIndex === 0) {
      setDialogueIndex(1);
      setShowDots(true);
      let dotCount = 0;
      const dotTimer = setInterval(() => {
        dotCount++;
        setDialogueText('.'.repeat(Math.min(dotCount, 3)));
        if (dotCount >= 6) {
          clearInterval(dotTimer);
          setShowDots(false);
          setShowOptions(true);
          setDialogueText('');
        }
      }, 500);
    }
  };

  const handleAskName = () => {
    playSfxClick();
    setShowOptions(false);
    animateText(dialogues.starcyIntro.lines[0]);
    setTimeout(() => {
      animateText(dialogues.starcyName.lines[0]);
      setTimeout(() => navigate('/mission-select'), 3000);
    }, 2000);
  };

  const handleReady = () => {
    playSfxClick();
    animateText(dialogues.starcyGoodbye.lines[0]);
    setTimeout(() => navigate('/mission-select'), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <Card className="bg-space-panel border-space-border p-8 max-w-2xl w-full mx-4">
        <p className="text-space-text text-xl mb-6">{showDots ? dialogueText : dialogueText}</p>
        {showOptions && (
          <div className="flex flex-col gap-4">
            <Button onClick={handleAskName} variant="space" size="lg">
              What is your name?
            </Button>
            <Button onClick={handleReady} variant="space" size="lg">
              I'm ready
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BeforeMission;
