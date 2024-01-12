package org.seminify.app.controller;

import org.seminify.app.service.MemberService;
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
    public String[] getMemberFromKakao(String accessToken) {
        log.info("accessToken : " + accessToken);
        memberService.getKakaoMember(accessToken);
        return new String[] { "AAA", "BBB", "CCC" };
    }
}
