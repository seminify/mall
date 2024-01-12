package org.seminify.app.service;

import org.seminify.app.domain.Member;
import org.seminify.app.dto.MemberDTO;

public interface MemberService {
    default MemberDTO entityToDTO(Member member) {
        var dto = new MemberDTO(member.getEmail(), member.getPw(), member.getNickname(), member.isSocial(),
                member.getMemberRoleList().stream().map(Enum::name).toList());
        return dto;
    }

    MemberDTO getKakaoMember(String accessToken);
}
