package com.example.nowpt;

import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.util.ServerInfo;
import org.springframework.boot.SpringBootVersion;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.SpringVersion;

import java.text.NumberFormat;
import java.util.Arrays;

@Slf4j
public class ApplicationBase {
    public static void dumpApplicationStartup(ConfigurableApplicationContext ctx) {
        dumpSystemInfo();
        dumpMemorySize();
        dumpApplProperties(ctx);
        log.info("=================================================================\n");
    }

    private static void dumpSystemInfo() {
        log.info("========================== System Info. ===========================");
        String springBootVer = SpringBootVersion.getVersion();
        String springVer = SpringVersion.getVersion();
        String javaVer = Runtime.version().toString();
        String serverVer = ServerInfo.getServerInfo();
        log.info("{} : {}", "Spring Boot Version", springBootVer);
        log.info("{} : {}", "Spring Version", springVer);
        log.info("{} : {}", "Server Version", serverVer);
        log.info("{} : {}", "Java Version", javaVer);
    }

    private static void dumpApplProperties(ConfigurableApplicationContext ctx) {
        log.info("========================== Appl Properties ======================");
        String[] actives = ctx.getEnvironment().getActiveProfiles();
        log.info("Active Profiles : {}", Arrays.toString(actives));
        dumpApplPropertiesSub(ctx, "spring.profiles.active");
        dumpApplPropertiesSub(ctx, "spring.application.name");
        dumpApplPropertiesSub(ctx, "appl.active-profile");
        dumpApplPropertiesSub(ctx, "upload.aws-s3.accessKey");
//		for(int i = 0; i < actives.length; i++) {
//			dumpApplPropertiesSub(ctx, "bfc.property.check.include-" + actives[i]);
//		}
    }

    private static void dumpApplPropertiesSub(ConfigurableApplicationContext ctx, String propertyKey) {
        String propertyVal = ctx.getEnvironment().getProperty(propertyKey);
        log.info("{} : {}", propertyKey, propertyVal);
    }

    private static void dumpMemorySize() {
        Runtime runtime = Runtime.getRuntime();
        final NumberFormat format = NumberFormat.getInstance();
        final long maxMemory = runtime.maxMemory();
        final long allocatedMemory = runtime.totalMemory();
        final long freeMemory = runtime.freeMemory();
        final long mb = 1024 * 1024;
        final String mega = " MB";
        log.info("========================== Memory Info ==========================");
        log.info("Free memory: " + format.format(freeMemory / mb) + mega);
        log.info("Allocated memory: " + format.format(allocatedMemory / mb) + mega);
        log.info("Max memory: " + format.format(maxMemory / mb) + mega);
        log.info("Total free memory: " + format.format((freeMemory + (maxMemory - allocatedMemory)) / mb) + mega);
    }
}
