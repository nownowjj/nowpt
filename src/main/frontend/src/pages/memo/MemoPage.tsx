import React, {useState} from 'react';
import styled from "styled-components";
import MemoItemComponent from "./MemoItemComponent";
import Base from "../../component/BottomSheet/Base";
import {setVisible} from "../../redux/slice/bottomSheetSlice";
import {useDispatch, useSelector} from "react-redux";
import MemoAddComponent from "./MemoAddComponent";
import {deleteAllMemo, MemoResponseType, selectMemo} from "../../api/Memo";
import {useQuery} from "react-query";
import MemoEmptyWrap from "./MemoEmptyWrap";
import MemoItemLoadingComponent from "./MemoItemLoadingComponent";
import {BsFillTrashFill} from "react-icons/bs";
import {RootState} from "../../redux/store/store";
import {setMemoLists, setMemoSize} from "../../redux/slice/memoSlice";
import {getData} from "../../api/Api";
import {useCustomQueryClient} from "../../hooks/useCustomQueryClient";
import CalendarLayout from "../calendar/Layout/CalendarLayout";
import {CiMemoPad} from "react-icons/ci";
import MemoSearchComponent from "./MemoSearchComponent";
import {useConfirm} from "../../hooks/useConfirm";

const MemoPage = () => {
    const dispatch = useDispatch();
    const {invalidateQueries} = useCustomQueryClient();

    const [memoDetail, setMemoDetail] = useState<MemoResponseType | null>(null);
    const [deleteMode, setMode] = useState<boolean>(false);
    const selectSnLists = useSelector((state: RootState) => state.memo.deleteSnLists);
    const memoSize = useSelector((state: RootState) => state.memo.memoSize);
    const { showAlert, messageCall, confirmFunction, handleConfirm, handleClose } = useConfirm();

    // api call 단계에서 callback 딜레이가 끝나기 전에 콜백을 수행 시킴. 1초 동안 loading component 노출
    const memoLoadingCallback = (data: MemoResponseType[]) => {
        dispatch(setMemoSize(data.length))
    };

    const {data: memoList, isFetching} = useQuery(['myMemo'], () => getData(selectMemo, {}, 800, memoLoadingCallback), {
        staleTime: Infinity, // 캐시된 결과를 무기한으로 사용
    });


    const openMemoDetail = (data: MemoResponseType | null) => {
        setMemoDetail(data);
        dispatch(setVisible())
    }

    const handleDeleteAll = async () => {
        if (selectSnLists.length == 0) {
            return false;
        }
        await deleteAllMemo(selectSnLists)
        dispatch(setMemoLists([]))
        setMode(false)
        invalidateQueries(['myMemo'])
    }

    const gnbSubTitle = (
        <span style={{marginRight: "5px"}} onClick={() => {
            setMode(prevState => !prevState)
            dispatch(setMemoLists([]))
        }}>
            {deleteMode ? "취소" :  memoList && memoList.length > 0 && "삭제"}
        </span>
    );


    const [isSearching , setIsSearching] = useState(false);
    const [filterList,setFilterList]=useState<MemoResponseType[]|undefined>([]);

    // 검색어 입력시 발동
    const findSearchText=(searchText:any)=>{
        if (!searchText) { // 검색어 없을 시에 검색 상태 변경
            setIsSearching(false)
            return false;
        }

        setIsSearching(true) // 검색어 존재 검색 상태 변경
        // 메모 내용 또는 제목에 입력받은 검색어가 존재 하는지 필터링
        const searchResults = memoList && memoList.filter(memo => {
            const titleIncludesText = memo.title?.toLowerCase().includes(searchText.toLowerCase());
            const contentIncludesText = memo.content.toLowerCase().includes(searchText.toLowerCase());
            return titleIncludesText || contentIncludesText;
        });
        setFilterList(searchResults); // 필터링 리스트
    }

    return (
        <CalendarLayout gnbTitle={"메모"} gnbSubElement={gnbSubTitle}>
            <MemoPageWrap>
                <MemoSearchComponent searchCallback={findSearchText}/>
                {
                    // useQuery 딜레이 발생 요청
                    isFetching ?
                        <MemoItemWrap>
                            <MemoItemLoadingComponent size={memoSize}/>
                        </MemoItemWrap>
                        :
                            isSearching ?
                                <MemoItemWrap>
                                    {
                                        filterList && filterList.length > 0 ?
                                        filterList.map((memo) => (
                                        <MemoItemComponent
                                            isDeleteMode={deleteMode}
                                            key={memo.memoSn}
                                            click={() => openMemoDetail(memo)} data={memo}
                                        />
                                    ))
                                        : <div>검색 결과가 없어요</div>
                                    }
                                </MemoItemWrap>
                                :
                        memoList && memoList.length > 0
                            ? // 데이터 존재
                            <React.Fragment>
                                <MemoItemWrap>
                                    {memoList.map((memo) => (
                                        <MemoItemComponent
                                            isDeleteMode={deleteMode}
                                            key={memo.memoSn}
                                            click={() => openMemoDetail(memo)} data={memo}
                                        />
                                    ))
                                    }
                                </MemoItemWrap>
                            </React.Fragment>
                            : // 데이터 없음
                            <MemoEmptyWrap clickAction={() => openMemoDetail(null)}/>
                }
                {deleteMode &&
                    <TrashWrapBtnWrap>
                        <MemoTrashBtn onClick={() => handleDeleteAll()}/>
                    </TrashWrapBtnWrap>
                }

                <MemoAddBtn onClick={() => openMemoDetail(null)}/>
                <Base bottomComponent={
                    <MemoAddComponent data={memoDetail}/>
                }/>
            </MemoPageWrap>
        </CalendarLayout>
    );
};

