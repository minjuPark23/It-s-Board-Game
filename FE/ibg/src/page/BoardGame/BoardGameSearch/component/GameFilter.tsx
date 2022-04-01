import { useState } from "react";
import {
  styled,
  alpha,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Divider,
  Button,
  Chip,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// 필터 항목
const filterItems = [
  {
    title: "인원 수",
    value: "player",
    items: [
      { value: 2, label: "2명 이상" },
      { value: 3, label: "3명 이상" },
      { value: 4, label: "4명 이상" },
      { value: 5, label: "5명 이상" },
    ],
  },
  {
    title: "플레이 시간",
    value: "time",
    items: [
      { value: 20, label: "20분 이상" },
      { value: 30, label: "30분 이상" },
      { value: 60, label: "60분 이상" },
      { value: 120, label: "120분 이상" },
    ],
  },
  {
    title: "난이도",
    value: "weight",
    items: [
      { value: 0, label: "매우 쉬움" },
      { value: 1, label: "쉬움" },
      { value: 2, label: "보통" },
      { value: 3, label: "어려움" },
      { value: 4, label: "매우 어려움" },
    ],
  },
  {
    title: "나이",
    value: "age",
    items: [
      { value: 5, label: "5+" },
      { value: 6, label: "6+" },
      { value: 7, label: "7+" },
      { value: 8, label: "8+" },
      { value: 9, label: "9+" },
      { value: 10, label: "10+" },
      { value: 11, label: "11+" },
      { value: 15, label: "15+" },
      { value: 17, label: "17+" },
    ],
  },
  {
    title: "평점",
    value: "score",
    items: [
      { value: 1, label: "1+" },
      { value: 2, label: "2+" },
      { value: 3, label: "3+" },
      { value: 4, label: "4+" },
    ],
  },
];

// 아코디언 스타임
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125) ",
}));

// 필터 테이블 스타일
const FilterTitle = styled(ListItemText)(({ theme }) => ({
  width: "20%",
}));

// 검색창 스타일
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 18,
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: 13.5,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export interface searchFilter {
  gameName?: string;
  gamePlayer?: number;
  gameTime?: number;
  gameWeight?: number;
  gameAge?: number;
  gameScore?: number;
  gameCategory?: string[];
  userNo?: number;
}

export default function GameFilter() {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [player, setPlayer] = useState(0);
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState([]);

  const handleAccordion = () => {
    setExpanded(!expanded);
  };

  const setFilter = (titleVal: string, itemVal: any) => {};

  return (
    <Accordion expanded={expanded} onChange={handleAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ backgroundColor: "rgba(0, 0, 0, .03)" }}
      >
        <FilterListIcon sx={{ mr: 1, color: "gray" }} />
        상세검색(Filter)
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          <ListItem>
            <FilterTitle>보드게임명</FilterTitle>
            <ListItem>
              <Search>
                <StyledInputBase
                  placeholder="보드게임 명"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </ListItem>
          </ListItem>
          <Divider />
          {filterItems.map((item) => (
            <Box key={item.value}>
              <ListItem>
                <FilterTitle>{item.title}</FilterTitle>
                <ListItem sx={{ flexWrap: "wrap" }}>
                  {item.items.map((i) => (
                    <Chip
                      key={i.value}
                      label={i.label}
                      variant="outlined"
                      color="primary"
                      clickable
                      sx={{ mr: 1 }}
                    />
                  ))}
                </ListItem>
              </ListItem>
              <Divider />
            </Box>
          ))}
          <ListItem>
            <FilterTitle>카테고리</FilterTitle>
            <ListItem>
              <Autocomplete
                multiple
                options={tempCategory}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={{ width: "100%" }}
                  />
                )}
                ChipProps={{ color: "primary" }}
                sx={{ width: "100%" }}
              />
            </ListItem>
          </ListItem>
          <Divider />
        </List>
        <Box textAlign="right">
          <Button variant="contained">검색</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

// 임시 데이터
const tempCategory = ["미스터리", "SF", "스피드", "추리"];
