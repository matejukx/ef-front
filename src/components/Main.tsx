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
import { useEffect, useState } from "react";
import { ClientsApi } from "../api/ClientsApi";
import { Client } from "../entities/Client";
import AvatarComponent from "./AvatarComponent";
import ClientExplorer from "./ClientExplorer";
import ItemList from "./ItemList";
import NewClientForm from "./NewClientForm";
import OrdersExplorer from "./OrdersExplorer";

const Main = () => {
    

    return (
        <Container centerContent alignSelf="center">
            <Tabs boxSizing="border-box" width="200%">
                <TabList>
                    <Tab>Clients</Tab>
                    <Tab>Items</Tab>
                    <Tab>Orders</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <AvatarComponent />
                        <ClientExplorer />
                    </TabPanel>
                    <TabPanel>
                        <AvatarComponent />
                        <ItemList />
                    </TabPanel>
                    <TabPanel>
                        <AvatarComponent />
                        <OrdersExplorer />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Main;
