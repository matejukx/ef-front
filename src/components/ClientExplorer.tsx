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
import AvatarComponent from "./AvatarComponent";

const ClientExplorer = () => {
    const [filter, setFilter] = useState<string>("");
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        ClientsApi.getClients().then((response) => {
            setClients(response);
            setFilteredClients(response);
        });
    }, []);

    const filterClients = (event: any) => {
        if (event.target.value.length > 0) {
            setFilter(event.target.value);
            setFilteredClients(
                clients.filter((client) => client.name.includes(filter))
            );
        } else {
            setFilter(event.target.value);
            setFilteredClients([]);
        }
    };

    const refreshClients = () => {
        ClientsApi.getClients().then((response) => {
            setClients(response);
            setFilteredClients(response);
        });
    };

    const saveMainClient = (client: Client) => {
        const value = JSON.stringify(client);
        localStorage.setItem("mainClient", value);
        window.location.reload();
    };

    return (
        <Container centerContent >
            <NewClientModal/>

            <Stack direction="row">
            <Input
                placeholder="Choose a current user"
                value={filter}
                onChange={filterClients}
            />
            <Button onClick={refreshClients}>
                <RepeatIcon/>
            </Button>
            </Stack>
            <Container centerContent margin="3" bg="whitesmoke">
                {filteredClients.map((client) => (
                    <Button
                        key={client.id}
                        onClick={() => saveMainClient(client)}
                        variant="ghost"
                    >
                        {client.name} from {client.address}
                    </Button>
                ))}
            </Container>
        </Container>
    );
};

export default ClientExplorer;