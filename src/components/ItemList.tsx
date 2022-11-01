// component that displays a list of items with a button to add a new item
import { Item } from "../entities/Item";
import { ItemsApi } from "../api/ItemsApi";
import NewItemModal from "./NewItemModal";
import { useEffect, useState } from "react";
import { RepeatIcon, SmallAddIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useToast,
    Switch,
    FormControl, 
    FormLabel
} from "@chakra-ui/react";
import { CreateOrderResource, Order } from "../entities/Order";
import { OrdersApi } from "../api/OrderApi";

interface ItemListState {
    items: Item[];
}

const ItemList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [order, setOrder] = useState<CreateOrderResource>({items: [] as Item[]} as CreateOrderResource);
    const [isInternet, setIsInternet] = useState<boolean>(false);

    const toast = useToast();

    useEffect(() => {
        ItemsApi.getItems().then((response) => {
            setItems(response);
            setFilteredItems(response);
        });

        const value = localStorage.getItem("mainClient");
        if (value) {
            const client = JSON.parse(value);
            setOrder({ ...order, clientId: client.id });
        }
    }, []);

    const filterItems = (event: any) => {
        if (event.target.value.length > 0) {
            setFilter(event.target.value);
            setFilteredItems(
                items.filter((item) =>
                    item.name.toLowerCase().includes(filter.toLowerCase())
                )
            );
        } else {
            setFilter(event.target.value);
            setFilteredItems(items);
        }
    };

    const refreshItems = () => {
        ItemsApi.getItems().then((response) => {
            setItems(response);
            setFilteredItems(response);
        });
    };

    const addOneItem = (id: number) => {
        const item = items.find((item) => item.id === id);
        if (item !== undefined) {
            item.quantity += 1;
            ItemsApi.updateQuantity(item).then(() => {
                refreshItems();
            });
        }
    };

    const addOneItemToOrder = (id: number) => {
        const item = items.find((item) => item.id === id);
        if (item !== undefined) {
            const orderItems = order.items;
            orderItems.push(item);
            setOrder({...order, items: orderItems});
        }
        toast({
            title: "Added new item to order.",
            description: "Successfully added " + item?.name + " to order.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        console.log(order);
    };

    const sendOrder = () => {
        order.isInternet = isInternet;
        OrdersApi.postOrder(order).then((response) => {
            console.log(response);
        });
        toast({
            title: "Order sent.",
            description: "Successfully sent order.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };


    return (
        <Container alignSelf="center" centerContent width="400%">

            <Stack direction="row">
            <NewItemModal />
            <Button hidden={order.items.length > 0 ? false : true} margin={3} onClick={sendOrder}>Send your order!</Button>
            </Stack>
            
            <Stack direction="row" spacing="8" margin={3}>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={filterItems}
                />
                <Button onClick={refreshItems}>
                    <RepeatIcon />
                </Button>
                <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="is-internet" mb="0">
                    Is order internet?
                </FormLabel>
                <Switch onChange={() => setIsInternet(!isInternet)} />
            </FormControl>
                
            </Stack>

            <TableContainer maxWidth="200%" margin={3}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Price</Th>
                            <Th>Description</Th>
                            <Th>Quantity</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredItems.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.name}</Td>
                                <Td>{item.price}</Td>
                                <Td>{item.description}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>
                                    <Button onClick={() => addOneItem(item.id)}>
                                        <SmallAddIcon />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            addOneItemToOrder(item.id)
                                        }
                                    >
                                        <ChevronRightIcon />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ItemList;
