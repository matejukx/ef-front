import {
    Input,
    Container,
    Avatar,
    Stack,
    Text,
    Button,
    AvatarBadge,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ClientsApi } from "../api/ClientsApi";
import { Client } from "../entities/Client";
import ItemList from "./ItemList";
import NewClientForm from "./NewClientForm";
import NewClientModal from "./NewClientModal";

const AvatarComponent = () => {
    const [mainClient, setMainClient] = useState<Client | null>(null);

    useEffect(() => {
        const localClient = localStorage.getItem("mainClient");
        if (localClient) {
            const foundClient = JSON.parse(localClient);
            setMainClient(foundClient);
        }
    }, []);

    return (
        <Stack direction="row">
            <Avatar name={mainClient?.name} margin="5">
                <AvatarBadge
                    boxSize="1.25em"
                    bg={mainClient === null ? "red.500" : "green.500"}
                />
            </Avatar>
        </Stack>
    );
};

export default AvatarComponent;
