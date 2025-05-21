import  { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchProducts } from "../../../redux/productSlice";

import { IoCloseCircle } from "react-icons/io5";
import api from "../../../api/apiConfig";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productTags = [
    // categories

    "Men",
    "Women",
    "Kids",
    "Electronics",

    // Phones & Devices
    "Phone",
    "Smartphone",
    "Feature Phone",
    "Android Phone",
    "iPhone",
    "Samsung Galaxy",
    "iPhone 14",
    "iPhone 13",
    "Google Pixel",
    "OnePlus Phone",
    "Huawei Phone",
    "Xiaomi Phone",
    "Realme Phone",
    "Motorola Phone",
    "Nokia Phone",
    "LG Phone",
    "Dual SIM Phone",
    "Foldable Phone",
    "Flip Phone",
    "Touchscreen Phone",
    "Smart Device",
    "Smartwatch",
    "Apple Watch",
    "Samsung Galaxy Watch",
    "Fitbit Watch",
    "Garmin Watch",
    "Smart Glass",
    "Google Glass",
    "Oculus Rift",
    "Oculus Quest",
    "Wearable Tech",
    "Tablet",
    "iPad",
    "Samsung Galaxy Tab",
    "Microsoft Surface",
    "Amazon Fire Tablet",
    "E-Reader",
    "Kindle",
    "Nook",
    "Tablet PC",
    "Phablet",
    "Mobile Accessory",
    "Phone Case",
    "OtterBox",
    "Spigen Case",
    "Caseology Case",
    "Belkin Screen Protector",
    "ZAGG Screen Protector",
    "Anker Charging Cable",
    "Anker Wireless Charger",
    "RAVPower Power Bank",
    "Mophie Powerstation",
    "Phone Stand",
    "PopSocket",
    "Smartphone Dock",
    "Mophie Wireless Charging Dock",
    "Bluetooth Headset",
    "Jabra Headset",
    "Sony Headset",
    "Bose Earbud",
    "Apple AirPods",
    "JBL Earbuds",

    // Gadgets & Tech Devices
    "Smartphone Dock",
    "Anker Dock",
    "Logitech Dock",
    "Gaming Console",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "Sony PlayStation 5",
    "Xbox Series X",
    "Nintendo Switch Lite",
    "Tech Gadget",
    "Wearable",
    "Fitbit Fitness Tracker",
    "Apple Fitness Tracker",
    "Garmin Fitness Tracker",
    "Smart Ring",
    "Oura Ring",
    "Smart Glasses",
    "Oculus Quest",
    "Samsung Gear VR",
    "Virtual Reality Headset",
    "GoPro Camera",
    "DJI Drone",
    "Phantom Drone",
    "Mavic Drone",
    "3D Printer",
    "Creality 3D Printer",
    "Prusa 3D Printer",
    "Anycubic 3D Printer",
    "Bluetooth Speaker",
    "Anker Soundcore",
    "JBL Portable Speaker",
    "Bose Portable Speaker",
    "UE Boom",
    "Sony Portable Speaker",
    "Smart TV",
    "Samsung Smart TV",
    "LG OLED TV",
    "Sony Bravia TV",
    "Roku",
    "Apple TV",
    "Google Chromecast",
    "Amazon Fire Stick",
    "Amazon Echo",
    "Google Nest",
    "Amazon Alexa",
    "Google Home",
    "Nest Cam",
    "Arlo Camera",
    "Ring Doorbell",
    "Wyze Cam",
    "Smart Thermostat",
    "Nest Thermostat",
    "Honeywell Smart Thermostat",
    "WiFi Router",
    "TP-Link WiFi Router",
    "Netgear WiFi Router",
    "Asus WiFi Router",
    "WiFi Extender",
    "TP-Link WiFi Extender",
    "Linksys WiFi Extender",
    "Netgear WiFi Extender",

    // Furniture
    "Furniture",
    "Sofa",
    "Couch",
    "Recliner",
    "Office Chair",
    "Ergonomic Chair",
    "Lounge Chair",
    "Desk",
    "Writing Desk",
    "Computer Desk",
    "Dining Table",
    "Wooden Dining Table",
    "Glass Dining Table",
    "Coffee Table",
    "Nightstand",
    "Bed",
    "Queen Bed",
    "King Bed",
    "Twin Bed",
    "Bunk Bed",
    "Wardrobe",
    "Closet",
    "Bookshelf",
    "TV Stand",
    "Storage Cabinet",
    "Filing Cabinet",
    "Dresser",
    "Bookshelves",
    "Cabinet",
    "Bean Bag",
    "Bean Bag Chair",
    "Dining Chairs",
    "Reclining Chairs",
    "Outdoor Furniture",
    "Patio Chair",
    "Folding Chair",
    "Plastic Chair",
    "Outdoor Dining Set",
    "Study Table",
    "Writing Desk",
    "Gaming Chair",
    "Ikea Furniture",
    "Wayfair Furniture",
    "Ashley Furniture",

    // Clothing & Fashion
    "Clothing",
    "Men's Clothing",
    "Women's Clothing",
    "Kids' Clothing",
    "T-Shirt",
    "Jeans",
    "Jacket",
    "Hoodie",
    "Sweater",
    "Dress",
    "Blouse",
    "Shirt",
    "Skirt",
    "Leggings",
    "Shorts",
    "Pants",
    "Suits",
    "Formal Wear",
    "Casual Wear",
    "Outerwear",
    "Raincoat",
    "Blazer",
    "Coat",
    "Sportswear",
    "Lingerie",
    "Undergarments",
    "Swimwear",
    "Sleepwear",
    "Activewear",
    "Track Pants",
    "Athletic Shorts",
    "Thermal Wear",
    "Track Jacket",
    "Jeans",
    "Denim",
    "Cargo Pants",
    "Chinos",
    "Workwear",
    "H&M Clothing",
    "Zara Clothing",
    "Levi's Jeans",
    "Nike T-Shirt",
    "Adidas Hoodie",
    "Puma Sneakers",
    "Under Armour Jacket",
    "Tommy Hilfiger Shirt",
    "Calvin Klein Jeans",
    "Lacoste Polo",
    "Gucci Dress",
    "Louis Vuitton Accessories",
    "Chanel Bag",
    "Rolex Watch",

    // Footwear
    "Shoes",
    "Men's Shoes",
    "Women's Shoes",
    "Sneakers",
    "Running Shoes",
    "Sports Shoes",
    "Formal Shoes",
    "Leather Shoes",
    "Boots",
    "Chelsea Boots",
    "Combat Boots",
    "Hiking Boots",
    "Slippers",
    "Flip Flops",
    "Sandals",
    "Heels",
    "Flats",
    "Wedges",
    "Loafers",
    "Sliders",
    "Dress Shoes",
    "Slip-Ons",
    "Clogs",
    "Converse Sneakers",
    "Nike Shoes",
    "Adidas Sneakers",
    "Reebok Sneakers",
    "Puma Running Shoes",
    "Under Armour Shoes",
    "Timberland Boots",
    "Dr. Martens Boots",

    // Accessories
    "Sunglasses",
    "Men's Wallet",
    "Women's Wallet",
    "Backpack",
    "Handbag",
    "Duffel Bag",
    "Laptop Bag",
    "Messenger Bag",
    "Clutch Bag",
    "Watch",
    "Men's Watch",
    "Women's Watch",
    "Smartwatch",
    "Apple Watch",
    "Samsung Galaxy Watch",
    "Fitbit Watch",
    "Garmin Watch",
    "Jewelry",
    "Earrings",
    "Necklace",
    "Bracelet",
    "Ring",
    "Cufflinks",
    "Belt",
    "Hats",
    "Scarf",
    "Gloves",
    "Shawls",
    "Belt Buckle",
    "Keychain",
    "Wallet Chain",
    "Pin",
    "Brooch",

    // Health & Wellness
    "Fitness Equipment",
    "Dumbbells",
    "Treadmills",
    "Exercise Bike",
    "Resistance Bands",
    "Yoga Mat",
    "Jump Rope",
    "Kettlebells",
    "Yoga Blocks",
    "Protein Powder",
    "Creatine",
    "Vitamins",
    "Supplements",
    "Sports Nutrition",
    "First Aid Kit",
    "Medical Equipment",
    "Blood Pressure Monitor",
    "Thermometer",
    "Pulse Oximeter",
    "Stethoscope",
    "Massage Gun",
    "Water Bottle",
    "Compression Sleeve",
    "Elbow Brace",
    "Knee Support",
    "Compression Socks",

    // Office Supplies
    "Desk Chair",
    "Office Desk",
    "Ergonomic Chair",
    "Filing Cabinet",
    "Whiteboard",
    "Marker",
    "Sticky Notes",
    "Notebook",
    "Pen",
    "Pencil",
    "Calculator",
    "Stapler",
    "Paper Clip",
    "Printer",
    "Scanner",
    "Laptop Stand",
    "Monitor Stand",
    "Desk Organizer",
    "Desk Lamp",
    "Storage Box",
    "Document Organizer",
    "Desk Drawer",
    "Post-It Notes",
    "Memo Pad",

    // Automotive
    "Car Accessories",
    "Car Cover",
    "GPS Device",
    "Car Charger",
    "Motorbike Helmet",
    "Car Seat Cover",
    "Car Perfume",
    "Bike Accessories",
    "Car Battery Charger",
    "Tyre Inflator",
    "Jump Starter",
    "Air Compressor",
    "Car Wax",
    "Car Vacuum Cleaner",
    "Wheel Lock",
    "Brake Pads",
    "Fuel Injector",
    "Motor Oil",
    "Car Repair Kit",
    "Car Tool Kit",

    // Pet Supplies
    "Dog Food",
    "Cat Food",
    "Pet Grooming",
    "Pet Toy",
    "Aquarium",
    "Bird Cage",
    "Dog Leash",
    "Pet Bed",
    "Cat Litter",
    "Fish Tank",
    "Pet Clothes",
    "Pet Collar",
    "Pet Brush",
    "Pet Carrier",
    "Pet Training Pads",
    "Dog Treats",
    "Pet Shampoo",
    "Pet Hair Remover",

    // Home Improvement
    "Lighting",
    "LED Bulb",
    "Ceiling Fan",
    "Wall Lamp",
    "Floor Lamp",
    "Smart Bulb",
    "Smart Plug",
    "Home Decor",
    "Wall Clock",
    "Curtains",
    "Rugs",
    "Carpet",
    "Wall Art",
    "Mirror",
    "Picture Frame",
    "Storage Box",
    "Kitchen Organizer",
    "DIY Tools",
    "Power Drill",
    "Screwdriver Set",
    "Hammer",
    "Measuring Tape",
    "Saw",
    "Wrench Set",
    "Paint",
    "Paint Brushes",
    "Gardening Tools",
    "Shovel",
    "Rake",
    "Hose Pipe",

    // Books & Stationery
    "Book",
    "Novel",
    "Textbook",
    "Educational Book",
    "Children's Book",
    "Stationery",
    "Notebook",
    "Diary",
    "Journal",
    "Pen",
    "Pencil",
    "Highlighter",
    "Marker",
    "Calculator",
    "Office Supplies",
    "Paper",
    "Glue",
    "Stapler",
    "Paper Clips",

    // Musical Instruments
    "Guitar",
    "Piano",
    "Violin",
    "Drum Kit",
    "Microphone",
    "Headphones",
    "DJ Equipment",
    "Keyboard",
    "Flute",
    "Trumpet",
    "Clarinet",
    "Saxophone",
    "Electric Guitar",
    "Acoustic Guitar",
    "Ukulele",
    "Bass Guitar",
    "Drumsticks",
    "DJ Controller",
    "Mixing Console",

    // Tech Gadgets
    "Drone",
    "Smart Glass",
    "Smart Speaker",
    "VR Headset",
    "Smartwatch",
    "Wearable",
    "Fitness Tracker",
    "Smart Ring",
    "USB Gadget",
    "Smart Home Device",
    "Bluetooth Headphones",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      setSuggestions(
        productTags.filter((tag) =>
          tag.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle search submit
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await api.get(
        `/store/search-product?query=${query}`
      );
      dispatch(getSearchProducts(response?.data?.data));
      setSuggestions([]);
      navigate(`/search?query=${query}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);

    try {
      const response = await api.get(
        `/store/search-product?query=${suggestion}`
      );
      dispatch(getSearchProducts(response?.data?.data));
      navigate(`/search?query=${suggestion}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Custom clear button
  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <section className="px-4 py-1 rounded-full  flex items-center gap-3 border-gray-400 border-2 relative">
        <div className="relative w-full">
          <input
            type="text"
            name="search"
            value={query}
            onChange={handleInputChange}
            placeholder="Search the best products..."
            className=" search-input bg-transparent w-full pl-2 pr-10 outline-none sm:text-main sm:placeholder:text-gray-500 placeholder:text-white"
            autoComplete="off"
            autoFocus
          />
          {/* Custom Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 "
            >
              <IoCloseCircle size={20} />
            </button>
          )}

          {/* Suggestions Box */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-4 drop-shadow-2xl bg-white text-main border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto min-w-72">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-Hmain hover:text-white cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-main text-white p-2 rounded-full"
        >
          <FaSearch />
        </button>
      </section>
    </form>
  );
};

export default Search;
