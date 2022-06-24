import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
import {Button, Dialog, DialogContent, IconButton, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import api from "../utils/api";
import {useLocation, useNavigate} from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./comments.scss";

const Comments = ({board_id}) => {
  // 로그인 후 현재 경로로 돌아오기 위해 useLocation 사용
  const location = useLocation();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);
  // 입력한 댓글 내용
  const [content, setContent] = useState("");
  const token = useSelector(state => state.Auth.token);
  // 현재 페이지, 전체 페이지 갯수
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);

  // 페이지에 해당하는 댓글 목록은 page 상태가 변경될 때마다 가져옴
  // 맨 처음 페이지가 1이므로 처음엔 1페이지에 해당하는 댓글을 가져온다
  useEffect(() => {
    const getCommentList = async () => {
      const {data} = await axios.get(`/api/comment/list?board_id=${board_id}&page_number=${page}&page_size=${5}`);
      return data;
    }
    // 기존 commentList에 데이터를 덧붙임
    getCommentList().then((result) => setCommentList([...commentList, ...result]));
  }, [page])

  // 페이지 카운트는 컴포넌트가 마운트되고 딱 한번만 가져오면됨
  useEffect(() => {
    // 댓글 전체 갯수 구하기
    const getTotalBoard = async () => {
      const {data} = await axios.get(`/api/comment/count?board_id=${board_id}`);
      return data.total;
    }
    // 페이지 카운트 구하기: (전체 comment 갯수) / (한 페이지 갯수) 결과 올림
    getTotalBoard().then((result) => setPageCount(Math.ceil(result / 5)));
  }, []);

  // 댓글 추가하기, 댓글 추가하는 API는 인증 미들웨어가 설정되어 있으므로
  // HTTP HEADER에 jwt-token 정보를 보내는 interceptor 사용
  const submit = useCallback(async () => {
    const comment = {
      board_id: board_id,
      // DB에 엔터가 먹힌 상태로 들어가므로 제대로 화면에 띄우기 위해 <br>로 치환
      content: content,
      user_id: jwtUtils.getId(token)
    }
    // axios interceptor 사용 : 로그인한 사용자만 쓸 수 있다!
    await api.post('/api/comment', comment);
    alert("댓글 등록 완료");
    window.location.reload();
  }, [content]);
  console.log(commentList)
  /*modal 관련 코드*/
  // 로그인 후 돌아올 수 있게 현재 경로 세팅
  const goLogin = () => {
    setShow(false);
    navigate(`/login?redirectUrl=${location.pathname}`);
  }
  // 로그인을 하지 않은 상태에서 댓글 입력 창을 클릭하면 Modal이 열림.
  const isLogin = () => {
    if (!jwtUtils.isAuth(token)) {
      setShow(true);
    }
  }

  return (
    <div className="comments-wrapper">
      <div className="comments-header">
        <TextField
          className="comments-header-textarea"
          maxRows={3}
          onClick={isLogin}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          multiline placeholder="댓글을 입력해주세요✏️"
        />
        {content !== "" ? (
          <Button variant="outlined" onClick={submit}>등록하기</Button>
        ) : (
          <Button variant="outlined" disabled={true}>
            등록하기
          </Button>
        )}
      </div>
      <div className="comments-body">
        {commentList.map((item, index) => (
          <div key={index} className="comments-comment">
            <div className="comment-username-date">
              <div className="comment-date">{moment(item.created).add(9, "hour").format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className="comment-content">{item.content}</div>
            <div className="comment-username">{item.user.username}</div>
            <hr/>
          </div>
        ))}
      </div>
      {
        /*
          page(현재 페이지)와 pageCount(총 페이지 갯수)가 같으면 서버에서
          모든 댓글을 가져온 상태이므로 댓글 더보기 버튼이 보이지 않게 한다.
          page의 초기 상태가 1이기 때문에 컴포넌트가 마운트 된 후 첫페이지를 가져오고 만약 pageCount가 5이고
          현재 page가 4라면 버튼을 누르는 순간 page가 5가되어 마지막 페이지의 데이터를 가져온다.
        */
        page < pageCount && (
          <div className="comments-footer"
               onClick={() => {
                 setPage(page + 1);
               }}
          >
            댓글 더보기
            <KeyboardArrowDownIcon/>
          </div>
        )
      }

      {/*modal*/}
      <Dialog open={show}>
        <DialogContent style={{position: "relative"}}>
          <IconButton
            style={{position: "absolute", top: "0", right: "0"}}
            onClick={() => {
              setShow(false)
            }}
          >
            <DisabledByDefaultOutlinedIcon/>
          </IconButton>
          <div className="modal">
            <div className="modal-title">로그인이 필요합니다</div>
            <div className="modal-content">로그인 페이지로 이동하시겠습니까?</div>
            <div className="modal-button">
              <Button
                variant="outlined" color="error"
                onClick={goLogin}
              >
                예
              </Button>
              <Button
                variant="outlined" color="primary"
                onClick={() => {
                  setShow(false)
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Comments;