import React, { useState } from "react";
//모달
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button, Grid, TextField, DialogContentText } from "@mui/material";

interface IProps {
  open: boolean;
  handleClose: () => void;
  sendDataToParent: (
    title: string,
    price: string,
    contents: string,
    file: File | Blob
  ) => void; //여기에 정보 담아서 주기
}

const MarketUploadDialog = ({
  open,
  handleClose,
  sendDataToParent,
}: IProps) => {
  const Input = styled("input")({
    display: "none",
  });
  const Img = styled("img")({
    width: "100%",
  });

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [contents, setContents] = useState("");
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<any>();

  const callHandleSubmit = () => {
    /* 예외 상황 처리 */
    if (title.length < 2) return alert("제목을 확인해주세요");
    if (!parseInt(price)) return alert("가격은 숫자만 입력해주세요");
    if (file === undefined || file === null)
      return alert("파일을 업로드해주세요");
    if (contents.length === 0) return alert("내용을 확인해주세요");

    /* 부모에게 제목,가격,내용, 파일 전달*/
    sendDataToParent(title, price, contents, file);
  };
  /* 제목 지정 */
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  /* 가격 지정 */
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  /* 내용 지정 */
  const onChangeContents = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };
  /* 파일 지정 */
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //파일이 아닌 경우
    if (!e.target.files) {
      return;
    }
    // 파일이 이미지가 아닌 경우
    else if (
      !e.target.files[0].name.match(/.(jpg|jpeg|png|gif|JPG|PNG|JPEG)$/i)
    ) {
      alert("이미지 파일을 선택해주세요");
    }
    //파일 저장
    else {
      const selectedFile = e.target.files[0];
      console.log(selectedFile);
      setFile(selectedFile);
      // 미리보기
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: { md: "60%" },
          maxHeight: { md: "80%" },
          borderRadius: { md: 8, sm: 0 },
        },
      }}
      maxWidth="xs"
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ background: "#67B6FF" }}
      >
        <DialogTitle
          sx={{
            fontSize: { xs: 14, md: 16 },
            fontWeight: "bold",
            color: "white",
          }}
        >
          거래 등록 <AddBusinessIcon sx={{ verticalAlign: "-0.2rem", ml: 1 }} />
        </DialogTitle>
      </Grid>

      <Grid direction="row" container spacing={2} justifyContent="center">
        <Grid container item xs={10} sm={8} sx={{ mt: 3 }}>
          <DialogContent>
            <form>
              <DialogContentText>제목</DialogContentText>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={title}
                onChange={onChangeTitle}
                id="title"
                placeholder="제목을 입력해주세요"
                name="title"
                autoFocus
              />

              <DialogContentText>가격(원)</DialogContentText>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={price}
                onChange={onChangePrice}
                placeholder="가격을 입력해주세요"
                name="price"
                autoFocus
              />
              <DialogContentText>파일추가</DialogContentText>
              {preview && <Img src={preview} />}
              <DialogContentText>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={onChangeFile}
                    required
                  />
                  <Button
                    variant="outlined"
                    style={{
                      maxHeight: "60px",
                      minHeight: "60px",
                    }}
                    fullWidth
                    size="large"
                    component="span"
                  >
                    사진 업로드
                    <AddAPhotoIcon sx={{ verticalAlign: "-0.2rem", ml: 1 }} />
                  </Button>
                </label>
              </DialogContentText>

              <DialogContentText>내용</DialogContentText>
              <TextField
                placeholder="상품 상세 정보를 입력해주세요"
                multiline
                rows={5}
                required
                value={contents}
                onChange={onChangeContents}
                name="content"
                fullWidth
              />
            </form>
          </DialogContent>
        </Grid>
      </Grid>
      <Grid
        direction="row"
        container
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={callHandleSubmit}
          >
            등록
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default MarketUploadDialog;
