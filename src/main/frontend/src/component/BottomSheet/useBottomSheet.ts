import { useRef, useEffect } from 'react';
import { MIN_Y, MAX_Y } from './BottomSheetOption';
import {useDispatch} from "react-redux";
import {setInvisible} from "../../redux/slice/bottomSheetSlice";

interface BottomSheetMetrics {
    touchStart: {
        sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
        touchY: number; // touchstart에서 터치 포인트의 Y값
    };
    touchMove: {
        prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
        movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향
    };
    isContentAreaTouched: boolean;
}

export default function useBottomSheet() {
    const dispatch = useDispatch();
    const sheet = useRef<HTMLDivElement>(null);

    const content = useRef<HTMLDivElement>(null);

    const metrics = useRef<BottomSheetMetrics>({
        touchStart: {
            sheetY: 500,
            touchY: 0,
        },
        touchMove: {
            prevTouchY: 0,
            movingDirection: "none",
        },
        isContentAreaTouched: false
    });

    const sheetDismiss =()=>{
        sheet.current!.style.setProperty('transform', 'translateY(60px)'); // sheet down이 완성 되면 sheet가 하단으로 이동 후에 숨긴다
        setTimeout(()=>{
            dispatch(setInvisible())
        },160)
    }

    useEffect(() => {

        const canUserMoveBottomSheet = () => {
            const { touchMove, isContentAreaTouched } = metrics.current;


            if (!isContentAreaTouched) {
                return true;
            }

            if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
                return true;
            }

            if (touchMove.movingDirection === 'down') {
                return content.current!.scrollTop <= 0;
            }
            return false;
        }



        const handleTouchStart = (e: TouchEvent) => {
            const { touchStart } = metrics.current;
            touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
            touchStart.touchY = e.touches[0].clientY;
        };


        const handleTouchMove = (e: TouchEvent) => {

            const { touchStart, touchMove } = metrics.current;
            const currentTouch = e.touches[0];

            if (touchMove.prevTouchY === undefined) {
                touchMove.prevTouchY = touchStart.touchY;
            }

            if (touchMove.prevTouchY === 0) {
                // 맨 처음 앱 시작하고 시작시
                touchMove.prevTouchY = touchStart.touchY;
            }

            if (touchMove.prevTouchY < currentTouch.clientY) {
                touchMove.movingDirection = 'down';
            }

            if (touchMove.prevTouchY > currentTouch.clientY) {
                touchMove.movingDirection = 'up';
            }

            if (canUserMoveBottomSheet()) {

                e.preventDefault();

                const touchOffset = currentTouch.clientY - touchStart.touchY;
                let nextSheetY = touchStart.sheetY + touchOffset;

                if (nextSheetY <= MIN_Y) {
                    nextSheetY = MIN_Y;
                }

                if (nextSheetY >= MAX_Y) {
                    nextSheetY = MAX_Y;
                }

                sheet.current!.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`);  //바닥 만큼은 빼야쥬...
            } else {
                document.body.style.overflowY = 'hidden';
            }
        };




        const handleTouchEnd = (e: TouchEvent) => {
            document.body.style.overflowY = 'auto';
            const { touchMove } = metrics.current;

            // Snap Animation
            const currentSheetY = sheet.current!.getBoundingClientRect().y;

            if (currentSheetY !== MIN_Y) {
                if (touchMove.movingDirection === 'down') {
                    sheetDismiss()
                }

                if (touchMove.movingDirection === 'up') {
                    sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`);
                }
            }

            // metrics 초기화.
            metrics.current = {
                touchStart: {
                    sheetY: 0,
                    touchY: 0,
                },
                touchMove: {
                    prevTouchY: 0,
                    movingDirection: "none",
                },
                isContentAreaTouched: false
            };
        }

        sheet.current!.addEventListener('touchstart', handleTouchStart);
        sheet.current!.addEventListener('touchmove', handleTouchMove);
        sheet.current!.addEventListener('touchend', handleTouchEnd);

    }, [])


    useEffect(() => {
        sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`);
        const handleTouchStart = () => {
            metrics.current!.isContentAreaTouched = true;
        }
        content.current!.addEventListener('touchstart', handleTouchStart);
    }, []);

    return { sheet, content , sheetDismiss }

}