package org.seminify.app.controller;

import java.security.Principal;
import java.util.List;

import org.seminify.app.dto.CartItemDTO;
import org.seminify.app.dto.CartItemListDTO;
import org.seminify.app.service.CartService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequestMapping("api/cart")
@RestController
@RequiredArgsConstructor
@Log4j2
public class CartController {
    private final CartService cartService;

    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("change")
    public List<CartItemListDTO> changeCart(@RequestBody CartItemDTO cartItemDTO) {
        log.info(cartService);
        if (cartItemDTO.getQty() <= 0)
            return cartService.remove(cartItemDTO.getCino());
        return cartService.addOrModify(cartItemDTO);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("items")
    public List<CartItemListDTO> getCartItems(Principal principal) {
        var email = principal.getName();
        log.info("email : " + email);
        return cartService.getCartItems(email);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("{cino}")
    public List<CartItemListDTO> removeFromCart(@PathVariable("cino") Long cino) {
        log.info("cino : " + cino);
        return cartService.remove(cino);
    }
}
