import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import NewItemForm from "./NewItemForm";

const NewItemModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onModalClosed = () => {
        onClose();
        
    }
    return (
        <>
            <Button onClick={onOpen}>Add new item</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NewItemForm />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onModalClosed}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewItemModal;
