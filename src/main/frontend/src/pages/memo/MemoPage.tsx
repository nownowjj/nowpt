import React, {useState} from 'react';
import TopGnbComponent from "../calendar/TopGnb/TopGnbComponent";
import styled from "styled-components";
import CalendarBottomMenu from "../calendar/Bottom/CalendarBottomMenu";
import MemoItemComponent from "./MemoItemComponent";
import {AiFillEdit} from "react-icons/ai";
import Base from "../../component/BottomSheet/Base";
import {setVisible} from "../../redux/slice/bottomSheetSlice";
import {useDispatch} from "react-redux";
import MemoAddComponent from "./MemoAddComponent";
import {MemoResponseType, selectMemo} from "../../api/Memo";
import {useQuery, useQueryClient} from "react-query";
import MemoEmptyWrap from "./MemoEmptyWrap";

const MemoPage = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const {data: memoList} = useQuery({
        queryKey: ['myMemo'],
        queryFn: async () => {
            const result = await selectMemo();
            return result.data;
        },
        staleTime: Infinity, // 캐시된 결과를 무기한으로 사용
    });

    const [memoDetail, setMemoDetail] = useState<MemoResponseType | null>(null);

    const openMemoDetail = (data: MemoResponseType | null) => {
        setMemoDetail(data);
        dispatch(setVisible())
    }

    return (
        <MemoPageWrap>
            <TopGnbComponent page={'메모'}/>

            {memoList && memoList.length > 0 ?
                <React.Fragment>
                    <MemoItemWrap>
                        {memoList.map((memo) => (
                            <MemoItemComponent
                                key={memo.memoSn}
                                click={() => openMemoDetail(memo)} data={memo}
                            />
                        ))
                        }
                    </MemoItemWrap>
                    <MemoBtn onClick={() => openMemoDetail(null)}/>
                </React.Fragment>
                :
                <MemoEmptyWrap clickAction={()=>openMemoDetail(null)}/>
            }



            <Base bottomComponent={
                <MemoAddComponent data={memoDetail}/>
            }/>

            <CalendarBottomMenu/>
        </MemoPageWrap>
    );
};

const MemoBtn = styled(AiFillEdit)`
  position: fixed;
  right: 6%;
  bottom: 70px;
  font-size: 50px;
  border-radius: 50%;
  background: #373636;
  padding: 10px;
  color: white;
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
  padding-top: 20px;
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