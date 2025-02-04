
import { useApp } from "@/context/context/AppContext";
import { useConversation } from "@/context/context/ConversationContext";
import { apiService } from "@/services/api.service";
import { Message } from "@/types/common";
import { useEffect } from "react";
import ChatMessageBubble from "./MessageBubble";

const MessageList = () => {

    const { selectedConversation, messages, setMessages } = useConversation()
    const { user } = useApp()

    const getMessages = async () => {
        if (!selectedConversation) return
        const { status, data } = await apiService.getMessages(selectedConversation)
        if (!status) {
            return;
        }
        console.log({ data })
        setMessages(data.data)
    }

    useEffect(() => {
        getMessages()
    }, [selectedConversation])

    if (user && !selectedConversation) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <p>Select Conversation or Start Chatting</p>
            </div>
        )
    }

    if (!user && !messages) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <p>Login or start chatting</p>
            </div>
        )
    }

    return (
        <div className="flex-grow overflow-y-auto ">
            {messages && messages.map((message: Message) => (
                <ChatMessageBubble message={message} key={message.id} />
            ))}
        </div>
    )
}

export default MessageList