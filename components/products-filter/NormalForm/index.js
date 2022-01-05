import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "../form-builder/checkbox";
import CheckboxColor from "../form-builder/checkbox-color";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { useForm } from "react-hook-form";
import Router from "next/router";

// data
import productsTypes from "../../../utils/data/products-types";
import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<Tooltip
			prefixCls="rc-slider-tooltip"
			overlay={value}
			visible={dragging}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</Tooltip>
	);
};

const NormalForm = () => {
	const router = useRouter();
	const [filtersOpen, setFiltersOpen] = useState(false);
	const dispatch = useDispatch();
	const addQueryParams = () => {
		// query params changes
	};

	const checkProductType = (item) => {
		let query = router.query;

		if (!query || !query.productType) {
			return false;
		}

		const arr = query.productType.split(",");
		return arr.includes(item);
	};

	const checkSize = (item) => {
		let query = router.query;

		if (!query || !query.size) {
			return false;
		}

		const arr = query.size.split(",");
		return arr.includes(item);
	};

	const checkColor = (item) => {
		let query = router.query;

		if (!query || !query.color) {
			return false;
		}

		const arr = query.color.split(",");
		return arr.includes(item);
	};
	const [defaultValue, setDefaultValue] = useState([0, 100]);

	// useEffect(() => {
	// 	if (router.query.minPrice) {
	// 		setDefaultValue([router.query.minPrice, router.query.maxPrice]);
	// 	}
	// }, [])

	useEffect(() => {
		console.log(router.query);
		if (router.query.minPrice) {
			setDefaultValue([router.query.minPrice, router.query.maxPrice]);
		}
	}, [router.query]);

	const giveDefaults = () => {
		if (router.query && router.query.minPrice) {
			return [router.query.minPrice, router.query.maxPrice];
		}

		return [0, 100];
	};

	return (
		<>
			<form className="products-filter">
				{/* <button
					type="button"
					onClick={() => setFiltersOpen(!filtersOpen)}
					className={`products-filter__menu-btn ${
						filtersOpen ? "products-filter__menu-btn--active" : ""
					}`}
				>
					Add Filter <i className="icon-down-open"></i>
				</button> */}

				<div
					className={`products-filter__wrapper ${
						filtersOpen ? "products-filter__wrapper--open" : ""
					}`}
				>
					<div className="products-filter__block">
						<button type="button">Product type</button>
						<div className="products-filter__block__content">
							{productsTypes.map((type) => (
								<Checkbox
									key={type.id}
									name="product-type"
									label={type.name}
									checked={checkProductType(type.name)}
									// checked={router.query?.productType?.includes(type.name)}
									onChange={() => {
										let query = router.query;

										if (!query.productType) {
											query.productType = type.name;
										} else {
											let arr = query.productType.split(",");

											if (arr.includes(type.name)) {
												arr = arr.filter((e) => e !== type.name);
											} else {
												arr.push(type.name);
											}

											let str = "";
											arr.map((item) => {
												str = str.concat(",", item);
											});
											if (str) {
												str = str.substr(1);
											}

											query.productType = str;
										}

										Router.push({
											pathname: "/products",
											query,
										});
									}}
								/>
							))}
						</div>
					</div>

					<div className="products-filter__block">
						<button type="button">Price</button>
						<div className="products-filter__block__content">
							<Range
								min={0}
								max={100}
								// value={giveDefaults()}
								// defaultValue={giveDefaults()}
								defaultValue={giveDefaults()}
								// // defaultValue={defaultValue}
								tipFormatter={(value) => `${value}`}
								onAfterChange={(value) => {
									let query = router.query;
									query.minPrice = value[0];
									query.maxPrice = value[1];

									Router.push({
										pathname: "/products",
										query,
									});
								}}
							/>
						</div>
					</div>

					<div className="products-filter__block">
						<button type="button">Size</button>
						<div className="products-filter__block__content checkbox-square-wrapper">
							{productsSizes.map((type) => (
								<Checkbox
									type="square"
									key={type.id}
									name="product-size"
									label={type.label}
									checked={checkSize(type.label)}
									onChange={() => {
										let query = router.query;

										if (!query.size) {
											query.size = type.label;
										} else {
											let arr = query.size.split(",");

											if (arr.includes(type.label)) {
												arr = arr.filter((e) => e !== type.label);
											} else {
												arr.push(type.label);
											}

											let str = "";
											arr.map((item) => {
												str = str.concat(",", item);
											});
											if (str) {
												str = str.substr(1);
											}

											query.size = str;
										}

										Router.push({
											pathname: "/products",
											query,
										});
									}}
								/>
							))}
						</div>
					</div>

					<div className="products-filter__block">
						<button type="button">Color</button>
						<div className="products-filter__block__content">
							<div className="checkbox-color-wrapper">
								{productsColors.map((type) => (
									<CheckboxColor
										key={type.id}
										name="product-color"
										color={type.color}
										checked={checkColor(type.color)}
										onChange={() => {
											let query = router.query;

											if (!query.color) {
												query.color = type.color;
											} else {
												let arr = query.color.split(",");

												if (arr.includes(type.color)) {
													arr = arr.filter((e) => e !== type.color);
												} else {
													arr.push(type.color);
												}

												let str = "";
												arr.map((item) => {
													str = str.concat(",", item);
												});
												if (str) {
													str = str.substr(1);
												}

												query.color = str;
											}

											Router.push({
												pathname: "/products",
												query,
											});
										}}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default NormalForm;

{
	/* <button
// type="submit"
className="btn btn-submit btn--rounded btn--yellow"
>
Apply
</button> */
}
