import { AppContextType } from '@/types/common';
import { createContext, useContext } from 'react';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}