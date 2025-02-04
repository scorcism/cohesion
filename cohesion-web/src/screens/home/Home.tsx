import ChatPanel from "@/components/ChatPanel"
import Header from "@/components/Header"
import AppSidebar from "@/components/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const Home = () => {
    return (
        <div className="">
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full">
                    <Header />
                    <ChatPanel />
                </div>
            </SidebarProvider>
        </div>
    )
}

export default Home
