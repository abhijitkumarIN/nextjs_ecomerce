import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "../form-builder/checkbox";
import CheckboxColor from "../form-builder/checkbox-color";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Modal from "@mui/material/Modal";

// data
import productsTypes from "../../../utils/data/products-types";
import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";
import { route } from "next/dist/server/router";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

// const style = {
// 	position: "absolute",
// 	top: "50%",
// 	left: "50%",
// 	transform: "translate(-50%, -50%)",
// 	width: 400,
// 	bgcolor: "background.paper",
// 	border: "2px solid #000",
// 	boxShadow: 24,
// 	p: 4,
// };

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

const FilterForm = () => {
	const router = useRouter();
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [query, setQuery] = useState(null);

	useEffect(() => {
		setQuery(router.query);
	}, [router.query]);

	const checkProductType = (item) => {
		// console.log(query);
		if (!query || !query.productType) {
			return false;
		}

		const arr = query.productType.split(",");
		return arr.includes(item);
	};

	const checkSize = (item) => {
		if (!query || !query.size) {
			return false;
		}

		const arr = query.size.split(",");
		return arr.includes(item);
	};

	const checkColor = (item) => {
		if (!query || !query.color) {
			return false;
		}

		const arr = query.color.split(",");
		return arr.includes(item);
	};
	const giveDefaults = () => {
		if (router.query.minPrice) {
			return [router.query.minPrice, router.query.maxPrice];
		}

		return [0, 100];
	};
	return (
		<>
			<Modal open={showForm} onClose={() => setShowForm(false)}>
				<div className="md:w-1/2 lg:w-1/4 w-[90%] bg-white ml-4 md:ml-32 mt-12 p-10">
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


							{/*  that is filter block  */}
							<div className="products-filter__block">
								<button type="button">Product type</button>
								<div className="products-filter__block__content mt-4">
									{productsTypes.map((type) => (
										<Checkbox
											key={type.id}
											name="product-type-small"
											label={type.name}
											checked={checkProductType(type.name)}
											// checked={true}
											onChange={() => {
												if (!query.productType) {
													setQuery({ ...query, productType: type.name });
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

													setQuery({ ...query, productType: str });
												}
											}}
										/>
									))}
								</div>
							</div>

							<div className="products-filter__block">
								<button type="button">Price</button>
								<div className="products-filter__block__content mt-4">
									<Range
										min={0}
										max={100}
										// value={giveDefaults()}
										defaultValue={giveDefaults()}
										tipFormatter={(value) => `${value}`}
										onAfterChange={(value) => {
											setQuery({
												...query,
												minPrice: value[0],
												maxPrice: value[1],
											});
										}}
									/>
								</div>
							</div>

							<div className="products-filter__block">
								<button type="button">Size</button>
								<div className="products-filter__block__content checkbox-square-wrapper mt-4">
									{productsSizes.map((type) => (
										<Checkbox
											type="square"
											key={type.id}
											name="product-size-small"
											label={type.label}
											checked={checkSize(type.label)}
											onChange={() => {
												if (!query.size) {
													setQuery({ ...query, size: type.label });
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

													setQuery({ ...query, size: str });
												}
											}}
										/>
									))}
								</div>
							</div>

							<div className="products-filter__block">
								<button type="button">Color</button>
								<div className="products-filter__block__content mt-4">
									<div className="checkbox-color-wrapper">
										{productsColors.map((type) => (
											<CheckboxColor
												key={type.id}
												name="product-color-small"
												color={type.color}
												checked={checkColor(type.color)}
												onChange={() => {
													if (!query.color) {
														setQuery({ ...query, color: type.color });
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

														setQuery({ ...query, color: str });
													}
												}}
											/>
										))}
									</div>
								</div>
							</div>

							<div
								className="btn btn--rounded btn--yellow block"
								onClick={() => {
									setShowForm(false);
									Router.push({
										pathname: "/products",
										query,
									});
								}}
							>
								Apply
							</div>
							<button
								className="btn btn--rounded btn--yellow block ml-8"
								onClick={() => setShowForm(false)}
							>
								Close
							</button>
						</div>
					</form>
				</div>
			</Modal>
			<div
				className="btn btn--rounded btn--yellow block"
				onClick={() => setShowForm(true)}
			>
				Apply filters
			</div>
		</>
	);
};

export default FilterForm;
