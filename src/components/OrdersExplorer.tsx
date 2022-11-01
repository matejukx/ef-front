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
} from "@chakra-ui/react";
import { RepeatIcon, SmallAddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { OrdersApi } from "../api/OrderApi";
import { Client } from "../entities/Client";
import AvatarComponent from "./AvatarComponent";
import ClientExplorer from "./ClientExplorer";
import ItemList from "./ItemList";
import NewClientForm from "./NewClientForm";
import { Order, OrderedItem } from "../entities/Order";

const OrdersExplorer = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        OrdersApi.getOrders().then((res) => {
            setOrders(res);
            console.log(res);
            setFilteredOrders(res);
        });
    }, []);
    console.log(orders[0] as Order);
    const refreshOrders = () => {
        OrdersApi.getOrders().then((res) => {
            setOrders(res);
            console.log(res);
            console.log(orders);
            setFilteredOrders(res);
        });
    };

    const filterOrders = (event: any) => {
        if (event.target.value.length > 0) {
            setFilter(event.target.value);
            setFilteredOrders(
                orders.filter((order) =>
                    order.items.some((item) =>
                        item.item.name.toLowerCase().includes(filter.toLowerCase())
                    )
                )
            );
        } else {
            setFilter(event.target.value);
            setFilteredOrders(orders);
        }
    };

    // method to sum all items quantities
    const sumItems = (items: OrderedItem[]) => {
        let sum = 0;
        items.forEach((item) => {
            sum += item.quantity;
        });
        return sum;
    };
    

    // method to sum all the prices of the items in the order
    const sumOrder = (order: Order) => {
        let sum = 0;
        order?.items?.forEach((item : OrderedItem) => {
            sum += item?.quantity * item?.item?.price;
        });
        return sum;
    };

    // method to get shortened list of item names in the order
    const getItems = (order: Order) => {
        let items = "";
        order?.items?.forEach((item : OrderedItem) => {
            items += item?.item?.name + ", ";
        });
        return items.substring(0, items.length - 2);
    };

    const finalize = (id: number) => {
        OrdersApi.finishOrder(id).then((res) => {
            refreshOrders();
        });
    };

    return (
        <Container centerContent >
        <Stack direction="row">
        <Input
            placeholder="Find order by item name..."
            value={filter}
            onChange={filterOrders}
        />
        <Button onClick={refreshOrders}>
            <RepeatIcon/>
        </Button>
        </Stack>
        <Container centerContent margin="3" bg="whitesmoke">
        <TableContainer maxWidth="500%" margin={3}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Client</Th>
                            <Th>Items</Th>
                            <Th>Quantity</Th>
                            <Th>Total Price</Th>
                            <Th>Is Internet</Th>
                            <Th>Is Finished</Th>
                            <Th>Finish</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredOrders.map((order) => (
                            <Tr key={order?.id }>
                                <Td>{order?.client?.name} from {order?.client?.address}</Td>
                                <Td>{getItems(order)}</Td>
                                <Td>{sumItems(order.items)}</Td>
                                <Td>{sumOrder(order)}</Td>
                                <Td>{order.isInternet.toString()}</Td>
                                <Td>{order.isFinished.toString()}</Td>
                                <Td>
                                <Button onClick={() => finalize(order.id)}>
                                        <SmallAddIcon />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    </Container>
    );
}

export default OrdersExplorer;