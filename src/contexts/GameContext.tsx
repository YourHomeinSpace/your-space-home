import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  selectedShip: string | null;
  setSelectedShip: (ship: string) => void;
  selectedSectors: Record<string, string>;
  setSelectedSectors: (sectors: Record<string, string>) => void;
  sanity: number;
  setSanity: (sanity: number) => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  sfxVolume: number;
  setSfxVolume: (volume: number) => void;
  missionDay: number;
  setMissionDay: (day: number) => void;
  events: string[];
  addEvent: (event: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedShip, setSelectedShip] = useState<string | null>(null);
  const [selectedSectors, setSelectedSectors] = useState<Record<string, string>>({});
  const [sanity, setSanity] = useState(100);
  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(70);
  const [missionDay, setMissionDay] = useState(1);
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    setEvents(prev => [...prev, event]);
  };

  const resetGame = () => {
    setPlayerName('');
    setSelectedShip(null);
    setSelectedSectors({});
    setSanity(100);
    setMissionDay(1);
    setEvents([]);
  };

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        selectedShip,
        setSelectedShip,
        selectedSectors,
        setSelectedSectors,
        sanity,
        setSanity,
        musicVolume,
        setMusicVolume,
        sfxVolume,
        setSfxVolume,
        missionDay,
        setMissionDay,
        events,
        addEvent,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
