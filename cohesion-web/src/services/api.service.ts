import { api } from "@/utils/api";
import { config } from "@/utils/config";
import Cookies from "js-cookie";

class ApiService {
  // ollama
  async getModels() {
    try {
      const _res = await api.get("/ollama/models");
      if (_res.status === 200) {
        return _res.data;
      }
      return { status: false, message: "Error while getting ollama models" };
    } catch (error) {
      console.log({ error });
      return { status: false, message: JSON.stringify(error) };
    }
  }

  // get conversation
  async getConversations() {
    try {
      const _res = await api.get("/conversations", {
        headers: {
          Authorization: `Bearer ${Cookies.get(config.AUTH_TOKEN)}`,
        },
      });
      console.log({ _res });
      if (_res.status === 200) {
        return { status: true, data: _res.data };
      }
      return { status: false, message: "Error while getting Conversations" };
    } catch (error) {
      console.log({ error });
      return { status: false, message: JSON.stringify(error) };
    }
  }

  // create new conversation
  async createConversation(
    model: string,
    messages: any[],
    conversationMetadata: any
  ) {
    try {
      const _res = await api.post(
        `/conversations`,
        {
          model,
          messages,
          conversationMetadata,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(config.AUTH_TOKEN)}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (_res.status === 200) {
        return { status: true, data: _res.data };
      }
      return { status: false, message: "Error while getting Conversations" };
    } catch (error) {
      console.log({ error });
      return { status: false, message: JSON.stringify(error) };
    }
  }

  // get messages
  async getMessages(convId: string) {
    try {
      const _res = await api.get(`/conversations/messages/${convId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get(config.AUTH_TOKEN)}`,
        },
      });
      if (_res.status === 200) {
        return { status: true, data: _res.data };
      }
      return { status: false, message: "Error while getting Conversations" };
    } catch (error) {
      console.log({ error });
      return { status: false, message: JSON.stringify(error) };
    }
  }

  // chat
  async chat(messages: any, model: string, convId: string) {
    try {
      const _res = await api.post(
        `/conversations/chat`,
        {
          model,
          messages,
          convId,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(config.AUTH_TOKEN)}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (_res.status === 200) {
        return { status: true, data: _res.data };
      }
      return { status: false, message: "Error while getting Conversations" };
    } catch (error) {
      console.log({ error });
      return { status: false, message: JSON.stringify(error) };
    }
  }

  // Login user
  async login(email: string, password: string) {
    try {
      const _res = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log({ _res });
      if (_res.status === 200) {
        return { status: true, data: _res.data };
      }
      return { status: false, message: "Error while login user" };
    } catch (error: any) {
      console.log({ login: error });
      return {  status: false,
        message: error.response.data
          ? error.response.data
          : "Please try again layer", };
    }
  }

  // Register user
  async register(name: string, email: string, password: string) {
    try {
      const _res = await api.post("/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      console.log({ _res });
      if (_res.status === 200) {
        return { status: true, data: _res.data };
      }
      return { status: false, message: "Error while register user" };
    } catch (error: any) {
      console.log({ register: error });
      return {
        status: false,
        message: error.response.data
          ? error.response.data
          : "Please try again layer",
      };
    }
  }
}

export const apiService = new ApiService();
