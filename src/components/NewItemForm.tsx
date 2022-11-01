import { Item } from "../entities/Item";
import { ItemsApi } from "../api/ItemsApi";
import { useEffect, useState } from "react";
import {
    Input,
    Container,
    Button,
    Heading
} from "@chakra-ui/react";

const NewItemForm = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const createItem = () => {
        const item = {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
        };
        ItemsApi.postItem(item);
    };

    return (
        <Container alignSelf="center" centerContent>
            <Heading>Create a new item</Heading>
            <Input
                margin="2"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <Input
                margin="2"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <Input
                margin="2"
                placeholder="Price"
                onChange={(event) => setPrice(Number(event.target.value))}
            />
            <Input
                margin="2"
                placeholder="Quantity"
                onChange={(event) => setQuantity(Number(event.target.value))}
            />
            <Button onClick={createItem}>Create Item</Button>~
        </Container>
    );
};

export default NewItemForm;
