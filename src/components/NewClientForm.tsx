import {
    Input,
    Container,
    Avatar,
    Stack,
    Text,
    Button,
    AvatarBadge,
    Heading,
    Switch,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ClientsApi } from "../api/ClientsApi";
import { Client } from "../entities/Client";

const NewClientForm = () => {
    // form to create a new client in the database

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [ipAddress, setIpAddress] = useState<string>("");
    const [isInternet, setIsInternet] = useState<boolean>(false);

    const createClient = () => {
        const client = {
            name: name,
            address: address,
            ipAddress: ipAddress,
        };
        ClientsApi.postClient(client);
    };

    return (
        <Container alignSelf="center" centerContent>
            <Heading>Create a new client</Heading>
            <Input
                margin="2"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <Input
                margin="2"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
            />
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="is-internet" mb="0">
                    Is internet?
                </FormLabel>
                <Switch id="is-internet" onChange={() => {setIsInternet(!isInternet)}}/>
            </FormControl>
            <Input
                margin="2"
                placeholder="IP Address"
                hidden={!isInternet}
                value={ipAddress}
                onChange={(event) => setIpAddress(event.target.value)}
            />
            <Button onClick={createClient}>Create Client</Button>
        </Container>
    );
};

export default NewClientForm;
