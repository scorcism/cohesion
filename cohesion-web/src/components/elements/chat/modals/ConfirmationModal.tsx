import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

type PropType = {
    open: boolean,
    title: string,
    onConfirm: () => void,
    onClose: () => void,
    message: string
}

const ConfirmationModal = ({ open, title, onConfirm, onClose, message }: PropType) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={'outline'} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={'destructive'} onClick={onConfirm}>
                        Okay
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default ConfirmationModal
