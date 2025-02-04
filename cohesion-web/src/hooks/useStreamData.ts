import { useApp } from "@/context/context/AppContext";
import { Conversation, Message } from "@/types/common";
import { config } from "@/utils/config";
import { _getUUID } from "@/utils/lib";
import { useState } from "react";
import { toast } from "sonner";

interface StreamDataProps {
  selectedModel: string;
  selectedConversation: string | null;
  input: string;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  setSelectedConversation: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useStreamData = ({
  selectedModel,
  selectedConversation,
  input,
  messages,
  setMessages,
  setConversations,
  setSelectedConversation,
}: StreamDataProps) => {
  const [isSending, setIsSending] = useState(false);
  const { user } = useApp();

  const handleNewConversation = async () => {
    const user_message = [
      ...messages,
      {
        role: "user",
        content: input,
      },
    ];
    setMessages(user_message);

    const conversationMetadata = {
      id: _getUUID(),
      title: "New Conversation",
    };

    const headers = {
      "Content-Type": "application/json",
      ...(user && user.token ? { Authorization: `Bearer ${user.token}` } : {}),
    };

    try {
      const response = await fetch(`${config.BACKEND_URL}/conversations`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          messages: user_message,
          model: selectedModel,
          conversationMetadata,
        }),
      });

      if (!response.body) {
        console.error("No response body found.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const _messages = chunk.split("\n").filter(Boolean);

        for (const message of _messages) {
          if (
            !message.startsWith("data: ") &&
            !message.startsWith("metadata: ")
          )
            continue;

          if (message.startsWith("metadata: ")) {
            const _metadata = message.slice(10).trim();
            const metadata = JSON.parse(_metadata);
            setConversations((prev: any) => [metadata, ...prev]);
            setSelectedConversation(metadata.id);
          }

          if (message.startsWith("data: ")) {
            const data = message.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsedData = JSON.parse(data);
              if (parsedData.message?.content) {
                accumulatedContent += parsedData.message.content;
                setMessages(() => {
                  const updatedMessages = [...user_message];
                  const lastMessage =
                    updatedMessages[updatedMessages.length - 1];

                  if (lastMessage?.role === "assistant") {
                    lastMessage.content = accumulatedContent;
                  } else {
                    updatedMessages.push({
                      role: "assistant",
                      content: accumulatedContent,
                    });
                  }

                  return updatedMessages;
                });
              }
            } catch (error) {
              toast.error(
                "Error while receaving message. Check console for full error"
              );
              console.error({ error });
            }
          }
        }
      }
    } catch (error) {
      toast.error(
        "Error while receaving message. Check console for full error"
      );
      console.error({ error });
    }
  };

  const handleContinueConversation = async () => {
    if (!selectedConversation) return;

    const _user_message = {
      role: "user",
      content: input,
    };

    setMessages((prev: any) => [...prev, _user_message]);

    const user_messages = [...messages, _user_message];

    const headers = {
      "Content-Type": "application/json",
      ...(user && user.token ? { Authorization: `Bearer ${user.token}` } : {}),
    };

    try {
      const response = await fetch(`${config.BACKEND_URL}/conversations/chat`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          messages: user_messages,
          model: selectedModel,
          convId: selectedConversation,
        }),
      });

      if (!response.body) {
        console.error("No response body found.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const messages = chunk.split("\n").filter(Boolean);

        for (const message of messages) {
          if (!message.startsWith("data: ")) continue;

          const data = message.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsedData = JSON.parse(data);

            if (parsedData.message?.content) {
              accumulatedContent += parsedData.message.content;
              setMessages((prev: any) => {
                const updatedMessages = [...prev];
                if (
                  updatedMessages.length > 0 &&
                  updatedMessages[updatedMessages.length - 1].role ===
                    "assistant"
                ) {
                  updatedMessages[updatedMessages.length - 1].content =
                    accumulatedContent;
                } else {
                  updatedMessages.push({
                    role: "assistant",
                    content: accumulatedContent,
                  });
                }
                return updatedMessages;
              });
            }
          } catch (error) {
            toast.error(
              "Error while receaving message. Check console for full error"
            );
            console.error({ error });
          }
        }
      }
    } catch (error) {
      toast.error(
        "Error while receaving message. Check console for full error"
      );
      console.error({ error });
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!selectedModel) {
      toast.error("Please Select a Model");
      return;
    }
    try {
      setIsSending(true);
      if (selectedConversation) {
        handleContinueConversation();
      } else {
        handleNewConversation();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendMessage,
    isSending,
  };
};
