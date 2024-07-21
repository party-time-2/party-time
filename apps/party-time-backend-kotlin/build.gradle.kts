import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
	id("org.springframework.boot") version "3.3.2"
	id("io.spring.dependency-management") version "1.1.6"
	kotlin("jvm") version "2.0.0"
	kotlin("plugin.spring") version "2.0.0"
	kotlin("plugin.jpa") version "2.0.0"
    id("org.jetbrains.kotlinx.kover") version "0.8.3"
    id("org.jetbrains.dokka") version "1.9.20"
}

group = "com.partytime"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
    //web
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-validation")
    val springdocVersion = "2.5.0"
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:$springdocVersion")
	implementation("org.springframework.boot:spring-boot-starter-mail")
	implementation("org.springframework.boot:spring-boot-starter-mustache")

    //serialization
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")


    //database
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("com.h2database:h2")

    //security
	implementation("org.springframework.boot:spring-boot-starter-security")
    val jwtAPIVersion = "0.12.5"
    implementation("io.jsonwebtoken:jjwt-api:$jwtAPIVersion")
    implementation("io.jsonwebtoken:jjwt-impl:$jwtAPIVersion")
    implementation("io.jsonwebtoken:jjwt-jackson:$jwtAPIVersion")

    //validation
    implementation("jakarta.validation:jakarta.validation-api:3.1.0")

    //logging
    implementation("io.github.oshai:kotlin-logging:6.0.9")

    //dev
	implementation("org.springframework.boot:spring-boot-devtools")
	implementation("org.springframework.boot:spring-boot-configuration-processor")

    //test
	testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    testImplementation("org.springframework.boot:spring-boot-starter-webflux")
    testImplementation("org.springframework.security:spring-security-oauth2-client")

	testImplementation("org.springframework.security:spring-security-test")
    testImplementation("com.ninja-squad:springmockk:4.0.2")
    constraints {
        testImplementation("io.mockk:mockk-jvm:1.13.11") {
            because("old version has \"atLeast = 0\" bug (mockk issue #969)")
        }
    }

    //fix from https://github.com/Kotlin/dokka/issues/3472#issuecomment-1929712374
    configurations.matching { it.name.startsWith("dokka") }.configureEach {
        resolutionStrategy.eachDependency {
            if (requested.group.startsWith("com.fasterxml.jackson")) {
                useVersion("2.15.3")
            }
        }
    }
}

kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xjsr305=strict")
        jvmTarget = JvmTarget.JVM_17
    }
}

tasks.withType<Test> {
    systemProperty("spring.profiles.active", "mem")
	useJUnitPlatform()
}

springBoot {
	buildInfo()
}

kover {
    reports {
        filters {
            excludes {
                classes(
                    "com.partytime.jpa.DatabaseConstants",
                    "com.partytime.PartyTimeBackendKotlinApplicationKt",
                    "com.partytime.api.ApiConstants",
                    "com.partytime.configuration.security.AuthEntryPointJwtKt" //contains logger
                )
                annotatedBy("com.partytime.annotations.ExcludeFromCoverage")
            }
        }
    }
}

/*
publishing {
	publications {
		create<MavenPublication>("mavenJava") {
			artifact(tasks.getByName("bootJar"))
		}
	}
}
 */
