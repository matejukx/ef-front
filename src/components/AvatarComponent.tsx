import {
    Avatar,
    Stack,
    AvatarBadge
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Client } from "../entities/Client";

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
