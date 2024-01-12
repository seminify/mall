package org.seminify.app.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "tbl_cart", indexes = { @Index(name = "idx_cart_email", columnList = "member_owner") })
@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
@ToString(exclude = "owner")
public class Cart {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long cno;
    @JoinColumn(name = "member_owner")
    @OneToOne
    private Member owner;
}
