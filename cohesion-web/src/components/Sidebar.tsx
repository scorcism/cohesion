import { Ellipsis, Moon, Plus, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { useApp } from "@/context/context/AppContext"
import { useConversation } from "@/context/context/ConversationContext"
import { useTheme } from "@/context/provider/ThemeProvider"
import { apiService } from "@/services/api.service"
import { Conversation } from "@/types/common"
import { useEffect, useState } from "react"
import DeleteModal from "./elements/chat/modals/ConfirmationModal"
import RenameModal from "./elements/chat/modals/RenameConversation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const AppSidebar = () => {
    const { setTheme, theme } = useTheme()
    const { setConversations, conversations, selectedConversation, handleSelectConversation } = useConversation()
    const { user } = useApp()

    const [deleteConv, setdeleteConv] = useState({
        state: false,
        id: ""
    })
    const [renameConv, setRenameConv] = useState({
        state: false,
        id: "",
        value: ""
    })

    // Todo
    const handleConfirmdelete = () => {
        setdeleteConv({
            id: "",
            state: false
        })
    }

    // Todo
    const handleRenameConv = () => {
        setRenameConv({
            state: false,
            id: "",
            value: ""
        })
    }

    const getConversations = async () => {
        const { status, data } = await apiService.getConversations()
        if (!status) {
            return;
        }
        setConversations(data.data)
    }

    useEffect(() => {
        if (user) getConversations()
    }, [user])

    return user ? (
        <Sidebar className="h-[100%]">
            <SidebarContent className="h-[100%]">
                <div className="h-[5%] flex items-center justify-between px-2">
                    <div className="flex items-center justify-center">
                        <SidebarTrigger />
                        <h1 className="px-2 font-extrabold text-xl leading-3">Cohesion</h1>
                    </div>
                    <div>
                        <Button variant={'outline'} className="p-2" onClick={() => {
                            const t = theme === 'dark' ? 'light' : 'dark'
                            setTheme(t)
                        }}>
                            {
                                theme === 'light' ? <Moon /> : <Sun />
                            }
                        </Button>
                    </div>
                </div>

                <div className="h-[90%] overflow-y-auto ">
                    <Button className="border py-3 rounded-mdflex gap-2 w-full h-14 justify-start px-4 my-2" variant={'outline'} onClick={() => handleSelectConversation(null)}>
                        <Plus />
                        <p className="font-medium">
                            Create new
                        </p>
                    </Button>
                    <div className="flex flex-col space-y-3">
                        {conversations.map((item: Conversation) => {
                            return <div className={`my-1 cursor-pointer py-2 ${selectedConversation == item.id ? "dark:bg-gray-300/10 bg-black/10" : ""}`} onClick={() => { }}>
                                <div className="py-1 rounded px-2 font-normal flex justify-between items-center mx-2" onClick={() => handleSelectConversation(item.id)}>
                                    <h2 className="font-normal">{item.title}</h2>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => {
                                                setRenameConv({
                                                    id: item.id,
                                                    value: item.title,
                                                    state: true
                                                })
                                            }}>Rename</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-400 hover:text-red-500" onClick={() => setdeleteConv({
                                                id: item.id,
                                                state: true
                                            })}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </SidebarContent>
            <DeleteModal
                open={deleteConv.state}
                message="Deleting this will delete all the messages too."
                onClose={() => setdeleteConv({
                    id: "",
                    state: false
                })}
                onConfirm={handleConfirmdelete}
                title="Are you sure?"
            />

            <RenameModal
                onClose={() => {
                    setRenameConv({
                        state: false,
                        id: "",
                        value: ""
                    })
                }}
                open={renameConv.state}
                value={renameConv.value}
                handleInputChange={(e) => { setRenameConv({ ...renameConv, value: e.target.value }) }}
                onConfirm={handleRenameConv}
            />
        </Sidebar>
    ) : null
}

export default AppSidebar