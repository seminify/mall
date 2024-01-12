package org.seminify.app.service;

import java.util.LinkedHashMap;

import org.seminify.app.domain.Member;
import org.seminify.app.domain.MemberRole;
import org.seminify.app.dto.MemberDTO;
import org.seminify.app.dto.MemberModifyDTO;
import org.seminify.app.repository.MemberRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

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

    private String makeTempPassword() {
        var buffer = new StringBuilder();
        for (var i = 0; i < 10; i++)
            buffer.append((char) ((int) (Math.random() * 55) + 65));
        return buffer.toString();
    }

    private Member makeSocialMember(String email) {
        var tempPassword = makeTempPassword();
        log.info("tempPassword : " + tempPassword);
        var nickname = "소셜회원";
        var member = Member.builder().email(email).pw(passwordEncoder.encode(tempPassword)).nickname(nickname)
                .social(true).build();
        member.addRole(MemberRole.USER);
        return member;
    }

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        var email = getEmailFromKakaoAccessToken(accessToken);
        log.info("email : " + email);
        var result = memberRepository.findById(email);
        if (result.isPresent()) {
            var memberDTO = entityToDTO(result.get());
            return memberDTO;
        }
        var socialMember = makeSocialMember(email);
        memberRepository.save(socialMember);
        var memberDTO = entityToDTO(socialMember);
        return memberDTO;
    }

    @Override
    public void modifyMember(MemberModifyDTO memberModifyDTO) {
        var result = memberRepository.findById(memberModifyDTO.getEmail());
        var member = result.orElseThrow();
        member.setPw(passwordEncoder.encode(memberModifyDTO.getPw()));
        member.setSocial(false);
        member.setNickname(memberModifyDTO.getNickname());
        memberRepository.save(member);
    }
}
