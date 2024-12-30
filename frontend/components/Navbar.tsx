import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [token, setToken] = useState(false);
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setToken(false);
    } else {
      setToken(true);
    }

    const paths = token
      ? ["/user/profile", "/user/chats", "/user/requests"]
      : ["/", "/user/signup", "/user/signin"];

    const currentIndex = router.pathname.startsWith("/user/chats")
      ? 1
      : paths.indexOf(router.pathname);
    setValue(currentIndex >= 0 ? currentIndex : 0);
  }, [router.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const paths = token
      ? ["/user/profile", "/user/chats", "/user/requests"]
      : ["/", "/user/signup", "/user/signin"];

    setValue(newValue);
    router.push(paths[newValue]);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.light",
            },
            "& .MuiTab-root": {
              color: "primary.contrastText",
              "&.Mui-selected": {
                color: "primary.light",
              },
            },
          }}
        >
          {token && <Tab label="Profile" />}
          {token && <Tab label="Chats" />}
          {token && <Tab label="Requests" />}

          {!token && <Tab label="Home" />}
          {!token && <Tab label="Sign Up " />}
          {!token && <Tab label="Sign In" />}
        </Tabs>
      </Box>
    </>
  );
}
