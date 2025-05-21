import Category from "../Category/Category";
import Slider from "./Slider";
const Home = () => {
  const categories = [
    {
      name: "men",
    },
    {
      name: "women",
    },
    {
      name: "home-appliances",
    },
    {
      name: "electrical-devices",
    },
    {
      name: "kids",
    },
  ];

  return (
    <>
      <section className="sm:px-24">
        <Slider />
      </section>

      <section className="w-full ">
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center "
          >
            <Category categoryName={item.name} />
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
