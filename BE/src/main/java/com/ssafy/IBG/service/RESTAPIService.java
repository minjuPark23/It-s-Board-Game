package com.ssafy.IBG.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RESTAPIService {

    private final String BASE_URL = "http://localhost:7776/ibg/api/recommend";

    public void requestGETAPI(String url, Integer userNo) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
//        MultiValueMap<String, Integer> body = new LinkedMultiValueMap<>();
//        body.add("userNo", userNo);

        // Combine Message
//        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        String res_url = BASE_URL+url+"/"+userNo;

        // Request and getResponse
        HttpEntity<String> response = restTemplate.getForEntity(res_url, String.class);

        // Response Body 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
//        System.out.println(response.getBody());
//        List<RecommendJsonResponse> list = objectMapper.readValue(response.getBody(), new TypeReference<List<RecommendJsonResponse>>() {});
//        System.out.println(list);
    }

    public String[] requestGETAPI2(String url) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
//        MultiValueMap<String, Integer> body = new LinkedMultiValueMap<>();
//        body.add("userNo", userNo);

        // Combine Message
//        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        String res_url = BASE_URL+url;

        // Request and getResponse
        HttpEntity<String> response = restTemplate.getForEntity(res_url, String.class);

        // Response Body 파싱
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        String body = response.getBody();
        body = body.replace("[", "");
        body = body.replace("]", "");
        String[] game_no_list = body.split(",");

        return game_no_list;
//        List<RecommendJsonResponse> list = objectMapper.readValue(response.getBody(), new TypeReference<List<RecommendJsonResponse>>() {});
//        System.out.println(list);
    }

    public String[] requestGETAPI3(String url, Integer gameNo) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
//        MultiValueMap<String, Integer> body = new LinkedMultiValueMap<>();
//        body.add("userNo", userNo);

        // Combine Message
//        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        String res_url = BASE_URL+url+"/"+gameNo;

        // Request and getResponse
        HttpEntity<String> response = restTemplate.getForEntity(res_url, String.class);

        // Response Body 파싱
        String body = response.getBody();
        body = body.replace("[", "");
        body = body.replace("]", "");
        String[] game_no_list = body.split(",");
//        for (String s : game_no_list) {
//            System.out.println(s);
//        }

        return game_no_list;
    }
}
