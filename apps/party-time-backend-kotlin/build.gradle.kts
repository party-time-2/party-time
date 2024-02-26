import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.2.2"
	id("io.spring.dependency-management") version "1.1.4"
	kotlin("jvm") version "1.9.22"
	kotlin("plugin.spring") version "1.9.22"
	kotlin("plugin.jpa") version "1.9.22"
	id("maven-publish")
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
    val springdocVersion = "2.3.0"
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:$springdocVersion")
	implementation("org.springframework.boot:spring-boot-starter-mail")
	implementation("org.springframework.boot:spring-boot-starter-mustache")

    //serialization
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")


    //database
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("com.h2database:h2")
	//runtimeOnly("io.r2dbc:r2dbc-h2")
    //implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")

    //security
	implementation("org.springframework.boot:spring-boot-starter-security")
    val jwtAPIVersion = "0.12.5"
    implementation("io.jsonwebtoken:jjwt-api:$jwtAPIVersion")
    implementation("io.jsonwebtoken:jjwt-impl:$jwtAPIVersion")
    implementation("io.jsonwebtoken:jjwt-jackson:$jwtAPIVersion")

    //validation
    implementation("jakarta.validation:jakarta.validation-api:3.0.2")

    //logging
    implementation("io.github.oshai:kotlin-logging:6.0.3")

    //dev
	implementation("org.springframework.boot:spring-boot-devtools")
	implementation("org.springframework.boot:spring-boot-configuration-processor")
    //implementation("org.projectlombok:lombok")

    //test
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
    testImplementation("com.ninja-squad:springmockk:4.0.2")

	//implementation("org.jetbrains.kotlin :kotlin-reflect")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

springBoot {
	buildInfo()
}

publishing {
	publications {
		create<MavenPublication>("mavenJava") {
			artifact(tasks.getByName("bootJar"))
		}
	}
}
