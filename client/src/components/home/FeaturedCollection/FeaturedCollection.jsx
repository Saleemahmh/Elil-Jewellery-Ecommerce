import { featuredCollection } from "../../../data/featuredCollection.js";

import CollectionHero from "./CollectionHero.jsx";
import CollectionCTA from "./CollectionCTA.jsx";
import CollectionPreviewCard from "./CollectionPreviewCard.jsx";

const FeaturedCollection = () => {
  return (
    <section className="bg-[#2E1830] py-28">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-[1.7fr_0.9fr] gap-20 items-start">

          {/* LEFT */}

          <CollectionHero
            image={featuredCollection.heroImage}
          />

          {/* RIGHT */}

          <div className="flex flex-col justify-center">

            <CollectionCTA
              collection={featuredCollection}
            />

            <div className="mt-14 space-y-8">

              {featuredCollection.products.map((product) => (

                <CollectionPreviewCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default FeaturedCollection;