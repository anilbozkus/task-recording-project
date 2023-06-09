import React, { Key, createContext, useState } from 'react';

interface Task {
    id: Key | null | undefined;
    task_type: string;
    content: string;
    date: Date | null;
    column: string;
}

interface AppContextProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const AppContext = createContext<AppContextProps>({
  selectedDate: null,
  setSelectedDate: () => {},
  tasks: [],
  setTasks: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <AppContext.Provider value={{ selectedDate, setSelectedDate, tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
};
