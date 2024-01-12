package org.seminify.app.service;

import java.util.List;

import org.seminify.app.domain.Cart;
import org.seminify.app.domain.CartItem;
import org.seminify.app.domain.Member;
import org.seminify.app.domain.Product;
import org.seminify.app.dto.CartItemDTO;
import org.seminify.app.dto.CartItemListDTO;
import org.seminify.app.repository.CartItemRepository;
import org.seminify.app.repository.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@RequiredArgsConstructor
@Log4j2
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    private Cart getCart(String email) {
        Cart cart = null;
        var result = cartRepository.getCartOfMember(email);
        if (result.isEmpty()) {
            var member = Member.builder().email(email).build();
            var tempCart = Cart.builder().owner(member).build();
            cart = cartRepository.save(tempCart);
        } else
            cart = result.get();
        return cart;
    }

    @Override
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {
        var email = cartItemDTO.getEmail();
        var pno = cartItemDTO.getPno();
        var qty = cartItemDTO.getQty();
        var cino = cartItemDTO.getCino();
        if (cino != null) {
            var cartItemResult = cartItemRepository.findById(cino);
            var cartItem = cartItemResult.orElseThrow();
            cartItem.setQty(qty);
            cartItemRepository.save(cartItem);
            return getCartItems(email);
        }
        var cart = getCart(email);
        CartItem cartItem = null;
        cartItem = cartItemRepository.getItemOfPno(email, pno);
        if (cartItem == null) {
            var product = Product.builder().pno(pno).build();
            cartItem = CartItem.builder().product(product).cart(cart).qty(qty).build();
        } else
            cartItem.setQty(qty);
        cartItemRepository.save(cartItem);
        return getCartItems(email);
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long cino) {
        var cno = cartItemRepository.getCartFromItem(cino);
        log.info("cno : " + cno);
        cartItemRepository.deleteById(cino);
        return cartItemRepository.getItemsOfCartDTOByCart(cno);
    }
}
