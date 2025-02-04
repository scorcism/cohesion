import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/context/context/AppContext";
import { useConversation } from "@/context/context/ConversationContext";
import { apiService } from "@/services/api.service";
import { Model } from "@/types/common";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

const Header = () => {
    const { setShowLoginModal, user } = useApp()
    const { state } = useSidebar()
    const { selectedModel, setSelectedModel, logoutUser } = useConversation()

    const [modles, setModels] = useState<Model[] | null>(null)

    const getModels = async () => {
        const _res = await apiService.getModels();
        console.log(_res)

        if (!_res.success) {
            toast.error(_res.message)
            return;
        }
        setModels(_res.data.models)
    };

    useEffect(() => {
        getModels()
    }, [])

    return (
        <div className="sticky top-0 dark:bg-black bg-white h-12 flex justify-between items-center px-5 z-10">
            <div className="flex gap-2 items-center">
                {
                    state === 'collapsed' && <SidebarTrigger />
                }
                <Select value={selectedModel} onValueChange={(value) => {
                    setSelectedModel(value)
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                        {modles &&
                            modles.map((model) => <SelectItem value={model.model}>{model.name}</SelectItem>)
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-3 items-center">{
                user ?
                    <Button onClick={logoutUser} variant={"destructive"}>
                        Logout
                    </Button> : <Button onClick={() => setShowLoginModal(true)}>
                        Auth
                    </Button>
            }
                <a href="//github.com/scorcism/cohesion" className="">
                    <Github />
                </a>
            </div>
        </div>
    )
}

export default Header
