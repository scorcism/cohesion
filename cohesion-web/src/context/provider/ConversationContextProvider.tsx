import { Conversation, ConversationContextType, Message } from "@/types/common";
import { config } from "@/utils/config";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useApp } from "../context/AppContext";
import { ConversationContext } from "../context/ConversationContext";

export function ConversationContextProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();

    const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedModel, setSelectedModel] = useState("")

    const { setUser, setShowLoginModal } = useApp()

    const updateURL = (convId: string | null) => {
        const updatedParams = new URLSearchParams(searchParams);
        if (convId) {
            updatedParams.set('chat', convId!);
        } else {
            updatedParams.delete('chat');
        }
        navigate(`${window.location.pathname}?${updatedParams.toString()}`);
    };

    const handleSelectConversation = (id: string | null) => {
        console.log({ id })
        setSelectedConversation(id)
        updateURL(id)
    }

    // No option :)
    const logoutUser = () => {
        Cookies.remove(config.AUTH_TOKEN)
        Cookies.remove(config.AUTH_EMAIL)
        updateURL(null)
        setUser(null);
        setConversations([]);
        setSelectedConversation(null);
        setMessages([])
        setShowLoginModal(true)
    }


    const value: ConversationContextType = {
        selectedConversation,
        setSelectedConversation,
        conversations,
        setConversations,
        messages,
        setMessages,
        selectedModel,
        setSelectedModel,
        handleSelectConversation,
        logoutUser
    };

    return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
}
