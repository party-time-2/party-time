package com.partytime.base;

import com.partytime.mail.MailService;
import com.partytime.service.JwtService;
import jakarta.annotation.PostConstruct;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.MultiValueMap;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

import static org.springframework.http.HttpMethod.*;

@Slf4j
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SuppressWarnings("unused")
public class TestBase {
    private final String api;

    @MockBean
    MailService mailService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TestRestTemplate restTemplate;
    private String userEmail;

    public TestBase(String api) {
        this.api = "/api/" + api;
    }

    public void authAsUser(String email) {
        this.userEmail = email;
    }

    @BeforeEach
    void setUp() {
        // Clear auth
        this.userEmail = null;
    }

    @PostConstruct
    void setup() {
        List<ClientHttpRequestInterceptor> interceptors = new ArrayList<>(restTemplate.getRestTemplate()
            .getInterceptors());
        interceptors.add(new AuthInterceptor());
        restTemplate.getRestTemplate().setInterceptors(interceptors);
    }

    public <BODY, RESPONSE> ResponseEntity<RESPONSE> executeDeleteRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final Class<RESPONSE> responseClass) {
        return executeRequest(DELETE, route, queryParams, entity, responseClass);
    }

    public <BODY, RESPONSE> ResponseEntity<RESPONSE> executeDeleteRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final ParameterizedTypeReference<RESPONSE> responseClass) {
        return executeRequest(DELETE, route, queryParams, entity, responseClass);
    }

    public <RESPONSE> ResponseEntity<RESPONSE> executeGetRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<Void> entity, @NonNull final Class<RESPONSE> responseClass) {
        return executeRequest(GET, route, queryParams, entity, responseClass);
    }

    public <RESPONSE> ResponseEntity<RESPONSE> executeGetRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<Void> entity, @NonNull final ParameterizedTypeReference<RESPONSE> responseClass) {
        return executeRequest(GET, route, queryParams, entity, responseClass);
    }

    public <BODY, RESPONSE> ResponseEntity<RESPONSE> executePostRequest(@NonNull final String route, final HttpEntity<BODY> entity, @NonNull final Class<RESPONSE> responseClass) {
        return executeRequest(POST, route, new HashMap<>(), entity, responseClass);
    }

    public <BODY, RESPONSE> ResponseEntity<RESPONSE> executePostRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final Class<RESPONSE> responseClass) {
        return executeRequest(POST, route, queryParams, entity, responseClass);
    }

    public <BODY, RESPONSE> ResponseEntity<RESPONSE> executePostRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final ParameterizedTypeReference<RESPONSE> responseClass) {
        return executeRequest(POST, route, queryParams, entity, responseClass);
    }

    public <BODY, RESPONSE> ResponseEntity<RESPONSE> executePutRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final Class<RESPONSE> responseClass) {
        return executeRequest(PUT, route, queryParams, entity, responseClass);
    }

    public <BODY, RESPONSE> ResponseEntity<RESPONSE> executePutRequest(@NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final ParameterizedTypeReference<RESPONSE> responseClass) {
        return executeRequest(PUT, route, queryParams, entity, responseClass);
    }

    @SuppressWarnings("java:S1452") // We have no possibility to specify the wildcard.
    protected MultiValueMap<String, HttpEntity<?>> buildMultipartBody(final String param, final MediaType mediaType, final String filePath) {
        final MultipartBodyBuilder multipartBodyBuilder = new MultipartBodyBuilder();
        final ClassPathResource file = new ClassPathResource(filePath);

        multipartBodyBuilder.part(param, file, mediaType);

        return multipartBodyBuilder.build();
    }

    private String buildUrl(@NonNull final String route, @NonNull final Map<String, String> queryParams) {
        final StringBuilder url = new StringBuilder();

        if (!api.startsWith("/")) {
            url.append("/");
        }

        url.append(api);

        if (!api.endsWith("/") && !route.startsWith("/")) {
            url.append("/");
        }

        url.append(route);

        final AtomicBoolean isFirst = new AtomicBoolean(true);

        queryParams.keySet().forEach(key -> {
            if (isFirst.get()) {
                url.append("?");

                isFirst.set(false);
            } else {
                url.append("&");
            }

            url.append(key);
            url.append("={");
            url.append(key);
            url.append("}");
        });

        return url.toString();
    }

    private <BODY, RESPONSE> ResponseEntity<RESPONSE> executeRequest(@NonNull final HttpMethod httpMethod, @NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final Class<RESPONSE> responseClass) {
        final String url = prepareExecuteAndGetUrl(httpMethod, route, queryParams, entity);

        return restTemplate.exchange(
            url,
            httpMethod,
            entity,
            responseClass,
            queryParams
        );
    }

    private <BODY, RESPONSE> ResponseEntity<RESPONSE> executeRequest(@NonNull final HttpMethod httpMethod, @NonNull final String route, @NonNull final Map<String, String> queryParams, final HttpEntity<BODY> entity, @NonNull final ParameterizedTypeReference<RESPONSE> responseClass) {
        final String url = prepareExecuteAndGetUrl(httpMethod, route, queryParams, entity);

        return restTemplate.exchange(
            url,
            httpMethod,
            entity,
            responseClass,
            queryParams
        );
    }

    private <BODY> String prepareExecuteAndGetUrl(@NonNull final HttpMethod httpMethod, @NonNull final String route, @NonNull final Map<String, String> queryParams, final BODY entity) {
        final String url = buildUrl(route, queryParams);

        log.info("httpMethod='" + httpMethod + "', url='" + url + "', route='" + route + "', queryParams='" + queryParams + "', entity='" + entity + "'");

        return url;
    }

    private class AuthInterceptor implements ClientHttpRequestInterceptor {

        @SuppressWarnings("NullableProblems")
        @Override
        public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
            if (userEmail != null) {
                String token = jwtService.createAccessToken(userEmail, "Test User", true);
                request.getHeaders().add(HttpHeaders.AUTHORIZATION, token);
            }
            return execution.execute(request, body);
        }

    }

}
