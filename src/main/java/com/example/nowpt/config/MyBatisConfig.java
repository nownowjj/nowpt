//package com.example.nowpt.config;
//
//import org.apache.ibatis.session.SqlSessionFactory;
//import org.mybatis.spring.SqlSessionFactoryBean;
//import org.mybatis.spring.SqlSessionTemplate;
//import org.mybatis.spring.annotation.MapperScan;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
//
//import javax.sql.DataSource;
//
//@Configuration
//@MapperScan(basePackages = {"com.example.**.mapper"} ,sqlSessionFactoryRef = "nowSqlSessionFactory")
//public class MyBatisConfig {
//
//    @Bean
//    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
//        return new SqlSessionTemplate(sqlSessionFactory);
//    }
//
//    @Bean(name = "nowSqlSessionFactory")
//    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
//        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//        sqlSessionFactoryBean.setDataSource(dataSource);
//        sqlSessionFactoryBean.setConfigLocation(
//                new PathMatchingResourcePatternResolver()
//                        .getResource("classpath:mybatis-config.xml"));
//        sqlSessionFactoryBean.setMapperLocations(
//                new PathMatchingResourcePatternResolver()
//                        .getResources("classpath:mapper/**/*.xml"));
//        return sqlSessionFactoryBean.getObject();
//    }
//}
