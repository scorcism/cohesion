import { ConversationContextType } from '@/types/common';
import { createContext, useContext } from 'react';

export const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function useConversation() {
    const context = useContext(ConversationContext);
    if (context === undefined) {
        throw new Error('useConversation must be used within an ConversationProvider');
    }
    return context;
}