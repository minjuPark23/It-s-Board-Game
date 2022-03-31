package com.ssafy.IBG.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.IBG.api.recommend.RecommendTestResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class RESTAPIService {

    private final String BASE_URL = "http://localhost:7776/ibg/api/recommend";

    public List<RecommendTestResponse> requestGETAPI(String url, Integer userNo) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
        MultiValueMap<String, Integer> body = new LinkedMultiValueMap<>();
        body.add("userNo", userNo);

        // Combine Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        System.out.println(requestMessage);

        // Request and getResponse
        HttpEntity<String> response = restTemplate.getForEntity(BASE_URL+url, String.class, requestMessage);
//        HttpEntity<String> response = restTemplate.postForEntity(BASE_URL+url, requestMessage, String.class);

        System.out.println(response);

        // Response Body 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        System.out.println(response.getBody());
        List<RecommendTestResponse> list = objectMapper.readValue(response.getBody(), new TypeReference<List<RecommendTestResponse>>() {});
        return list;
    }
}
