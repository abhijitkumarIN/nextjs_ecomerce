import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "./form-builder/checkbox";
import CheckboxColor from "./form-builder/checkbox-color";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { useForm } from "react-hook-form";
import Router from "next/router";

import FilterForm from "./FilterForm";
import NormalForm from "./NormalForm";
// data
import productsTypes from "./../../utils/data/products-types";
import productsColors from "./../../utils/data/products-colors";
import productsSizes from "./../../utils/data/products-sizes";

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

const ProductsFilter = () => {
	const [filtersOpen, setFiltersOpen] = useState(false);
	const dispatch = useDispatch();
	const addQueryParams = () => {
		// query params changes
	};


	return (
		<div className="flex flex-col justify-center items-center p-8">
			<NormalForm />
			<FilterForm />
		</div>
	);
};

export default ProductsFilter;

{/* <button
// type="submit"
className="btn btn-submit btn--rounded btn--yellow"
>
Apply
</button> */}