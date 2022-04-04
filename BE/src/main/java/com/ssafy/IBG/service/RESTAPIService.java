package com.ssafy.IBG.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.IBG.api.recommend.RecommendJsonResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class RESTAPIService {

    private final String BASE_URL = "http://localhost:7776/ibg/api/recommend/user";

    public List<Integer> requestGETAPI(String url, Integer no) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Body set
//        MultiValueMap<String, Integer> body = new LinkedMultiValueMap<>();
//        body.add("userNo", userNo);

        // Combine Message
//        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        String URL = BASE_URL+url+"/"+no;

        // Request and getResponse
        HttpEntity<String> response = restTemplate.getForEntity(URL, String.class);


        // Response Body 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        System.out.println(response.getBody().getClass().getName());
        String temp = response.getBody();
        System.out.println(temp);
        String[] tempArr = temp.substring(1, temp.length()-1).split(",");
        List<Integer> list = new ArrayList<>();
        for(String value : tempArr){
            list.add(Integer.parseInt(value.trim()));
        }
//        List<RecommendTestResponse> list = objectMapper.readValue(response.getBody(), new TypeReference<List<RecommendTestResponse>>() {});
//        return list;
        return list;
    }
}
