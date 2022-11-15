package com.example.nowpt.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1211973948L;

    public static final QMember member = new QMember("member1");

    public final QBase _super = new QBase(this);

    public final StringPath detailAddr = createString("detailAddr");

    public final StringPath emailAddr = createString("emailAddr");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> frstRegistDt = _super.frstRegistDt;

    //inherited
    public final NumberPath<Long> frstRegistMembSn = _super.frstRegistMembSn;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastChangeDt = _super.lastChangeDt;

    //inherited
    public final NumberPath<Long> lastChangeMembSn = _super.lastChangeMembSn;

    public final StringPath lastLoginDtm = createString("lastLoginDtm");

    public final NumberPath<Long> memberSn = createNumber("memberSn", Long.class);

    public final StringPath membId = createString("membId");

    public final StringPath membNm = createString("membNm");

    public final StringPath membPw = createString("membPw");

    public final StringPath mobileNo = createString("mobileNo");

    //inherited
    public final StringPath useYn = _super.useYn;

    public final StringPath zipAddr = createString("zipAddr");

    public final StringPath zipCd = createString("zipCd");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

