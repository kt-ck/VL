import Head from "next/head";
import { Box, Select, Text, Group, Title, SimpleGrid } from "@mantine/core";
import { useStyles } from "@/styles/wishlist";
import Product from "@/components/ProductList/Product";
import { selectWishList } from "@/features/roleFeature/roleFeature";
import { useAppSelector } from "@/store/hooks";
const data = [
  { value: "react", label: "React" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
];
export default function WishList() {
  const { classes } = useStyles();
  const wishlist = useAppSelector(selectWishList);
  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={classes.container}>
        <Group>
          <Title order={2} fw={500}>{`${wishlist.products.length}     items`}</Title>
          <Text sx={{ marginLeft: "auto" }}>Sort by</Text>
          <Select data={data} placeholder="Pick one" />
        </Group>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: "62rem", cols: 3 },
            { maxWidth: "48rem", cols: 2 },
            { maxWidth: "36rem", cols: 1 },
          ]}
        >
          {wishlist.products.map((item) => (
            <Product product={item} key={item.name} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
