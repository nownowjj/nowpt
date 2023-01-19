package com.example.nowpt.common;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect //@Aspect: 해당 클래스가 공통 기능(AOP)을 제공하는 클래스임을 명시
@Component //@Component: 해당 클래스를 Bean으로 등록
public class CommonAspect {


    //@PointCut: 어떤 패키지/클래스/메소드에 대해 aop를 적용할 것인지 명시 (com.example.demo하위 모든 패키지/클래스/메소드에 대해 적용)
    @Pointcut("execution(* com.example.nowpt.mvc.restcontoller..*(..))") //
    private void doExecute() {}

    //@Around: 해당 메소드 호출 전/후로 호출
    @Around("doExecute()")
    public Object doLogging(ProceedingJoinPoint joinPoint) throws Throwable{
        log.debug("In dologging");

        String methodName = joinPoint.getSignature().toShortString();
        try {
            log.debug(methodName+" is start");
            Object obj = joinPoint.proceed();
            return obj;
        }finally {
            log.debug(methodName + " is Finish");
        }
    }
}
