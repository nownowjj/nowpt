//package com.example.nowpt.mvc.controller;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.util.Scanner;
//
//public class OracleTest_1_1 {
//
//    // 상수
//    // 데이터 베이스를 연결하는 정보를 우리는 dataSource 라고 부른다.
//    // dataSource 정보를 상수로 처리하는 것
//    public static final String JDBC_ORACLE_DRIVER = "oracle.jdbc.driver.OracleDriver";
//    public static final String JDBC_ORACL_URL = "jdbc:oracle:thin:@localhost:1521:orclHBE00";
//    public static final String JDBC_ORACLE_USER = "scott";
//    public static final String JDBC_ORACLE_PWD = "tiger";
//
//    // 생성자
//    public OracleTest_1_1 () {
//
//        try {
//            // JDBC 드라이버를 생성자를 이용해서 찾는 방법
//            Class.forName(OracleTest_1_1.JDBC_ORACLE_DRIVER);
//        }catch (ClassNotFoundException e) {
//            System.out.println("Oralce JDBC 드라이버를 찾기 에러 >>> : " + e.getMessage());
//        }
//    }
//
//    // 조회 함수
//    @SuppressWarnings("null")
//    public void t1_Select_Search (String searchName) {
//        System.out.println("searchName >>> : " + searchName);
//
//        // 함수 안에서 사용하는 객체는
//        // 객체를 선언하고, 참조변수를 지역변수 선언하고  항상 null 초기화 한다.
//        // 사용할 때는 선언한 아래 아래 라인에서 참조변수를 호출해서 사용한다.
//        Connection conn = null;
//        PreparedStatement pstmt = null;
//        ResultSet rsRs = null;
//
//        try {
//
//            conn = DriverManager.getConnection(   OracleTest_1_1.JDBC_ORACL_URL,
//                    OracleTest_1_1.JDBC_ORACLE_USER,
//                    OracleTest_1_1.JDBC_ORACLE_PWD);
//
//            StringBuffer sb = new StringBuffer();
//            sb.append( " SELECT                \n");
//            sb.append( "       A.COL_1 AS COL_1    \n");
//            sb.append( "      ,A.COL_2 AS COL_222    \n");
//            sb.append( "      ,A.COL_3 AS COL_3    \n");
//            sb.append( " FROM                    \n");
//            sb.append( "       T1_TABLE A            \n");
//            sb.append( " WHERE A.COL_2 = ?          \n"); // ? parameterIndex 1번
////         sb.append( " AND   A.COL_1 = ?          \n"); // ? parameterIndex 2번
//
//            String sql = sb.toString();
//            pstmt = conn.prepareStatement(sql);
//            System.out.println("SELECT QUERY :: \n" + sql);
//
//            pstmt.clearParameters();
//            pstmt.setString(1, searchName);
//
//            rsRs = pstmt.executeQuery();
//
//            if (rsRs !=null) {
//
//                while (rsRs.next()) {
//
//                    // rsRs.getString(1)  1 : 컬럼 인덱스
//                    String col_1 = rsRs.getString(1);
//                    String col_2 = rsRs.getString(2);
//                    String col_3 = rsRs.getString(3);
//
//                    System.out.println(col_1 + " " + col_2 + " "+ col_3);
//                }
//            }
//
//        }catch(Exception e) {
//            System.out.println("T1_Table 조회시  에러 >>> : " + e.getMessage());
//        }
//    }
//
//    public static void main(String[] args) {
//        // TODO Auto-generated method stub
//
//        // Scanner 클래스 이용해서 받기
////        String searchName = "이준규";
//        Scanner scan  = new Scanner(System.in);
//        String searchName = scan.next();
//
//        OracleTest_1_1 ot_1 = new OracleTest_1_1();
//        ot_1.t1_Select_Search(searchName);
//    }
//}
