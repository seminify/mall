package org.seminify.app.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_cart_item", indexes = { @Index(columnList = "card_cno", name = "idex_cartitem_cart"),
        @Index(columnList = "product_pno, cart_cno", name = "idx_cartitem_pno_cart") })
@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
@ToString(exclude = "card")
public class CartItem {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long cino;
    @JoinColumn(name = "product_pno")
    @ManyToOne
    private Product product;
    @JoinColumn(name = "cart_cno")
    @ManyToOne
    private Cart cart;
    @Setter
    private int qty;
}
