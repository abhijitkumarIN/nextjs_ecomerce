import { useSelector, useDispatch } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import Item from "./item";
import { hideCart } from "../../store/actions/showCartActions";

const ShoppingCart = () => {
  const dispatch = useDispatch();

	const { cartItems } = useSelector((state) => state.cart);

	const priceTotal = useSelector((state) => {
		const cartItems = state.cart.cartItems;
		let totalPrice = 0;
		if (cartItems.length > 0) {
			cartItems.map((item) => (totalPrice += item.price * item.count));
		}

		return totalPrice;
	});

	return (
		<section className="cart overflow-auto">
			<div className="container flex flex-col">
				<div className="cart__intro flex flex-col gap-2">
					<h3 className="cart__title">Shopping Cart</h3>
					<CheckoutStatus step="cart" />
				</div>

				<div className="cart-list">
					{cartItems.length > 0 && (
						<table>
							<tbody>
								<tr>
									<th style={{ textAlign: "left" }}>Product</th>
									<th>Color</th>
									<th>Size</th>
									<th>Ammount</th>
									<th>Price</th>
									<th></th>
								</tr>

								{cartItems.map((item) => (
									<Item
										key={item.id}
										id={item.id}
										thumb={item.thumb}
										name={item.name}
										color={item.color}
										price={item.price}
										size={item.size}
										count={item.count}
									/>
								))}
							</tbody>
						</table>
					)}

					{cartItems.length === 0 && <p>Nothing in the cart</p>}
				</div>

				<div className="cart-actions">
					<span className="cart__btn-back cursor-pointer" onClick={()=>dispatch(hideCart())}>
						<i className="icon-left"></i> Continue Shopping
					</span>
					<input
						type="text"
						placeholder="Promo Code"
						className="cart__promo-code"
					/>

					<div className="cart-actions__items-wrapper py-8">
						<p className="cart-actions__total">
							Total cost <strong>${priceTotal.toFixed(2)}</strong>
						</p>
						<a href="/cart/checkout" className="btn btn--rounded btn--yellow">
							Checkout
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ShoppingCart;
