import { useEffect, useRef } from "react";
import ChatInput from "./elements/chat/ChatInput";
import MessageList from "./elements/chat/MessageList";

const Home = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-center ">
      <div className="w-full max-w-4xl flex flex-col h-full">
        <div
          ref={scrollRef}
          className="flex-grow overflow-y-auto rounded-md"
        >
          <MessageList />
        </div>
        {/* Chat Input */}
        <div className="sticky bottom-0">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Home;