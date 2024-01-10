package org.seminify.app.repository;

import org.junit.jupiter.api.Test;
import org.seminify.app.domain.Member;
import org.seminify.app.domain.MemberRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testInsertMember() {
        for (var i = 0; i < 10; i++) {
            var member = Member.builder().email("user" + i + "@aaa.com").pw(passwordEncoder.encode("1111"))
                    .nickname("USER" + i).build();
            member.addRole(MemberRole.USER);
            if (i >= 5)
                member.addRole(MemberRole.MANAGER);
            if (i >= 8)
                member.addRole(MemberRole.ADMIN);
            memberRepository.save(member);
        }
    }

    @Test
    public void testRead() {
        var email = "user9@aaa.com";
        var member = memberRepository.getWithRoles(email);
        log.info(member);
    }
}
