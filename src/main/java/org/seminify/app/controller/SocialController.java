package org.seminify.app.controller;

import java.util.Map;

import org.seminify.app.service.MemberService;
import org.seminify.app.util.JWTUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequestMapping("api/member")
@RestController
@RequiredArgsConstructor
@Log4j2
public class SocialController {
    private final MemberService memberService;

    @GetMapping("kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken) {
        log.info("accessToken : " + accessToken);
        var memberDTO = memberService.getKakaoMember(accessToken);
        var claims = memberDTO.getClaims();
        var jwtAccessToken = JWTUtil.generateToken(claims, 10);
        var jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);
        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);
        return claims;
    }
}
