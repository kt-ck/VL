import React from "react";
import {
  Title,
  Box,
  Group,
  Stack,
  Text,
  Divider,
  Button,
  Flex,
} from "@mantine/core";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import ProductCard from "@/components/order/ProductCard";
import ServiceCard from "@/components/Product/ServiceCard";
import Head from "next/head";
import {
  AlertCircle,
  AlignBoxBottomLeft,
  Car,
  Recycle,
} from "tabler-icons-react";
import { gray_layout } from "@/type/const";
import { useStyles } from "@/styles/order";
const services = [
  {
    title: "支付方式",
    icon: AlignBoxBottomLeft,
    desc: "Credit card, debit card or bank transfer",
  },
  {
    title: "配送服务",
    icon: Car,
    desc: "Complimentary Delivery or Collect-in-Store",
  },
  {
    title: "退换货服务",
    icon: Recycle,
    desc: "Complimentary, in store and online",
  },
];

function Confirm() {
  const products = useAppSelector((state) => state.role.cart.products);
  const { classes, theme } = useStyles();
  return (
    <>
      <Head>
        <title>Comfirm Order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex className={classes.container}>
        <Box className={classes.cart}>
          <Group>
            <Title order={1} fw={400} className={classes.header}>
              {`MY SHOPPING BAG(${products.length})`}
            </Title>
            <Link
              href={"/"}
              style={{
                marginLeft: "auto",
                color: theme.colorScheme === "light" ? "black" : "white",
              }}
            >
              {" "}
              Continue Shopping
            </Link>
          </Group>
          <Stack sx={{ marginTop: "2rem", gap: "1rem" }}>
            {products.map((item) => (
              <ProductCard item={item} key={item.name} />
            ))}
          </Stack>
        </Box>
        <Box className={classes.pricePanel}>
          <Stack className={classes.priceContent}>
            <Group>
              <Title order={3} fw={500}>
                Quantity
              </Title>
              <Text sx={{ marginLeft: "auto" }} size={"xl"} fw={600}>
                {products.reduce((prev, cur) => prev + cur.count, 0)}
              </Text>
            </Group>
            <Group>
              <Title order={3} fw={500}>
                Total
              </Title>
              <Text sx={{ marginLeft: "auto" }} size={"xl"} fw={600}>
                $
                {products.reduce(
                  (prev, cur) => prev + cur.count * cur.price,
                  0
                )}
              </Text>
            </Group>

            <Button color={theme.colorScheme === "light" ? "dark" : "gray"}>
              Proceed to Checkout
            </Button>
          </Stack>
          <Divider />
          {services.map((item, index) => (
            <Box
              sx={{
                borderTop: index === 0 ? "none" : `1px solid ${gray_layout}`,
              }}
              key={item.title}
            >
              <ServiceCard service={item} index={0} />
            </Box>
          ))}
        </Box>
      </Flex>
    </>
  );
}

export default Confirm;
