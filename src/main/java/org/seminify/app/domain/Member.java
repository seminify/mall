package org.seminify.app.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
@ToString(exclude = "memberRoleList")
public class Member {
    @Id
    private String email;
    @Setter
    private String pw;
    @Setter
    private String nickname;
    @Setter
    private boolean social;
    @ElementCollection
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

    public void addRole(MemberRole memberRole) {
        this.memberRoleList.add(memberRole);
    }

    public void clearRole() {
        this.memberRoleList.clear();
    }
}
