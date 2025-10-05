import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { splashQuotes } from '@/data/gameData';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = splashQuotes[Math.floor(Math.random() * splashQuotes.length)];
    setQuote(randomQuote);

    const timer = setTimeout(() => {
      navigate('/menu');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
      <p className="text-space-text text-2xl md:text-3xl text-center px-8 animate-fade-in z-10 max-w-3xl">
        {quote}
      </p>
    </div>
  );
};

export default SplashScreen;
