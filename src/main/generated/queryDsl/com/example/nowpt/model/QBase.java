package com.example.nowpt.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.example.nowpt.mvc.model.Base;
import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBase is a Querydsl query type for Base
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QBase extends EntityPathBase<Base> {

    private static final long serialVersionUID = 673267067L;

    public static final QBase base = new QBase("base");

    public final QBaseTime _super = new QBaseTime(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> frstRegistDt = _super.frstRegistDt;

    public final NumberPath<Long> frstRegistMembSn = createNumber("frstRegistMembSn", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastChangeDt = _super.lastChangeDt;

    public final NumberPath<Long> lastChangeMembSn = createNumber("lastChangeMembSn", Long.class);

    //inherited
    public final StringPath useYn = _super.useYn;

    public QBase(String variable) {
        super(Base.class, forVariable(variable));
    }

    public QBase(Path<? extends Base> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBase(PathMetadata metadata) {
        super(Base.class, metadata);
    }

}

