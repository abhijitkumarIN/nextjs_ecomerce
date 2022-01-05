import { useState, useEffect } from "react";
import useSwr from "swr";
import ProductItem from "./../../product-item";
import ProductsLoading from "./loading";
import { useRouter } from "next/router";

const ProductsContent = () => {
	const router = useRouter();
	const fetcher = (url) => fetch(url).then((res) => res.json());
	let { data, error } = useSwr("/api/products", fetcher);

	const checkProductType = (item) => {
		if (!router.query || !router.query.productType) {
			return true;
		} else {
			const arr = router.query.productType.split(",");
			return arr.includes(item);
		}
	};

	const checkPrice = (item) => {
		if (!router.query || !router.query.minPrice) {
			return true;
		} else if (item >= router.query.minPrice && item <= router.query.maxPrice) {
			return true;
		} else {
			return false;
		}
	};

	const checkSize = (item) => {
		if (!router.query || !router.query.size) {
			return true;
		}
		const arr = router.query.size.split(",");
		let temp = false;
		item.map((size) => {
			temp = temp || arr.includes(size);
		});

		return temp;
	};

	const checkColor = (item) => {
		if (!router.query || !router.query.color) {
			return true;
		}

		const arr = router.query.color.split(",");
		let temp = false;
		item.map((color) => {
			temp = temp || arr.includes(color);
		});

		return temp;
	};
	if (error) return <div>Failed to load users</div>;
	return (
		<>
			{!data && <ProductsLoading />}

			{data && (
				<section className="products-list">
					{data
						.filter(
							(item) =>
								checkProductType(item.category) &&
								checkSize(item.sizes) &&
								checkPrice(item.currentPrice) &&
								checkColor(item.colors)
						)
						.map((item) => (
							<ProductItem
								discount={item.discount}
								key={item.id}
								id={item.id}
								price={item.price}
								currentPrice={item.currentPrice}
								productImage={item.images[0]}
								name={item.name}
							/>
						))}
				</section>
			)}
		</>
	);
};

export default ProductsContent;
