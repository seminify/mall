package org.seminify.app.service;

import java.util.LinkedHashMap;

import org.seminify.app.dto.MemberDTO;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
public class MemberServiceImpl implements MemberService {
    private String getEmailFromKakaoAccessToken(String accessToken) {
        var kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";
        if (accessToken == null)
            throw new RuntimeException(("Access Token is null"));
        var restTemplate = new RestTemplate();
        var headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        var entity = new HttpEntity<>(headers);
        var uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();
        var response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);
        log.info(response);
        var bodyMap = response.getBody();
        log.info(bodyMap);
        LinkedHashMap<String, String> kakaoAccount = (LinkedHashMap<String, String>) bodyMap.get("kakao_account");
        log.info("kakaoAccount : " + kakaoAccount);
        return kakaoAccount.get("email");
    }

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        var email = getEmailFromKakaoAccessToken(accessToken);
        log.info("email : " + email);
        return null;
    }
}
