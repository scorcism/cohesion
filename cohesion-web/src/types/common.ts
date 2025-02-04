export type Conversation = {
  title: string;
  id: string;
  createdAt: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  model: string;
  createdAt: string;
};

export type Model = {
  name: string;
  model: string;
};

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType extends LoginType {
  name: string;
}

export type UserType = {
  token: string;
  email: string;
} | null;

export interface AppContextType {
  showLoginModal: boolean;
  setShowLoginModal: any;
  user: UserType;
  setUser: any;
}

export interface ConversationContextType {
  selectedConversation: string | null;
  setSelectedConversation: any;
  conversations: Conversation[];
  setConversations: any;
  messages: Message[];
  setMessages: any;
  selectedModel: string;
  setSelectedModel: any;
  handleSelectConversation: (id: string | null) => void;
  logoutUser: () => void;
}
