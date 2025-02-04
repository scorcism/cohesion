import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ChangeEventHandler } from "react"


type PropType = {
    open: boolean,
    value: string,
    onConfirm: () => void,
    onClose: () => void,
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

const RenameModal = ({ open, value, onClose, onConfirm, handleInputChange }: PropType) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Rename Conversation</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                    <Input id="name" value={value} onChange={handleInputChange} />
                </div>
                <DialogFooter>
                    <Button variant={'outline'} onClick={onClose}>Cancel</Button>
                    <Button onClick={onConfirm}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RenameModal