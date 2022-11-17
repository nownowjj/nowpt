package com.example.nowpt.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.example.nowpt.mvc.model.BaseTime;
import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBaseTime is a Querydsl query type for BaseTime
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QBaseTime extends EntityPathBase<BaseTime> {

    private static final long serialVersionUID = -1842884888L;

    public static final QBaseTime baseTime = new QBaseTime("baseTime");

    public final DateTimePath<java.time.LocalDateTime> frstRegistDt = createDateTime("frstRegistDt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> lastChangeDt = createDateTime("lastChangeDt", java.time.LocalDateTime.class);

    public final StringPath useYn = createString("useYn");

    public QBaseTime(String variable) {
        super(BaseTime.class, forVariable(variable));
    }

    public QBaseTime(Path<? extends BaseTime> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBaseTime(PathMetadata metadata) {
        super(BaseTime.class, metadata);
    }

}

