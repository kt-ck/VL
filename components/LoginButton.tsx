import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Group,
  Button,
  HoverCard,
  List,
  ThemeIcon,
  Box,
  Text,
} from "@mantine/core";
import { LoginPanel } from "./LoginPanel";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CircleDashed } from "tabler-icons-react";
import { clearAll, login } from "@/features/roleFeature/roleFeature";
import { gray_layout } from "@/type/const";
import { useRouter } from "next/router";

function LoginButton({
  btnTitle,
  btnVariant,
}: {
  btnTitle: string;
  btnVariant:
  | "outline"
  | "white"
  | "light"
  | "default"
  | "filled"
  | "gradient"
  | "subtle"
  | undefined;
}) {
  const [opened, handler] = useDisclosure(false);
  const dispatch = useAppDispatch();
  // const dispatch = useDispatch()
  const userinfo = useAppSelector((state) => state.role.userInfo);
  const router = useRouter();
  const submit = (
    type: string,
    data: { phone: string; name: string; password: string; terms: boolean }
  ) => {
    if (type === "register" && data.terms) {
      // pass 
    } else {
      const userInfo = { phonenumber: data.phone, password: data.password }
      dispatch(login(userInfo));
    }
    handler.close();
  };

  const logout = () => {
    dispatch(clearAll());
  };
  return (
    <>
      <Modal opened={opened} onClose={handler.close} zIndex={1000001}>
        <LoginPanel submit={submit} />
      </Modal>
      <Group>
        {userinfo.isLogIn ? (
          <HoverCard>
            <HoverCard.Target>
              <Box
                sx={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${gray_layout}`,
                  fontWeight: 500,
                }}
              >
                {userinfo.name[0]}
              </Box>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <List spacing="xs" size="sm" listStyleType="none" center>
                <List.Item
                  icon={
                    <ThemeIcon color="dark" size={24} radius="xl">
                      <CircleDashed size="1rem" />
                    </ThemeIcon>
                  }
                >
                  <Text
                    fw={500}
                    fz={"md"}
                    sx={{
                      minWidth: "10rem",
                      padding: "1rem 0",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/account")}
                  >
                    My Account
                  </Text>
                </List.Item>
              </List>
              <Button color={"dark"} fullWidth onClick={logout}>
                Log out
              </Button>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          <Button variant={btnVariant} color={"dark"} onClick={handler.open}>
            {btnTitle}
          </Button>
        )}
      </Group>
    </>
  );
}

export default LoginButton;
