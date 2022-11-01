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
import NewClientForm from "./NewClientForm";

const NewClientModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const onModalClosed = () => {

        onClose();
    }

    return (
        <>
            <Button margin={4} onClick={onOpen}>Add new client</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new client</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NewClientForm />
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

export default NewClientModal;