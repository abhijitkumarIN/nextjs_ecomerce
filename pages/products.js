import Layout from '../layouts/Main';
import Footer from '../components/footer';
import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';

const Products = () => (
	<Layout metadata={{ title: "Next e-commerce website" }}>
		<Breadcrumb />
		<section className="products-page">
			<div className="container flex-col lg:flex-row">
				<ProductsFilter />
				<ProductsContent />
			</div>
		</section>
		<Footer />
	</Layout>
);
  
export default Products
  