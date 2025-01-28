import { api } from "@/utils/api";

class AiModel {

    async getModels(){
        try {
            const res = api.get("/tags")
            
        } catch (error) {
            
        }
    }

}

export const aimodel = new AiModel();
