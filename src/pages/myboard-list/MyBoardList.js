import {Pagination} from "@mui/material";
import {Card} from "../../components/Card";
import {useEffect, useState} from "react";
import api from "../../utils/api";
import {useSearchParams} from "react-router-dom";
import "../board-list/boardList.scss";
import {useSelector} from "react-redux";
import {jwtUtils} from "../../utils/jwtUtils";
import moment from "moment";

const MyBoardList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // user의 id를 알아내기 위해 token 가져오기
  const token = useSelector(state => state.Auth.token);
  // 렌더링 되고 한번만 전체 게시물 갯수 가져와서 페이지 카운트 구하기
  // 렌더링 되고 한번만 페이지에 해당하는 게시물 가져오기
  useEffect(() => {
    // 페이지에 해당하는 게시물 가져오기
    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      const user_id = jwtUtils.getId(token);
      const {data} = await api.get(`/api/board/user/list?page_number=${page_number}&page_size=4&user_id=${user_id}`);
      return data;
    }
    // 현재 페이지에 해당하는 게시물로 상태 변경하기
    getBoardList().then(result => setBoardList(result));
    // 게시물 전체 갯수 구하기
    const getTotalBoard = async () => {
      const user_id = jwtUtils.getId(token);
      const {data} = await api.get(`/api/board/user/count/${user_id}`);
      return data.total;
    }
    // 페이지 카운트 구하기: (전체 board 갯수) / (한 페이지 갯수) 결과 올림
    getTotalBoard().then(result => setPageCount(Math.ceil(result / 4)));
  }, [])

  return (
    <div className="boardList-wrapper">
      <div className="boardList-header">
        나의 게시물 📝
      </div>
      <div className="boardList-body">
        {boardList.map((item, index) => (
          <Card key={item.id} username={item.user.username} date={moment(item.created).add(9, "hour").format('YYYY-MM-DD')}
                title={item.title} content={item.content}
                board_id={item.id} img_url={`/api/image/view/${item.id}`}
          />
        ))}
      </div>
      <div className="boardList-footer">
        {/*페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기*/}
        <Pagination
          variant="outlined" color="primary" page={Number(searchParams.get("page"))}
          count={pageCount} size="large"
          onChange={(e, value) => {
            window.location.href = `/myboard-list?page=${value}`;
          }}
          showFirstButton showLastButton
        />
      </div>
    </div>
  )
}
export default MyBoardList;