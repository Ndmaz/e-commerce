import { useAPRELATED } from "@/store/AsyncStore/useAPRELATED";
import { usePPD } from "@/store/usePPD";
import Image from "next/image";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { useparameters } from "@/store/useparameters";

type ProductInfo = {
  id: string;
  productname: string;
  price: number;
  categoryid: string;
  images: string;
}

type RelatedProduct = {
  id: string;
  productname: string;
  price: number;
  images: string;
}

export default function RelatedCarousel() {
  const productInfo = usePPD((state) => state.productinfo) as ProductInfo;
  const { data, isLoading } = useAPRELATED(productInfo.categoryid, true);
  const categorychange = useparameters((state) => state.categorychange)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <CgSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  // Parse and validate images
  const getProductImage = (imageString: string) => {
    try {
      const images = JSON.parse(imageString);
      return images?.pic1 || null;
    } catch {
      return null;
    }
  };

  const relatedProducts = data?.products.filter(
    product => product.productname !== productInfo.productname
  ) ?? [];

  if (!relatedProducts?.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">محصولات مرتبط</h2>
        <Link
          href="/products"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 
                   transition-colors duration-200 group"
          onClick={() => {
            categorychange(productInfo.categoryid)
          }}
        >
          <span className="text-sm font-medium">مشاهده همه</span>
          <MdKeyboardDoubleArrowLeft className="text-xl group-hover:translate-x-[-4px] transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {relatedProducts.map((product) => {
          const productImage = getProductImage(product.images);
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md 
                       transition-all duration-200 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                {productImage ? (
                  <Image
                    src={productImage}
                    width={400}
                    height={400}
                    alt={product.productname}
                    className="w-full h-full object-cover group-hover:scale-105 
                             transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaImage className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">
                  {product.productname}
                </h3>
                <p className="mt-2 text-lg font-bold text-blue-600">
                  {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
