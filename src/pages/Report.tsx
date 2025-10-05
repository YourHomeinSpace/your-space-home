import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/hooks/useAudio';

const Report = () => {
  const navigate = useNavigate();
  const { playerName, sanity, events, resetGame } = useGame();
  const { playSfxClick } = useAudio();
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const getSanityMessage = () => {
    if (sanity < 20) return '"Don\'t come back here."';
    if (sanity >= 20 && sanity < 40) return '"You can still improve."';
    if (sanity >= 40 && sanity < 70) return '"Good enough."';
    if (sanity >= 70 && sanity < 100) return '"Excellent! Ready for a new mission?"';
    return '"You can get promoted this way, newbie."';
  };

  const handleSendReport = () => {
    playSfxClick();
    setShowFinalMessage(true);
  };

  const handleRestart = () => {
    playSfxClick();
    resetGame();
    navigate('/menu');
  };

  const handleRedoReport = () => {
    playSfxClick();
    navigate('/sector-selection');
  };

  if (showFinalMessage) {
    return <FinalMessage playerName={playerName} onRestart={handleRestart} />;
  }

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
        <Card className="bg-space-panel border-space-border p-8 space-y-6">
          <h2 className="text-4xl font-bold text-space-text text-center">Mission Report</h2>

          <div className="space-y-4">
            <div className="bg-space-deep border border-space-border rounded-lg p-6">
              <h3 className="text-space-accent text-2xl font-bold mb-4">Final Sanity</h3>
              <div className="text-center">
                <p className="text-6xl font-bold text-space-text mb-2">{Math.round(sanity)}%</p>
                <p className="text-space-muted text-xl">{getSanityMessage()}</p>
              </div>
            </div>

            <div className="bg-space-deep border border-space-border rounded-lg p-6">
              <h3 className="text-space-accent text-xl font-bold mb-4">Events During Mission</h3>
              {events.length > 0 ? (
                <ul className="space-y-2">
                  {events.map((event, i) => (
                    <li key={i} className="text-space-muted">• {event}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-space-muted">No major events occurred.</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleRedoReport} variant="space" size="lg">
              Redo Report
            </Button>
            <Button onClick={handleSendReport} variant="space" size="lg">
              Send Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const FinalMessage = ({ playerName, onRestart }: { playerName: string; onRestart: () => void }) => {
  const { playSfxClick, playDialogueBox } = useAudio();
  const [dialogueText, setDialogueText] = useState('');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [complete, setComplete] = useState(false);

  const dialogueLines = [
    `Hey, ${playerName} I got your report.`,
    'Hi, I\'m Marc. I\'m here to tell you that regardless of the results, your home is your space. But more than just space, it\'s always good to stay sane.',
    'Whenever you need something, don\'t hesitate to speak up. I know missions can sometimes seem complicated, but every star has its purpose, just like us.',
    `Hey, ${playerName}, Starcy, the one who came to talk to you about your ship and the details. Told me you\'re capable.`,
    'Never give up.',
    'Well, I will pass on the important information based on your report, keep an eye out today for any signal.',
  ];

  useEffect(() => {
    animateText(dialogueLines[0]);
  }, []);

  const animateText = (text: string) => {
    playDialogueBox();
    let index = 0;
    setDialogueText('');
    setShowNext(false);
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDialogueText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setShowNext(true);
      }
    }, 30);
  };

  const handleNext = () => {
    playSfxClick();
    if (dialogueIndex < dialogueLines.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
      animateText(dialogueLines[dialogueIndex + 1]);
    } else {
      setComplete(true);
    }
  };

  if (complete) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-8">
          <p className="text-space-text text-3xl animate-fade-in">Thanks for playing.</p>
          <p className="text-space-muted text-xl animate-fade-in">I'll see you on some nearby comet.</p>
          <Button onClick={onRestart} variant="space" size="lg">
            Return to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <Card className="bg-space-panel border-space-border p-8 max-w-2xl w-full mx-4">
        <div className="space-y-4">
          <p className="text-space-accent font-bold text-xl">
            {dialogueIndex === 0 ? '???' : 'Marc'}
          </p>
          <p className="text-space-text text-lg">{dialogueText}</p>
          {showNext && (
            <Button onClick={handleNext} variant="space" size="lg" className="w-full">
              {dialogueIndex < dialogueLines.length - 1 ? 'Continue' : 'Finish'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Report;
