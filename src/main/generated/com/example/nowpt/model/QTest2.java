package com.example.nowpt.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTest2 is a Querydsl query type for Test2
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTest2 extends EntityPathBase<Test2> {

    private static final long serialVersionUID = -586814346L;

    public static final QTest2 test2 = new QTest2("test2");

    public final NumberPath<Long> testId = createNumber("testId", Long.class);

    public final StringPath testNm = createString("testNm");

    public QTest2(String variable) {
        super(Test2.class, forVariable(variable));
    }

    public QTest2(Path<? extends Test2> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTest2(PathMetadata metadata) {
        super(Test2.class, metadata);
    }

}

