import { AutosizeTextarea } from "@/components/ui/AutosizeTextarea";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/context/context/ConversationContext";
import { useStreamData } from "@/hooks/useStreamData";
import { Send } from "lucide-react";
import { ChangeEvent, KeyboardEvent } from "react";

const ChatInput = () => {
    const { selectedConversation, selectedModel, setMessages, setConversations, setSelectedConversation, messages } = useConversation();

    const { sendMessage, isSending, input, setInput, isReceaving } = useStreamData({
        selectedModel,
        selectedConversation,
        messages,
        setMessages,
        setConversations,
        setSelectedConversation,
    });

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="w-full pb-4 sticky bottom-0 flex items-center gap-2 justify-between">
            <AutosizeTextarea
                maxHeight={200}
                className="flex-grow dark:bg-black bg-white border-black/70 outline-none focus:border-transparent focus:ring-0 rounded-lg"
                minHeight={80}
                placeholder="Type a message..."
                disabled={isSending || isReceaving}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />

            <div className="space-y-1 flex flex-col">
                <Button variant="outline" size="icon" onClick={sendMessage} disabled={isSending || isReceaving}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;
