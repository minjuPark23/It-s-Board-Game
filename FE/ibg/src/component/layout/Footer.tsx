import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const StyledFooter = styled(AppBar)(({ theme }) => ({
  position: "static",
  height: "100%",
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.warning.main,
  boxShadow: "none",
  color: theme.palette.common.black,
}));

const FooterLink = styled("span")(({ theme }) => ({
  fontSize: 13,
  marginRight: theme.spacing(2),
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.grey[600],
  },
}));

const StyledImage = styled("img")(() => ({
  position: "absolute",
  right: 0,
  bottom: 2,
  width: 50,
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "block" }}>
          <Typography sx={{ mb: 2 }}>
            <FooterLink>서비스 이용약관</FooterLink>
            <FooterLink sx={{ fontWeight: "bold" }}>
              개인정보 처리방침
            </FooterLink>
            <FooterLink>IBG</FooterLink>
          </Typography>
          <Typography variant="caption" gutterBottom>
            (주)IBG 공동대표 곽현준 권오범 박민주 박혜준 신미래 정하은
          </Typography>
          <Typography variant="caption" component="div">
            사업자등록번호 102-93-84756
          </Typography>
          <Typography variant="caption" gutterBottom>
            © 2022 by SSAFY 6기 대전 1반 1팀, Inc. All rights reserved.
          </Typography>
          <StyledImage src="img/puzzle.png"></StyledImage>
        </Toolbar>
      </Container>
    </StyledFooter>
  );
}
