import * as React from "react";
import { useNavigate } from "react-router-dom";
// material ui
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ImageListItem from "@mui/material/ImageListItem";
// 아이콘
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LoginIcon from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

// Nav 항목 - link가 존재하면 페이지 이동, method가 존재하면 해당 함수 실행
const pages = [
  { label: "보드게임", icon: <ExtensionOutlinedIcon />, link: "/search" },
  { label: "BGM", icon: <StorefrontOutlinedIcon />, link: "/" },
];
const userNav = [
  {
    label: "관심목록",
    icon: <FavoriteBorderIcon />,
    link: "/",
  },
  {
    label: "채팅",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    method: null,
  },
  { label: "로그아웃", icon: <Logout />, method: null },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "static",
  backgroundColor: "transparent",
  boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
}));

// 검색창 스타일
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 18,
  backgroundColor: alpha(theme.palette.warning.main, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.warning.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "grey",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: 13.5,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
    },
  },
}));

export default function NavBar() {
  // 로그인 여부
  const [auth, setAuth] = React.useState(false);
  // 사용자 메뉴 Open/Close(PC)
  const [userMenu, setUserMenu] = React.useState<null | HTMLElement>(null);
  // Mobild 메뉴 Open/Close
  const [mobileMenu, setMobileMenu] = React.useState(false);
  // 페이지 이동
  const navigate = useNavigate();

  // 로그인 상태 확인하여 상태값 변경하기
  const checkLoginState = () => {
    setAuth(false);
  };

  // 사용자 메뉴 열고 닫기(로그인 했을 때)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  // Mobile 메뉴 열고 닫기
  const toggleMobileMenu =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        (event &&
          event.type === "keydown" &&
          (event as React.KeyboardEvent).key === "Tab") ||
        (event as React.KeyboardEvent).key === "Shift"
      ) {
        return;
      }
      setMobileMenu(open);
    };

  // Mobile 메뉴 리스트
  const MobileMenuList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleMobileMenu(false)}
      onKeyDown={toggleMobileMenu(false)}
    >
      <List>
        {pages.map((page) => (
          <ListItem button key={page.label} onClick={() => movePage(page.link)}>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {auth ? (
        <List>
          {userNav.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => (item.link ? movePage(item.link) : item.method)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          <ListItem button onClick={() => movePage("/signin")}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="로그인" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  const movePage = (page: string) => {
    navigate(page);
  };

  // 수정필요 - 로그인 후 NavBar 확인을 위한 임시 함수
  const tempChangeAuth = () => {
    movePage("/signin"); //임시용
    setAuth(true);
  };

  return (
    <StyledAppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <ImageListItem
            sx={{ mr: { xs: 0, md: 3 }, minWidth: 65, cursor: "pointer" }}
            onClick={() => movePage("/")}
          >
            <img src="img/logo.PNG" alt="logo" />
          </ImageListItem>

          {/* Nav 반응형 - PC --------------------------------------*/}
          {/* 페이지 이동 Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                sx={{ my: 2, color: "black", display: "block" }}
                onClick={() => movePage(page.link)}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          {/* 검색창 */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="보드게임 검색"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* 오른쪽 메뉴(사용자) auth: 로그인 여부 */}
          {auth ? (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Tooltip title="사용자 메뉴">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* 수정필요 - 사용자 닉네임에 따라 변경 */}
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="account-menu"
                anchorEl={userMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(userMenu)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
              >
                {userNav.map((item) => (
                  <MenuItem sx={{ fontSize: "0.9rem" }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                color="warning"
                sx={{ color: "black", display: { xs: "none", md: "block" } }}
                onClick={() => movePage("/signin")}
              >
                로그인
              </Button>
            </Box>
          )}
          {/* Nav 반응형 Mobile --------------------------------------- */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <React.Fragment key="right">
              <IconButton size="large" onClick={toggleMobileMenu(true)}>
                <MenuIcon />
              </IconButton>

              <SwipeableDrawer
                anchor="right"
                open={mobileMenu}
                onOpen={toggleMobileMenu(true)}
                onClose={toggleMobileMenu(false)}
              >
                {MobileMenuList()}
              </SwipeableDrawer>
            </React.Fragment>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