const TrashWrapBtnWrap = styled.div`
  position: fixed;
  right: 6%;
  bottom: 130px;
  display: flex;
  justify-content: center; /* 수평 정렬 */
  align-items: center; /* 수직 정렬 */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #e8e8e8;
  color: #373636;
  background: white;
  z-index: 2;
`

const MemoTrashBtn = styled(BsFillTrashFill)`
  font-size: 24px;

  animation: bounce 0.3s 0.1s cubic-bezier(0, 0, 0.18, 0.99) infinite alternate;

  @keyframes bounce {
    to {
      transform: translateY(-4px);
    }
  }

`
const MemoAddBtn = styled(CiMemoPad)`
  z-index: 2;
  position: fixed;
  right: 6%;
  bottom: 70px;
  font-size: 50px;
  border-radius: 50%;
  border: 1px solid #e8e8e8;
  color: #373636;
  background: white;
  padding: 10px;
`


const MemoPageWrap = styled.div`
  position: relative;
  background: rgb(249 249 249);
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 100px;
`
const MemoItemWrap = styled.div`
  width: 100%;
  //padding-top: 20px;
  justify-items: center;
  display: grid; /* 행 당 2개의 요소를 표시하고 싶으므로 grid-template-columns를 사용하여 설정 */
  //grid-template-columns: repeat(2, minmax(165px, 1fr));  /* 각 행의 높이를 자동으로 설정하고 싶으므로 grid-auto-rows를 사용하여 설정 */
  grid-template-rows: repeat(2, minmax(240px, 1fr)); /* 각 행의 높이를 자동으로 설정하고 싶으므로 grid-auto-rows를 사용하여 설정 */
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); /* 반응형 그리드 설정 */
  //grid-auto-rows: 240px; /* 각 요소의 높이는 220px로 고정 */
  grid-row-gap: 20px; /*  열 간격 */
  grid-column-gap: 5px; /*행 간격*/

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(170px, 1fr)); /* 768px 이상의 화면 너비에서는 행당 요소의 개수를 3개로 조정 */
    grid-row-gap: 25px; /*  열 간격 */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(170px, 1fr)); /* 768px 이상의 화면 너비에서는 행당 요소의 개수를 3개로 조정 */
    grid-row-gap: 30px; /*  열 간격 */
  }
`

export default MemoPage;